---
name: dsh-token-handoff
description: "Session context handoff — stop re-reading and re-deriving context every session. Write a compact HANDOFF note (goal, decisions, next step, open questions, gotchas) at the end of a working session so the next session starts warm instead of cold. Token-saving layer ①: never re-paste history you already have."
whenToUse: "When ending a long working session; when you are about to switch tasks/agents/branches and will return later; when a project spans multiple sessions and you keep re-explaining the state; when onboarding a fresh agent to an ongoing effort."
metadata:
  version: "1.0.0"
  author: "WODE25500"
  upstream: "https://www.npmjs.com/package/context-auto-handoff"
  upstream_license: "MIT"
---

# Handoff (layer ① — session)

The single cheapest token save: **stop making the next session rebuild context from zero.** A session handoff is a short, dense note the successor reads first — not a dump of the transcript, but a distillation.

## The handoff note (5 blocks, ≤ ~150 tokens)

Write these at the end of a session, in this order:

1. **Goal** — one line: what we are building/chasing.
2. **State** — what is already done; what is known-good. Link the artifact/commit.
3. **Decisions** — the choices we made and *why* (so the next session doesn't relitigate).
4. **Next step** — the one concrete thing to do next; what "done" looks like.
5. **Open questions / gotchas** — what is unresolved, what bit us, what to watch for.

## Rules

- **Distill, don't dump.** The note replaces the transcript; if you can paste the transcript, you wrote the wrong note. Prefer "what I learned" over "what I typed."
- **Name the artifacts.** Link the file/commit/branch, pain killed later.
- **Decisions carry reasons.** "We chose crypto over plaintext because X" beats "we use crypto." The *why* is the token that survives.
- **Keep it current.** Update in place; the note should be the true current state, never stale.
- **Deadlines/failures are fair game.** A note that hides a blocked step makes the next session re-discover it (worse than no note).

## Compose

Handoff is the first layer: it prevents the input layer (RTK / Headroom) from having to re-compress history you should never have re-sent. If you hand off well, layers ② and ③ have far less to do.
