---
name: adddone
description: Mark a task done on the Kanban board in 01_Planning (adding it as done if it isn't there). Use when asked to "mark X done," "I finished X," "X is done," or after finishing a piece of work. Stamps the completion time and moves the card to the Done column.
argument-hint: <task name> [board name]
user-invocable: true
---

# /adddone

Mark a task done on the Kanban board. Completed cards appear in today's Daily Note under "Completed today."

- `/adddone Task name` — mark that task done today
- `/adddone Task name Board name` — specify the board
- With no arguments, infer the task name from the recent conversation/work
- If several separate pieces of work were finished, mark each as its own card rather than merging them into one

## Steps

1. **Get the current time**: run `date "+%Y-%m-%dT%H:%M"` (don't guess). Use the date part as `YYYY-MM-DD` and the whole thing as `YYYY-MM-DDTHH:mm`
2. **Find the board**: a board is any `.md` file in `01_Planning/` whose frontmatter has `kanban-plugin: board`
3. **Look for an existing card first (always)**: search the board's open cards (`- [ ]`) for the task's keywords. Prefer a card marked `[state:: in-progress]`
4. **If found, mark it done and move it**
   - Change `- [ ]` to `- [x]`
   - Remove `[state:: in-progress]` if present
   - Add `[[Note name]]` if a note came up in conversation
   - Append `YYYY-MM-DD [done-at:: YYYY-MM-DDTHH:mm]` to the end of the line (keep any existing `📅 …`)
   - Remove the line from its original spot and insert it at the top of the **Done column** (`## Done`, or `## 完了（Done）` if that's what the board uses). Don't leave a blank line behind
5. **If not found, add it as a new done card** at the top of the Done column:
   ```markdown
   - [x] Task name [[Related note]] YYYY-MM-DD [done-at:: YYYY-MM-DDTHH:mm]
   ```
6. Report the card marked done and the board name

## Format

- `YYYY-MM-DD` is the completion date; `[done-at:: YYYY-MM-DDTHH:mm]` is the completion time. The Daily Note's "Completed today" section lists cards whose `done-at` date matches that day, newest first
- When a card is checked off directly in Obsidian, the Task Done At plugin stamps `done-at` in this same format — match it when an agent writes it too

## Example

```
/adddone verify Claude/Codex communication
→ found in ## To Do of 01_Planning/Tasks.md:
  - [ ] Verify Claude/Codex communication with the word-chain exercise
  → marked done and moved to top of ## Done:
  - [x] Verify Claude/Codex communication with the word-chain exercise 2026-10-01 [done-at:: 2026-10-01T10:24]
```
