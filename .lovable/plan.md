# GHAT Completion & Legal Readiness — Delivery Plan

The Project Charter, Delivery Agreement and Project Support Centre foundations are already built (database schema, RPCs, donor / team / admin UIs). What remains is the **Legal & Policy Centre**, **High-Value Donation Controls**, **Payment/Financial hardening**, the **Legal Acceptance ledger**, the **High-Value Donation Readiness launch gate**, and a full cross-portal test pass.

Because of the size, this is delivered in 4 sequenced phases so each phase can be reviewed, tested and approved before the next begins. Each phase ends with typecheck + build + a targeted browser test.

---

## Phase 1 — Legal Entity, Policy Centre & Acceptance ledger

**Database**
- `legal_entity_settings` (single admin-controlled row): legal_name, trading_name, legal_status, company_number, charity_number, regulator, registered_address, contact_email, insurance_summary, governing_law, jurisdiction, verified_at, verified_by. Empty by default. No fabricated values.
- `legal_documents` (`slug`, `title`, `category`) and `legal_document_versions` (`version_number`, `body_markdown`, `effective_date`, `review_status` enum draft / internal_review / solicitor_review / trustee_approved / published / superseded, `approved_by`, `approved_at`, `material_change` boolean, `supersedes_version_id`).
- `legal_acceptances` (user_id, document_id, version_id, role, project_id nullable, accepted_at, acceptance_text_snapshot, ip_hash, user_agent).
- `legal_document_publication_gates` view: derived readiness for each doc (requires verified legal entity + trustee_approved status).

**RPCs (SECURITY DEFINER)**
- `publish_legal_version(_version_id)` — blocks publish unless legal entity verified and status = trustee_approved.
- `record_legal_acceptance(_slug, _project_id, _acceptance_text)` — resolves current published version, writes acceptance.
- `current_legal_version(_slug)` — public read of latest `published` version.

**Admin UI (`/admin/legal`)**
- Legal Entity Settings editor with red "UNVERIFIED — publication blocked" banner until every required field + verified_at is populated by a super-admin.
- Documents list with per-doc versioning, diff view of previous/current body, review-status transitions.
- Nine seed documents (empty draft bodies with structured placeholders — never invented facts):
  1. Website Terms of Use
  2. Donor and Project Funding Terms
  3. Privacy Notice
  4. Cookie Notice
  5. Complaints Policy
  6. Gift Acceptance, Refusal and Return Policy
  7. Safeguarding and Protected Concerns Policy
  8. Project Team Terms
  9. Photography, Field Evidence and Media Policy
- Donor Terms + Project Team Terms drafts include every clause required by the spec (allocations, restricted vs unrestricted, trustee control, change control, refund handling, no automatic Gift Aid promises, source-of-funds, sanctions, safeguarding, liability caveats, governing law placeholder).

**Public UI**
- `/legal` index and `/legal/:slug` pages rendering the currently `published` version + version footer ("Version X · Effective YYYY-MM-DD"). Falls back to a maintenance notice if no published version exists.
- Footer links updated. Cookie banner links to `/legal/cookie-notice`.

**Acceptance touchpoints**
- Auth signup: mandatory tick of current Donor Funding Terms + Privacy Notice, written to `legal_acceptances`.
- Donation form: re-accept Donor Funding Terms if a `material_change` version has been published since last acceptance.
- Project Team application: acceptance of Project Team Terms + Safeguarding Policy.
- Charter acceptance already records role/version — add a legal_acceptance row alongside for audit parity.

---

## Phase 2 — High-Value Donation & Financial Controls

**Database**
- `donation_review_thresholds` (currency, routine_max, enhanced_dd_min, trustee_approval_min) — admin editable.
- Extend `donations` with `review_status` enum (routine, enhanced_due_diligence_required, source_of_funds_requested, sanctions_review, reputational_review, trustee_approval_required, approved, refused, returned, held), `payment_status` (received, reconciled, failed, chargeback, duplicate, suspicious_hold), `accepted_at`, `held_reason`, `released_at`.
- `donation_review_records`: donor_identity_status, sof_status, beneficial_owner_notes, sanctions_status, pep_status, reputational_notes, trustee_decision, reason, reviewer, supporting_document_ids (link to `document_records` with `visibility = trust_confidential`), review_expiry_date.
- `donation_refunds`: amount, reason, requested_by, first_approver, second_approver, executed_at, immutable trigger (no UPDATE after `executed_at`).
- `restricted_fund_ledger` view aggregating allocations by fund class.
- Trigger: on `donations INSERT`, auto-set `review_status` based on threshold; funds are **not** allocated to a project until `review_status = approved` AND `payment_status = reconciled`.
- Storage bucket `donor-due-diligence` (private), RLS: admins + finance_officer only. Team members and ordinary donor accounts have zero access.

