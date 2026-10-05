# Rules for this vault (for AI agents — Codex)

Claude Code reads `CLAUDE.md`; Codex reads this file. Same rules either way.

- Write notes in English
- Notes are Markdown. Don't use heading 1 (`#`) — the filename is the title
- New notes start with:
  ```yaml
  ---
  tags: [codex]
  ---
  ```
- Templates live in `30_Templates/`
- Daily notes live in `02_DailyNotes/YYYY-MM-DD.md`
- Tasks live in `01_Planning/Tasks.md` (Kanban)
  - If asked to "add a task," read `.claude/skills/addtodo/SKILL.md` and follow it. If asked to "mark it done"/"complete it," read `.claude/skills/adddone/SKILL.md` and follow it
- Paper Markdown and figures go in `20_MDPapers/` (pdf-mistral output). digest-paper reading notes are saved to `10_Reference/Notes/`
- Never write API keys or passwords into notes or chat
- Always check with me before deleting a file or touching anything outside this folder

## Work logs

When a piece of work reaches a natural stopping point, record it in `05_Agents/LOG_YYYY-MM-DDTHHmm Topic.md` (use this format whenever asked to "write a log"). Structure:

```markdown
---
tags:
  - codex
---

## Goal
## Discussion process
## What was implemented
## Related notes
## Next actions
```

- For the timestamp, use the output of `date '+%Y-%m-%dT%H%M'` (don't trust your own sense of the time)
- Lead with the conclusion, details after. Link related notes with `[[links]]`
