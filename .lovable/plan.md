# GHAT Project Delivery, Agreement & Service Management

This is a substantial multi-phase build extending the existing funding, milestone, evidence and messaging system. I will not create parallel/duplicate systems — everything hangs off the existing `commissioned_projects`, `volunteer_project_assignments`, `donations`, `project_milestones`, `project_expenses`, `project_field_evidence` and `project_messages` tables.

I will complete all phases in a single continuous run without pausing, and only report done once end-to-end tests pass on donor, Project Team and admin accounts.

---

## Phase A — Database foundation (single migration)

New tables (all with GRANTs, RLS, timestamps, update triggers, audit log triggers):

1. `project_agreements` — one row per project, `current_version_id`, `status` (draft, issued, under_review, changes_requested, revised, accepted, active, superseded, terminated), `activated_at`.
2. `project_agreement_versions` — immutable versioned snapshot of every charter field listed in the request (title, purpose, outcomes, safe_location, scope, exclusions, deliverables, beneficiary_group, funding_target, gross_donation, operating_allocation, delivery_allocation, budget_categories jsonb, planned_start, planned_completion, expected_duration, reporting_frequency, first_report_due, evidence_requirements, financial_reporting, communication_arrangements, dependencies, risks_private, escalation, change_control, complaint_procedure, safeguarding_route, confidentiality_terms, plan_version int, donor_visible_status, issued_at, issued_by). Milestones per version live in `project_agreement_milestones` (title, target_date, weight, sequence).
3. `project_agreement_decisions` — immutable: version_id, user_id, role, decision (accept/request_changes/decline), comment, decided_at. Trust approval recorded as a special decision row.
4. `project_change_requests` — project_id, from_version_id, field, original_value jsonb, proposed_value jsonb, reason, requested_by, requested_at, status (proposed/under_review/clarification_required/approved/rejected/withdrawn/implemented), decision_reason, approved_by, approved_at, requires_donor_reacceptance, requires_team_reacceptance, resulting_version_id.
5. `project_comments` — polymorphic parent (`parent_type` enum: charter, agreement_version, milestone, project_update, expense, evidence, change_request, reporting_deadline; `parent_id` uuid), project_id, author_id, author_role, body, attachment_url, parent_comment_id, visibility (trust_internal, donor_trust, team_trust, shared_project, safeguarding_restricted, finance_restricted), approval_status (pending/approved/rejected), edited_at, mentions uuid[], read receipts in `project_comment_reads`.
6. `project_service_requests` — full schema per the spec including generated `reference_number` (`GHAT-YYYY-NNNNNN` via sequence + trigger).
7. `project_service_request_comments` — per spec, with comment_type enum.
8. `project_service_request_events` — immutable event log.
9. `project_service_policies` — configurable SLA per (request_type, priority): acknowledge_minutes, first_response_minutes, resolution_minutes, escalation_minutes, business_hours jsonb, timezone.
10. `project_health_snapshots` — computed + manual override with `override_reason`, `donor_visible_explanation`, health enum.
11. `project_notifications` — per-user in-app notifications with `read_at`, `link`, `category`.
12. New role: extend `app_role` with `safeguarding_officer`, `finance_officer`. Add `has_any_role` helper.

Security-definer RPCs (all `SET search_path = public`):
- `donor_project_agreement(_project_id)` — returns latest donor-visible version with milestones, no private risks/notes.
- `team_project_agreement(_assignment_id)` — team-safe version.
- `submit_agreement_decision(_version_id, _decision, _comment)` — validates role, writes decision + audit, updates agreement status.
- `admin_issue_agreement_version(...)` / `admin_approve_agreement(_version_id)` / `admin_activate_project(_project_id)`.
- `create_service_request(...)` — assigns reference, computes SLA due timestamps, writes creation event, creates notifications.
- `add_service_request_comment(...)` — enforces visibility rules, updates `last_response_at`, `waiting_on`, triggers events + notifications.
- `resolve_service_request(...)`, `confirm_resolution(...)`, `reopen_service_request(...)`, `escalate_service_request(...)`.
- `compute_project_health(_project_id)` — real signals only (overdue milestones, overdue reports, missing evidence, unresolved high-priority requests, agreement not accepted, budget pressure).
- `list_my_service_requests(_scope)` — role-scoped.
- `list_admin_service_queue(_bucket)` — admin queues.

RLS: donors see only their projects/agreements/decisions/approved changes/donor-visible comments/their own requests; project team see assigned; safeguarding and finance visibility levels enforced via `has_role` checks against new roles. Every table has explicit GRANTs.

