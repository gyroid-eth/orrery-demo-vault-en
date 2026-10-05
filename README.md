---
tags: [claude]
---

## What this is

An Obsidian vault for the ORRERY demo. It pairs ORRERY (a tool for running and observing several AI agents from one screen) with Obsidian's note-taking and task management, so you can try the following yourself:

1. Install ORRERY and have Claude Code and Codex verify communication with a word-chain exercise
2. Convert a paper PDF to Markdown and figures with pdf-mistral
3. Have a Claude/Codex team write a reading note with digest-paper (an ORRERY add-on)
4. Save a work log with `/log`, which shows up in that day's Daily Note. Tasks are tracked on a Kanban board

Contains no personal information. Works on both Mac and Windows (WSL2).

## How to use it

1. Download this folder and place it somewhere (on Windows, put it under a Windows-side folder such as `C:\Users\<you>\Documents\`)
2. In Obsidian, "Open folder as vault" → select this folder
3. If asked "Trust author and enable plugins?", choose "Trust"

If you move the contents into your own existing vault, you won't get the bundled plugins and settings (task notes won't render as Kanban, for example). Opening this vault as-is is the most reliable option. If you do move things, see step 0 of `00_Inbox/Getting started.md` for how to copy over Task Done At and PDF Mistral (Hi-Res), which aren't in Community Plugins, and how to set up Templater and Daily Notes.
4. Open `00_Inbox/Getting started.md` and work through it top to bottom

## Contents

- `00_Inbox/Getting started.md` — the demo flow (installing ORRERY → word-chain exercise → pdf-mistral → digest-paper → `/log` → Daily Note and Kanban)
- `01_Planning/Tasks.md` — the Kanban task board. Checking a card stamps a completion time and moves it to the Done column. Add cards via "Add task" in the command palette (`30_Templates/Scripts/addTaskQA.js`) or by asking an agent with `/addtodo`/`/adddone`
- `02_DailyNotes/` — daily records. Template at `30_Templates/Daily Note.md` (auto-lists open tasks, tasks completed today, today's work logs, and notes created/edited today)
- `05_Agents/` — logs from working with AI (`LOG_YYYY-MM-DDTHHmm Title.md`), created with `/log`
- `10_Reference/Papers/` — sample papers (CC BY 4.0) and their sources
- `10_Reference/Notes/` — where digest-paper saves its reading notes
- `20_MDPapers/` — Markdown and figures produced by pdf-mistral
- `CLAUDE.md` / `AGENTS.md` — the rules AI agents follow in this vault (Claude Code reads `CLAUDE.md`, Codex reads `AGENTS.md`; same content)
- `LICENSE` — this vault's notes, templates, and scripts are MIT-licensed. The bundled plugins and papers are excluded and follow their own licenses (`NOTICE.md`)
- `NOTICE.md` — licenses for the bundled plugins and papers

## What leaves this machine

- pdf-mistral sends the PDF you're converting to Mistral. You supply your own API key in the plugin's settings (none is bundled with this vault)
- Claude Code, Codex, and digest-paper send the notes and papers you have them read to whichever service you've configured

For unpublished papers or collaborative material, follow your institution's policies.
