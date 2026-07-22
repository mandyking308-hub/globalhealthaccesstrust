
## Output 3D — Donation lifecycle, Project Team application privacy, private CV storage

This is a large build. It is scoped strictly to what Output 3D requires and preserves every existing structure (Terms, Privacy Notice, legal registry, agreements, 20/80 allocation, donations, finance, roles, RLS, Privacy & Records).

No Stripe secrets are currently configured on the project (only `SMTP_PASSWORD`, `GOOGLE_SEARCH_CONSOLE_API_KEY`, `LOVABLE_API_KEY` exist). The build will therefore ship the full Stripe integration code and leave the card route "unavailable — configure to enable", with the bank-transfer track fully operational. **I will not fabricate keys, and I will not claim card payments are tested end-to-end until you add real Stripe test keys.**

---

### 1. Database migrations (single migration)

New tables (all with GRANTs, RLS, policies, timestamps, triggers):

- `donation_drafts` — draft/transaction_confirmed/checkout_created/awaiting_payment/bank_transfer_instructions_requested/under_review/cancelled/expired/converted_to_donation. Stores `amount_minor`, currency, frequency, purpose, `proposed_project_id`, recognition prefs, computed `operating_allocation_minor` / `delivery_allocation_minor`, confirmation version + timestamp, expiry.
- `donation_transaction_confirmations` — immutable snapshot per draft (donor_id, amounts, currency, frequency, purpose, wording version `donation-transaction-confirmation-1.0`, confirmed_at).
- `payment_attempts` — provider, `provider_checkout_session_id`, `provider_payment_intent_id`, `provider_subscription_id`, amount, mode, status, admin-safe failure fields.
- `payment_webhook_events` — event_id (unique), type, payload_hash, processed_at (idempotency).
- `bank_transfer_requests` — GHAT reference, status pipeline, due-diligence fields, secure_delivery_channel, amount_expected/received/date/reference, reconciliation, approver, two-person approval fields.
- `refund_records` — immutable adjustments (amount, reason, requested_by, approved_by, provider_refund_id, full/partial, allocation impact).
- `payment_receipts` — receipt reference generator, links donation → immutable snapshot for PDF.
- `volunteer_applications` — replaces the current mixed `volunteers.*` insert path for public applicants (application_id, submitted contact, role_of_interest, cv_object_path, cv_original_filename, status pipeline: received/under_review/clarification_requested/interview/checks_required/approved/declined/withdrawn/account_invited/account_activated).
- `volunteer_application_declarations` — accuracy declaration + privacy acknowledgement, separately, with version + timestamps.
- `volunteer_account_invitations` — single-use token hash, expires_at, consumed_at, role, scope.

Extend existing:
- `donations`: `donation_draft_id`, `payment_provider`, `provider_payment_intent_id`, `provider_subscription_id`, `payment_route` (card/bank_transfer), `receipt_reference`.
- `donation_allocations`: index by donation, preserve committed/spent/remaining semantics.
- `legal_documents`: seed a placeholder row for "Donor and Project Funding Terms" with `current_published_version_id = NULL` so acceptance UI is *not* invented before wording exists.

New RPCs (SECURITY DEFINER, fixed search_path, revoked from PUBLIC):
- `donation_calculate_allocation(_amount_minor bigint)` → returns operating (20%) / delivery (80%) using integer arithmetic.
- `donation_draft_create(...)` / `donation_draft_update(...)` — server-side amount validation (min 50000 pence = £500).
- `donation_confirm_transaction(_draft_id, _wording_version)` — writes the confirmation row atomically.
- `donation_request_bank_transfer(_draft_id)` — creates `bank_transfer_requests` row with `GHAT-BT-YYYY-NNNNN` reference.
- `bank_transfer_record_receipt(...)` — admin only, requires all reconciliation fields, writes audit, creates final donation + allocation.
- `donation_finalize_from_provider(...)` — internal function called from the webhook edge function (uses service role) to convert draft → donation + allocation, idempotent on provider payment intent id.
- `submit_volunteer_application(...)` — server-side gate: writes `volunteer_applications` + both declarations atomically; enforces private CV path.
- `volunteer_application_cv_signed_url(_application_id)` — admin-only, returns short-lived signed URL, writes audit.
- `refund_request(...)` / `refund_approve(...)` — records immutable adjustments; forbids negative delivery allocation without admin review flag.

RLS summary:
- `donation_drafts`, `payment_attempts`, `bank_transfer_requests`, `payment_receipts`, `refund_records`: donor sees own rows only; admin sees all; project team sees none.
- `volunteer_applications`, `volunteer_application_declarations`, `volunteer_account_invitations`, `payment_webhook_events`: admin-only SELECT; INSERTs go through SECURITY DEFINER RPC / edge function.
- Existing `donations` / `donation_allocations` policies preserved.

Audit events (into existing `audit_logs`): every state change listed in §23.

### 2. Storage

