---
name: dsh-token-rtk
description: Input redundancy pruning — drop repeated/redundant tokens before they reach the model. Trim verbose logs, duplicated warnings, whole-file pastes, and noise around the real signal so you pay for the signal you need, not the boilerplate around it. Token-saving layer ② (RTK = Rust Token Killer strategy).
whenToUse: Before pasting a large file, log dump, repo listing, or build error that is mostly noise; when a prompt keeps growing because earlier large context is still attached; when you notice the model re-quoting or re-pasting content you already gave it.
metadata:
  version: "1.0.0"
  author: "WODE25500"
  upstream: "https://mintlify.wiki/rtk-ai/rtk/faq"
  upstream_license: "MIT"
---

# RTK (layer ② — input)

RTK ("Rust Token Killer") is the pruning layer: **cut redundant input before it enters the context.** A big prompt full of duplicates is pure waste — the model already has it, re-reading it costs tokens and adds nothing.

## The prune pass (do this before you paste)

For any blob you are about to hand over — file, log, diff, ls, error — apply:

1. **Drop duplicates.** If a warning/line appears 3× in the log, keep one + `(×3)`.
2. **Cut the part you don't need.** A build error: paste the error + the 3 lines around it, not the whole 500-line log.
3. **Replace noise with a pointer.** Instead of the whole file, paste the signature + the line range that matters ("file.ts :120-160, the `process()` fn"). The model can read the real file with a tool; you don't have to inline it.
4. **Remove the re-quote.** If you already gave the model the output and it echoed it back, drop the echo — you're paying twice.
5. **Trim timestamps/URLs/boilerplate.** Unless the line is the signal, kill it.

## Rules

- **Preserve the signal, never the padding.** When in doubt, keep the error message and the one context line; drop the stack of unrelated frames.
- **A pointer beats a paste.** In an agent, say "read `x.ts` lines 40-70" instead of pasting them — the tool reads it for real and only the relevant tokens enter context.
- **Don't over-trim into ambiguity.** If a line could be the reason it breaks, keep it. Erring toward pruning is the point, but a single ambiguous omission can cost a whole retry.

## Compose

RTK feeds layer ③ (Headroom): the less redundant input you ship, the less the compaction engine has to compress. Best saved by doing layer ① right — a good handoff means you never re-paste history at all.
