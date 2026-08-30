# dsh-token-preset

DeepSeek Harness (dsh) **省 Token 预设** —— 四层互补手段,在**不牺牲模型智能**的前提下降低 token 开销。每一层是一个轻量 dsh skill(`skills/<layer>/SKILL.md`),只编码*策略与判断*;已有真实引擎的地方(如 dsh-headroom)由 skill 引用而不重造。

```
Tokenizer → ① Handoff  ② RTK  ③ Headroom  ④ Caveman
```
按会话生命周期依次生效:**交接上下文**以免重读历史,**剪冗余输入**再送进模型,**压缩留存上下文**,最后**压紧输出**。

## 四层

| # | Skill | 层 | 省什么 | 支撑工具 / 引擎 |
|---|---|---|---|---|
| ① | `handoff` | 会话 | 免去跨会话重读/重建上下文 | [context-auto-handoff](https://www.npmjs.com/package/context-auto-handoff)、[agenthandoff](https://www.npmjs.com/package/@jatin_iyer09/agenthandoff) |
| ② | `rtk` | 输入 | 进入模型前剪掉重复/冗余 token | [RTK (Rust Token Killer)](https://mintlify.wiki/rtk-ai/rtk/faq)、[JetBrains 基准](https://blog.jetbrains.com/ai/2026/07/rtk-claude-code-token-savings/) |
| ③ | `headroom` | 上下文 | 压缩在线上下文,让 prompt 保持小 | [WanYanTianDe/dsh-headroom](https://github.com/WanYanTianDe/dsh-headroom) |
| ④ | `caveman` | 输出 | 极简原话,出口更少 token | [skill-caveman](https://www.npmjs.com/package/skill-caveman)、[@nielpattin/pi-caveman](https://www.npmjs.com/package/@nielpattin/pi-caveman) |

## 何时用哪层

- **Handoff** —— 杠杆最高、最便宜:每次多会话项目养成写 `HANDOFF` 笔记的习惯,下一会话暖启动。
- **RTK** —— 单次请求:准备贴大文件/日志/仓库列表前先剪。
- **Headroom** —— 持续:长命 agent、上下文变肥时跑。
- **Caveman** —— 每次回复:零成本、复利;只压措辞,不丢任务需要的内容。

## 叠加关系
四层不冲突、各洗一个阶段,全开只是习惯而非重配置:

```text
before: [上一会话原文] + [整仓库 dump] + [肥大上下文] + [啰嗦回复]
after:  HANDOFF 笔记   → 剪过的 diff  → headroom 压缩  → 极简回复
```

## 安装
```sh
dsh plugin --profile web add dsh-token-preset
```
或把四个 skill 目录拷进 `~/.dsh/skills/`。

## 许可
MIT
