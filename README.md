# dsh-token-preset

DeepSeek Harness (dsh) **token-saving preset** — four complementary layers that cut token cost without cutting model intelligence. Each layer is a thin dsh skill (`skills/<layer>/SKILL.md`) that encodes the *strategy*; where a real engine already exists (e.g. dsh-headroom), the skill wires to it instead of re-implementing it.

```
Tokenizer → ① Handoff  ② RTK  ③ Headroom  ④ Caveman
```
These apply in order across a session's lifetime: **hand the context off** so you don't re-read history, **prune redundant input** before it ships, **compact** the context that stays, **squeeze the output** text.

## The four layers

| # | Skill | Layer | What it saves | Backing tool / engine |
|---|---|---|---|---|
| ① | `handoff` | Session | stop re-reading/rebuilding context between sessions | [context-auto-handoff](https://www.npmjs.com/package/context-auto-handoff), [agenthandoff](https://www.npmjs.com/package/@jatin_iyer09/agenthandoff) |
| ② | `rtk` | Input | drop redundant/repeated tokens before they enter the model | [RTK (Rust Token Killer)](https://mintlify.wiki/rtk-ai/rtk/faq), [JetBrains benchmark](https://blog.jetbrains.com/ai/2026/07/rtk-claude-code-token-savings/) |
| ③ | `headroom` | Context | compress the live context so the prompt stays small | [WanYanTianDe/dsh-headroom](https://github.com/WanYanTianDe/dsh-headroom) |
| ④ | `caveman` | Output | terse prose — fewer tokens on the way out | [skill-caveman](https://www.npmjs.com/package/skill-caveman), [@nielpattin/pi-caveman](https://www.npmjs.com/package/@nielpattin/pi-caveman) |

## When to use which

- **Handoff** — the highest-leverage, cheapest: a one-time habit of writing a `HANDOFF.md` / session note so the next session starts warm. Use it on *every* multi-session project.
- **RTK** — per-request: when you're about to paste a big file/log/repo listing that's mostly noise. Prune before prompting.
- **Headroom** — continuous: for long-lived agents with growing context. Run it when the context is getting fat.
- **Caveman** — every response: it costs nothing and compounds. Style, not substance — only tone the output, never drop the content the task needs.
- **bonus**: `dsh-token-diet` (functional, not a skill) for turning saved tokens into a measurable reduction.

## Composability

They stack cleanly — none of them conflict, and each attacks a different stage of the token pipeline. Running all four is a habit, not a heavy setup:

```text
before: [past session verbatim] + [entire repo dump] + [fat context] + [verbose response]
after:  HANDOFF note      → pruned diff    → compacted headroom → terse reply
```

## Install

Copy the four skill dirs into `~/.dsh/skills/`, or clone this repo:

```sh
git clone https://github.com/WODE25500/dsh-token-preset ~/.dsh/dsh-token-preset
cp -r ~/.dsh/dsh-token-preset/skills/*/* ~/.dsh/skills/
```

## License
MIT