## Phase B — Shared UI primitives

- `src/lib/serviceRequests.ts` — types, enums, helpers, SLA formatting, priority/status labels.
- `src/components/service/ServiceRequestForm.tsx` — reusable form (type, category, subject, description, priority, linked entity, attachment).
- `src/components/service/ServiceRequestList.tsx` — role-scoped list with SLA badges, status pills.
- `src/components/service/ServiceRequestDetail.tsx` — thread + events + comment composer with visibility selector (options filtered by role).
- `src/components/agreement/AgreementView.tsx` — read-only editorial view of a version (donor-safe or team-safe).
- `src/components/agreement/AgreementDecisionBar.tsx` — Accept / Request Changes / Decline with required comment on the latter two.
- `src/components/agreement/ChangeRequestList.tsx` — approved-change history (donor-safe filtered).
- `src/components/comments/PolymorphicComments.tsx` — used on milestones/evidence/expenses/updates.
- `src/components/health/ProjectHealthBadge.tsx`.

## Phase C — Donor portal

Extend `DonorDashboardPage.tsx` and `CommissionedProjectsList.tsx`:
- Tabs additions: **Agreement**, **Discussion**, **Support Centre**.
- Agreement tab: current version, status, agreed parameters, timescale, approved changes history, decision bar when awaiting donor.
- Discussion tab: donor↔Trust approved comments on their projects.
- Support Centre: create request (categories per spec), my open, awaiting my response, recently resolved. Satisfaction prompt after resolution.

## Phase D — Project Team portal

Extend `VolunteerDashboardPage.tsx` and `VolunteerAssignedProjects.tsx`:
- New tabs: **Agreement Decisions**, **My Commitments** (responsibilities, timeline, milestones due, reports due), **Support Centre**, **Report a Concern Privately** (separate prominent entry with the confidentiality picker and honest labelling — no fake "anonymous").
- Reuse `ServiceRequestForm` with team-specific categories including delay, resource, scope clarification, safety, safeguarding, misconduct, suspected misuse.

## Phase E — Admin console

New `src/pages/admin/AdminServiceConsolePage.tsx` mounted at `/admin/service-console` (added to `AdminSidebar`). Queues: new, unassigned, awaiting first response, awaiting donor, awaiting team, investigating, overdue, escalated, complaints, safeguarding, finance, resolved. SLA warnings surfaced on the main `AdminDashboardPage`.

New `src/pages/admin/AdminAgreementsPage.tsx` at `/admin/agreements`: draft/issue/approve versions, review change requests, activate projects. Extends existing `AdminProjectsPage` rather than replacing it — a new "Agreement" tab per project.

Safeguarding and Finance queues gated by `has_role(auth.uid(),'safeguarding_officer')` / `'finance_officer'`; normal admin cannot see restricted case bodies.

## Phase F — Health, notifications, audit

- `NotificationsBell` in headers of all three dashboards using `project_notifications` with realtime subscription.
- `project_health_snapshots` recomputed on relevant writes via triggers; badge rendered in donor and admin project cards; only `donor_visible_explanation` shown to donors.
- Audit triggers on all new tables writing to existing `audit_logs`.

## Phase G — Routing

`src/App.tsx`: add `/admin/service-console`, `/admin/agreements`. Sidebar entries added.

## Phase H — Testing (Playwright, all three seeded accounts)

Automated end-to-end script covering the 27-point checklist. Screenshots captured at each step. Fix failures and rerun until green. Then `tsgo` typecheck and production build. Only then report done.

---

## Technical notes

- All new tables in `public` include `GRANT SELECT,INSERT,UPDATE,DELETE ... TO authenticated; GRANT ALL ... TO service_role;` — no anon grants.
- Reference-number generation uses a Postgres sequence per year plus a `BEFORE INSERT` trigger.
- SLA clocks stored as `first_response_due_at`/`resolution_due_at` timestamps computed at creation and on priority change; "paused while awaiting requester" implemented by tracking `waiting_on` transitions in `project_service_request_events` and subtracting accumulated waiting time in a view.
- Visibility enforcement lives entirely in RLS + SECURITY DEFINER RPCs; the React layer only asks for what the current role can see.
- No external email until SMTP templates are approved — notifications are in-app only.
- Preserves all current donor privacy guarantees (still uses `donor_project_team` RPC; no volunteer PII added to any new donor-visible surface).

Given the size, expect this to run as one long build session with the migration approval step in the middle. After migration is approved I proceed straight through UI, wiring, tests and fixes.
