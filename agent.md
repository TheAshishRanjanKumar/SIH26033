# SIH26033 — AI Agent Development Control Pack

This folder contains the operating instructions for AI coding agents working on SIH26033.

## Files

- `MASTER_AGENT_INSTRUCTIONS.md` — Give this to every coding agent.
- `DEVELOPMENT_PHASES.md` — Follow the project phase order.
- `AGENT_OWNERSHIP.md` — Prevent conflicting multi-agent work.
- `DEFINITION_OF_DONE.md` — Use before declaring a task complete.

## Recommended Usage

1. Put these files in the repository.
2. Tell every agent to read `MASTER_AGENT_INSTRUCTIONS.md` first.
3. Give each agent exactly one assigned phase/task.
4. Tell the agent its ownership area.
5. Require the final handoff format.
6. Run integration and QA after parallel feature work.

## Suggested repository placement

```text
SIH26033/
├── AGENTS.md
├── agent/
│   ├── DEVELOPMENT_PHASES.md
│   ├── AGENT_OWNERSHIP.md
│   └── DEFINITION_OF_DONE.md
└── ...
```

For maximum compatibility, copy `MASTER_AGENT_INSTRUCTIONS.md` to the repository root as `AGENTS.md`.
