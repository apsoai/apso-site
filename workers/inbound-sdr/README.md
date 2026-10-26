# Inbound SDR agent (apso.ai contact form)

Lives in the site repo and deploys as Cloudflare Workers through the site's Pulumi program (mavric/apso-site#28).

Decided 2026-10-24 (Matt): inbound contacts are researched, scored and followed up by AI, and the emails send automatically with no approval step. Keep it simple; safety lives in the rubric, the skills and the checks in this code.

## Flow

```
apso.ai /contact form ──server action──► GoHighLevel contact, tag website-contact
GHL workflow "Apso website contact"
  1. Webhook ─► Worker research-score  ─► writes lead_tier, lead_segment, lead_reason, research note
  2. Tier C: alert Matt (internal email), stop.
  3. Wait 7 min ─► Webhook ─► Worker draft (step 1) ─► writes ai_subject, ai_body ─► Send email from matt@apso.ai
  4. Wait 2 business days; stop if replied or booked ─► draft (step 2) ─► send
  5. Wait 3 more business days; stop if replied or booked ─► draft (step 3) ─► send ─► end
  Booking on the Business Inquiry calendar or any reply ends the sequence (workflow goal).
```

Business plan and Your own cloud are the same path (DevOps-as-a-service). Something else gets step 1 only.

## Guardrails in code (not just prompts)

- The draft must pass `voice/check.py` with zero HARD hits, be at most 90 words, contain no `$` or price words, no em or en dash, and only allow-listed links. Any failure sends the fixed fallback email for that step and alerts Matt.
- At most 3 AI emails per contact, ever. Tier C gets none.
- Kill switch: env `SDR_SEND_ENABLED=false` or the contact tag `sdr-paused` makes the draft Worker return skip.
- The contact's message is passed as data inside a delimited block; the model's tools cannot send, only return JSON.
- Every draft and research result is saved as a note on the contact, so there is a record of what was sent and why.
- Webhooks require the `x-apso-webhook-secret` header.

## Secrets (1Password `op://` references, set as Worker secrets by Pulumi)

`ANTHROPIC_API_KEY`, `GHL_API_TOKEN`, `GHL_LOCATION_ID`, `SDR_WEBHOOK_SECRET`.

## GoHighLevel setup

Custom fields: `lead_tier`, `lead_segment`, `lead_reason`, `ai_subject`, `ai_body`, `sdr_step`. Tag: `sdr-paused`. Workflow built from a duplicate of "1. New Lead Nurture (Fast 5)" with SMS, call and voicemail removed.

## Skills

- `skills/lead-research/SKILL.md`: research rules and the ICP rubric.
- `skills/sdr-email/SKILL.md`: voice, sequence, allowed and banned claims.
- `voice/` holds a TypeScript port of `~/.agents/skills/matt-voice/scripts/check.py` (same HARD and REVIEW rules, tested against the same fixtures) plus copies of the profile and exemplars the prompt uses.
