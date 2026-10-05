---
name: log
description: Save the current session's work log to 05_Agents/ as LOG_YYYY-MM-DDTHHmm. Use when asked to "save a log" or "summarize today's work."
argument-hint: <topic>
user-invocable: true
---

# /log

1. Get the current time with `date '+%Y-%m-%dT%H%M'`
2. Create `05_Agents/LOG_<timestamp> <topic>.md`. Frontmatter: `tags: [claude]`
3. Headings, in order: `## Goal` `## Discussion process` `## What was implemented` `## Related notes` `## Next actions`
4. In "Discussion process," always note what was tried, where it went wrong, and how the fix was found (don't write only the successes)
5. Link related notes with `[[Note name]]`. The log appears automatically in today's Daily Note (`02_DailyNotes/YYYY-MM-DD.md`) under "Today's work logs"
6. Once created, open it in Obsidian. The vault name is this folder's name; `<file>` is the URL-encoded `05_Agents/<filename>`
	- Mac: `open "obsidian://open?vault=<vault name>&file=<file>"`
	- Windows (WSL): `explorer.exe "obsidian://open?vault=<vault name>&file=<file>"` (explorer.exe can return exit code 1 even on success)
	- If it can't be opened, the work is still done as long as the log file exists. Just report that it couldn't be opened
