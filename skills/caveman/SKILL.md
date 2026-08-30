---
name: dsh-token-caveman
description: Terse prose — compress the agent's own output so every reply costs fewer tokens. Caveman is a style discipline (short, direct, no throat-clearing), never substance loss: the content the task needs stays, the padding goes. Token-saving layer ④.
whenToUse: On every response, by default — it costs nothing and compounds across the session; specifically when a reply is long and the actual answer is short; when you catch yourself writing setup sentences ("Sure! Let me... " / "Here's what I found:") that add zero information.
metadata:
  version: "1.0.0"
  author: "WODE25500"
  upstream: "https://www.npmjs.com/package/skill-caveman"
  upstream_license: "MIT"
---

# Caveman (layer ④ — output)

Caveman is **output compression**: make the model's replies terse so you don't pay for the words between the ones that matter. It is a *style* — never an excuse to drop meaning.

## The caveman rules

1. **Answer first.** Lead with the result, then the brief why. No intro, no "As a ...".
2. **Kill the throat-clearing.** Delete "Sure!", "Great question!", "Here's what I'd recommend:", "In summary,", "Let me walk you through this." They add zero tokens of information.
3. **One line each.** List, don't paragraph. Short fragments over full sentences.
4. **Code is the answer.** If a snippet answers it, give the snippet — not an essay plus a snippet.
5. **Keep the meaning.** Terse ≠ vague. The actual answer, the actual error, the actual decision must survive the trim. Never cut the one token the task needs.

## Before vs after

> caveman, but do it only to the style. A note that hides a decision is a bug — same principle as the handoff layer.

This is the **last** layer. It stacks on everything above and applies to every outgoing token. It is the cheapest habit in the set: turn it on and forget it.

## When to relax

- **Don't terse a walkthrough you were asked for.** If the user explicitly wants a report, explanation, or per-step notes, give it in full — caveman is for the padding, not the content they asked for.
- **Don't terse away a caveat.** Warnings, security notes, and reversals must be explicit, however terse.
