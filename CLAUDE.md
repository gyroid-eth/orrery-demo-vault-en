# Rules for this vault (for AI agents)

Codex users: see `AGENTS.md` (same content).

- Write notes in English
- Notes are Markdown. Don't use heading 1 (`#`) — the filename is the title
- New notes start with:
  ```yaml
  ---
  tags: [claude]
  ---
  ```
- Templates live in `30_Templates/`
- Daily notes live in `02_DailyNotes/YYYY-MM-DD.md`
- Tasks live in `01_Planning/Tasks.md` (Kanban)
  - Use `/addtodo` to add a task and `/adddone` to complete one (steps in `.claude/skills/addtodo/SKILL.md` and `.claude/skills/adddone/SKILL.md`)
- Paper Markdown and figures go in `20_MDPapers/` (pdf-mistral output). digest-paper reading notes are saved to `10_Reference/Notes/`
- Never write API keys or passwords into notes or chat
- Always check with me before deleting a file or touching anything outside this folder

## Work logs

When a piece of work reaches a natural stopping point, record it in `05_Agents/LOG_YYYY-MM-DDTHHmm Topic.md` (created with `/log Topic`). Structure:

```markdown
---
tags:
  - claude
---

## Goal
## Discussion process
## What was implemented
## Related notes
## Next actions
```

- For the timestamp, use the output of `date '+%Y-%m-%dT%H%M'` (don't trust your own sense of the time)
- Lead with the conclusion, details after. Link related notes with `[[links]]`