- Create private bucket `project-team-applications` (5 MB size limit, allowed types PDF/DOC/DOCX enforced client + RPC).
- Object key pattern: `applications/{application_id}/{gen_random_uuid()}.{ext}`. Original filename kept only as bucket-object metadata.
- RLS on `storage.objects`: only admin (`is_admin(auth.uid())`) may SELECT; INSERTs restricted to the applicant during the submission RPC.
- **Migration audit** (report-only, no destructive change): a script scans existing `volunteers.cv_url`. If any point at a public bucket, they are copied into the private bucket, the row updated to a private object path, and a report row inserted into `audit_logs`. Old objects are **not** deleted until the private copy is verified. Any that cannot be migrated are reported.

### 3. Edge functions

- `create-donation-checkout` (verify_jwt=true) — reads draft ID, reloads authoritative amount, requires confirmation row, creates Stripe Checkout session (one-time or subscription with server-created price_data), returns `{ url }`. Fails safely with 503 + donor-safe message if `STRIPE_SECRET_KEY` is missing.
- `stripe-webhook` (verify_jwt=false, service-role client) — verifies signature with `STRIPE_WEBHOOK_SECRET`, deduplicates on event id, dispatches to donation finalize / subscription / refund / dispute handlers. Never trusts unsigned payloads.
- `donation-status` (verify_jwt=true) — success/cancelled pages call this to get the *server-verified* state; URL params alone never mark paid.

### 4. Frontend

- `AuthPage`: preserve the existing combined Terms + Privacy Notice checkbox (unchecked, required, separate acceptance records). Add `returnTo` query parameter with an internal allow-list (`/donation-form`, `/donor-dashboard`, `/commission-projects`, `/volunteer-apply`). Reject anything else.
- `DonationFormPage`: rebuild against the draft/confirm/checkout flow.
  - Currency GBP.
  - Amount validated ≥ £500 client + server.
  - Live allocation preview using the server RPC on blur/change.
  - Payment route selector: **Pay securely by card** (disabled with donor-safe message if Stripe not configured) / **Request bank-transfer instructions**.
  - Separate unchecked "confirm transaction details" checkbox with wording exactly as specified.
- `/donation/success` + `/donation/cancelled` pages (server-verified).
- `DonationHistoryTable`: add processing / failed / cancelled / refunded / partially refunded / disputed / bank_transfer_instructions_requested badges. Total Donated counts only `paid` minus confirmed refunds.
- `VolunteerApplyPage`: remove blanket "I agree to GDPR" checkbox. Two separate declarations: accuracy + privacy acknowledgement, both required. Link Privacy Notice → `/privacy-policy`. CV upload targets private bucket via authenticated `storage.upload` immediately followed by the `submit_volunteer_application` RPC.
- Admin: extend `AdminDonorsPage` / add `AdminPaymentsPage` with drafts, sessions, attempts, subscriptions, bank-transfer queue, refunds, disputes, webhook event log, and a "Stripe configuration status" card. Add bank-transfer receipt recording with two-person approval hook (checkbox + optional second approver id). No provider credentials shown to admins.
- Admin: `AdminVolunteersPage` gains "Request signed CV link" button → calls `volunteer_application_cv_signed_url` and opens the URL in a new tab; each request is audited.

### 5. Project Team invitation + activation (§18–20)

- `volunteer_account_invitations` stores a SHA-256 hash of a single-use token generated with CSPRNG, `expires_at` = 7 days.
- New `/team-activate?token=…` page: validates token via SECURITY DEFINER RPC, requires the applicant to set a password, tick Terms + Privacy Notice separately, and then creates their auth user + `user_roles` (`project_team` only, never admin) and links the volunteer record.
- The **Project Team Terms** legal document row is seeded but has `current_published_version_id = NULL`, so no acceptance is recorded for it until you publish the wording in a later output.

### 6. Testing plan

The 71-item test list in §24 will be executed and reported individually. Card-payment items 23, 24, 25, 26, 27, 28, 29, 30 will be marked **BLOCKED — Stripe secrets not configured** unless you add `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET` before I run the tests. Everything else (signup, allocation math, bank-transfer flow, CV privacy, RLS, mobile/tablet/desktop layout, typecheck, production build) will be run and reported.

### Technical notes

- All monetary math uses `bigint` pence in the DB. Frontend formats for display only.
- Idempotency: webhook event ids stored uniquely; `donation_finalize_from_provider` is a no-op if `provider_payment_intent_id` already produced a donation.
- Search-path pinning on every new SECURITY DEFINER function; `REVOKE ALL … FROM PUBLIC`.
- No blanket `USING (true)` policies added.
- Zero new "Registered charity" text; no charity/company numbers; no bank details; no invented emails.

### What I will NOT do

- I will not enable Lovable's built-in Stripe/Paddle payments product (per §5, §6 — you specified real Stripe Checkout with your own configured keys; Lovable-managed Stripe would take over the account model).
- I will not modify `supabase/config.toml`, the generated client, or the `.env`.
- I will not publish Project Team Terms wording — the acceptance mechanism is prepared but idle until Output 3E installs the document.

Reply "go" and I will execute the migration, ship the edge functions, rebuild the donation and application UIs, run the 71-item test pass with per-item PASS / FAIL / BLOCKED, then return the typecheck and production-build results.