**RPCs**
- `admin_set_donation_review_status`, `admin_request_refund`, `admin_second_approve_refund` (rejects when `first_approver = auth.uid()`), `admin_release_reviewed_donation` (fires the 20/80 allocation only after approval).

**UI**
- `/admin/donations-review` queue with buckets: On Hold, Awaiting DD, Awaiting Sanctions, Awaiting Trustee, Approved, Refused/Returned.
- Refund panel enforcing dual approval; second approver dropdown excludes requester.
- Donor portal shows a neutral "Under review by the Trust" status for held donations, no DD detail.
- Finance dashboard tab: reconciliation status, failed/chargeback/duplicate/suspicious counts.

---

## Phase 3 — Support/Complaints polish & Launch Gate

**Support Centre completeness pass**
- Confirm each support case type is available in donor + team forms (already wired) and adds a dedicated "Formal Complaint" flow with mandatory outcome-desired field and 20-day acknowledgement SLA per Complaints Policy.
- Confidential concern queue visible only to admins with `safeguarding_officer` role; identity-restricted cases mask requester name for other admins.
- Reopen/close audit already exists — add "Escalate to trustee" action recorded as a `service_request_event`.

**High-Value Donation Readiness gate (`/admin/launch-gate`)**
- Live checklist reading actual DB state:
  - Legal entity verified
  - Donor Terms trustee_approved & published
  - Privacy Notice published
  - Complaints Policy published
  - Gift Acceptance Policy trustee_approved
  - Donation review thresholds configured
  - Sanctions review workflow enabled (feature flag)
  - Payment reconciliation smoke test passed (flag toggled by test RPC)
  - Dual-approval refund test recorded
  - Latest Charter acceptance test recorded (donor + team)
  - Latest complaint case resolved end-to-end
  - Confidential concern isolation test recorded
  - Cross-user RLS test recorded
  - Production build recorded
- `donations` insert of `amount >= high_value_threshold` rejected with clear error until gate is READY.

---

## Phase 4 — Cross-portal test pass

Playwright suite covering the full journey:
1. High-value donation → hold → DD approval → 20/80 allocation
2. Donor + Team Charter acceptance → activation
3. Change request → Trust decision → donor-visible summary
4. Formal complaint → Trust response → resolution → satisfaction score
5. Confidential team concern → visible only to safeguarding admin
6. Donor cannot see worker PII, other donors' data, or DD documents
7. Legal-version supersede requires fresh acceptance on next login
8. Refund requires two distinct approvers
9. Typecheck, production build, desktop/tablet/mobile screenshots

Results written to `GHAT_LAUNCH_TEST_REPORT.md` with pass/fail per item.

---

## Technical notes

- All new tables follow the mandatory pattern: CREATE TABLE → GRANT (authenticated + service_role, no anon unless the doc is public) → ENABLE RLS → POLICY.
- Legal document reads for the public site use a `current_legal_version(slug)` SECURITY DEFINER RPC so anon can read only rows with `review_status = 'published'`.
- Due-diligence storage bucket policies restrict to admin + finance_officer; every download is logged via `log_admin_action`.
- No fabricated legal facts anywhere: charity/company numbers, addresses and regulator status render from `legal_entity_settings` or show a visible "Details pending verification" placeholder.
- Refund immutability enforced by a trigger raising on UPDATE of an executed refund row.
- Each phase ends with `tsgo` + `npm run build`.

## Ask before I start

**Two decisions I need from you before Phase 1:**

1. **High-value threshold (GBP)** for the review workflow — common values are £5,000, £10,000 or £25,000.
2. **Who can act as the two "authorised reviewers"** for legal-document sign-off — should this be limited to accounts with the existing `super_admin` role, or do you want a new `legal_reviewer` role?

Once you answer those I will proceed with Phase 1 (Legal Entity + Policy Centre + Acceptance ledger) and stop for your review before Phase 2.
