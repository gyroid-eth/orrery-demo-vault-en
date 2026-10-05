---
name: addtodo
description: Add an open task to the Kanban board in 01_Planning. Use when asked to "add X to the tasks," "I need to do X," or "put this on the TODO list." Supports a due date, auto-picks the board, and checks for duplicates.
argument-hint: <task name> [due date YYYY-MM-DD] [board name]
user-invocable: true
---

# /addtodo

Add an open task to a Kanban board.

- `/addtodo Task name` — add with no due date
- `/addtodo Task name 2026-10-01` — add with a due date
- `/addtodo Task name Board name` — add to a specific board
- With no arguments, infer the task name and board from the recent conversation/work

## Steps

1. **Find the board**: a board is any `.md` file in `01_Planning/` whose frontmatter has `kanban-plugin: board`. If there's only one, use it. If there are several, pick based on the board name and the task's content (ask the user if unsure)
2. **Check for duplicates**: if the board already has an open card (`- [ ]`) with nearly the same task name, report that instead of adding it
3. **Find the "To Do" column**: `## To Do` (or `## 未着手` if present). If neither exists, use the first `## ` column that isn't `Ideas` or `Done`
4. **Insert after the last card in that column**:
   ```markdown
   - [ ] Task name [[Related note]] 📅 YYYY-MM-DD
   ```
   - Omit `📅 …` if there's no due date
   - Link `[[Note name]]` if a note came up in conversation; otherwise omit it
5. Report the line added and the board name

## Format

- `📅 YYYY-MM-DD` is the due date. Today's Daily Note "Tasks" section is sorted by this date
- When you need today's date, use the output of `date +%F` (don't trust your own sense of the time)

## Example

```
/addtodo Review the paper note 2026-10-02
→ at the end of ## To Do in 01_Planning/Tasks.md:
  - [ ] Review the paper note 📅 2026-10-02
```
