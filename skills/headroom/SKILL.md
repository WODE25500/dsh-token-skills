---
name: dsh-token-headroom
description: Context compaction / headroom — compress the live context so the prompt stays small without losing the state that matters. Backed by the dsh-headroom engine (compaction backend + CCR retrieve); this skill is the strategy layer and hands off to that plugin rather than re-implementing compression. Token-saving layer ③.
whenToUse: When a long-lived session's context is getting fat and starts to hit limits; when you are about to run out of window or see quality drop on old context; when a compaction tool is available and you want to use it deliberately instead of a crude "trim everything."
source: "Compress the live context so the prompt stays small. Backs onto the dsh-headroom engine."
retire_when: "When dsh core auto-compacts context without a plugin, or a larger context window removes the pressure."
metadata:
  version: "1.0.0"
  author: "WODE25500"
  upstream: "https://github.com/WanYanTianDe/dsh-headroom"
  upstream_license: "MIT"
---

# Headroom (layer ③ — context)

Headroom keeps a **working set** instead of a whole transcript: it compacts what's no longer needed and keeps the small part that still is. On dsh this is provided by the `dsh-headroom` plugin — **use that engine; this skill is the judgment layer.**

## Strategy

1. **Let a compaction engine do the shrinking.** `dsh-headroom` runs a compaction backend and exposes a `CCR retrieve` tool: history is compressed, and when a detail is needed again you *retrieve* just that slice. Don't hand-trim a giant context when an engine will do it.
2. **Keep the decision-making core small.** The live prompt should hold the current goal, the constraints, and this task's contract — not the whole exploration trail.
3. **Retrieve on demand, not upfront.** If a pass at history is only sometimes needed, don't re-paste it. Keep the pointer (`dsh-headroom` CCR), fetch the slice when a specific question needs it.
4. **Know what NOT to compact.** Auth, security invariants, and "removed exactly X" facts must survive. A compaction that loses a security decision is a bug, not a saving.

## Rules

- **Prefer the engine over manual surgery.** If `dsh-headroom` is installed, call it. Manual trimming is the fallback, not the default.
- **Compact is not delete.** Compressed ≠ gone-and-unrecoverable. Whatever you compact must be retrievable or trivially re-derivable.
- **Trigger early.** Compact before you're in the last 10% of the window — not at the cliff edge. Late compaction risks losing the thread mid-task.

## Compose

Headroom sits after layers ① and ②: if you hand off (①) and prune input (②), there is less history to compact in the first place. It is the last line of defense before the window fills.