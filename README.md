---
tags: [claude]
---

## What this is

An Obsidian vault for the ORRERY demo. (Japanese version: [orrery-demo-vault](https://github.com/gyroid-eth/orrery-demo-vault).) It pairs ORRERY (a tool for running and observing multiple AI agents from one screen) with Obsidian's note-taking and task management, so you can try the following yourself:

1. Install ORRERY and have Claude Code and Codex verify communication with a word-chain exercise
2. Convert a paper PDF to Markdown and figures with pdf-mistral (a how-to; you may use the bundled converted papers instead)
3. Have a Claude/Codex team write a reading note with digest-paper (an ORRERY add-on)
4. Save a work log with `/log`, which shows up in that day's Daily Note. Tasks are tracked on a Kanban board

Contains no personal information. Works on both Mac and Windows (WSL2).

## How to use it

Do these in order. On Windows 11, ORRERY runs inside WSL2 Ubuntu and Obsidian runs on the Windows side; each step below says which.

1. **Install Obsidian**: [0. Obsidian](https://github.com/gyroid-eth/orrery/blob/master/docs/en/install.md#0-obsidian-when-you-use-it) (skip if you already have it)
2. **Install ORRERY**: [Mac](https://github.com/gyroid-eth/orrery/blob/master/docs/en/install.md#mac) or [Windows 11](https://github.com/gyroid-eth/orrery/blob/master/docs/en/install.md#windows-11), through the end of that section (it includes Claude Code or Codex). It ends by pointing to "Using it with Obsidian"; do not follow that, and come back here for step 3 instead (step 3 is the same thing for this vault)
3. **Install the research set**: one line (on Windows, in the Ubuntu window). It installs digest-paper, **places this vault** in your Documents folder, and makes it the work folder of the agents you start from then on (see [Using it with Obsidian](https://github.com/gyroid-eth/orrery/blob/master/docs/en/install.md#using-it-with-obsidian)):

   ```bash
   curl -fsSL https://raw.githubusercontent.com/gyroid-eth/orrery/master/scripts/research-set.sh | bash -s -- --lang en
   ```

   If you use Codex, do [Install the Codex plugin](https://github.com/gyroid-eth/orrery/blob/master/docs/en/install.md#install-the-codex-plugin-if-you-use-codex) after this step.

4. **Open the vault in Obsidian**: "Open folder as vault" → the vault in your Documents folder (`~/Documents/orrery-demo-vault-en` on a Mac; on Windows, the Windows Documents folder, shown in Windows form at the end of step 3). If asked "Trust author and enable plugins?", choose "Trust author and enable plugins"
5. **Open `00_Inbox/Getting started.md`** in the vault and work through it top to bottom

**Without the research set**: download this folder and place it somewhere (on Windows, put it under a Windows-side folder such as `C:\Users\<you>\Documents\`), then do step 4. An agent then works in this vault only if you start it there (see step 2 of Getting started).

If you move the contents into your own existing vault, you won't get the bundled plugins and settings (task notes won't render as Kanban, for example). Opening this vault as-is is the most reliable option. If you do move things, see step 0 of `00_Inbox/Getting started.md` for how to copy over Task Done At and PDF Mistral (Hi-Res), which aren't in Community Plugins, and how to set up Templater and Daily Notes.

## Contents

- `00_Inbox/Getting started.md` — the demo flow (installing ORRERY → word-chain exercise → pdf-mistral → digest-paper → `/log` → Daily Note and Kanban)
- `01_Planning/Tasks.md` — the Kanban task board. Checking a card stamps a completion time and moves it to the Done column. Add cards via "Add task" in the command palette (`30_Templates/Scripts/addTaskQA.js`) or by asking an agent with `/addtodo`/`/adddone`
- `02_DailyNotes/` — daily records. Template at `30_Templates/Daily Note.md` (auto-lists open tasks, tasks completed today, today's work logs, and notes created/edited today)
- `05_Agents/` — logs from working with AI (`LOG_YYYY-MM-DDTHHmm Title.md`), created with `/log`
- `10_Reference/Papers/` — sample papers (CC BY 4.0), their sources, and a table of licenses (the bundled converted papers are listed too)
- `10_Reference/Notes/` — where digest-paper saves its reading notes. A sample note for Onimaru et al. 2016 is included, along with an example reading note for Tanaka et al. 2024 (`=tanakaFabricSoftPneumatic2024=.md`)
- `20_MDPapers/` — Markdown and figures produced by pdf-mistral. Six converted papers are bundled (Onimaru et al. 2016, Tanaka et al. 2024, Inoue and Kondo 2016, Imada et al. 2025, Nojoomi et al. 2018, Seelinger et al. 2024; CC BY 4.0)
- `CLAUDE.md` / `AGENTS.md` — the rules AI agents follow in this vault (Claude Code reads `CLAUDE.md`, Codex reads `AGENTS.md`; same content)
- `LICENSE` — this vault's notes, templates, and scripts are MIT-licensed. The bundled plugins and papers are excluded and follow their own licenses (`NOTICE.md`)
- `NOTICE.md` — licenses for the bundled plugins and papers

## What leaves this machine

- pdf-mistral sends the PDF you're converting to Mistral. You supply your own API key in the plugin's settings (none is bundled with this vault)
- Claude Code, Codex, and digest-paper send the notes and papers you have them read to whichever service you've configured

For unpublished papers or collaborative material, follow your institution's policies.
