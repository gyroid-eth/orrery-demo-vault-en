---
tags: [claude]
---

This is the walkthrough for the ORRERY demo. Work through it top to bottom. Once you see the **check** for a step, move on to the next. As you go, check off cards on the [[Tasks]] board, and they'll show up in today's Daily Note under "Completed today."

Windows users: type commands **inside WSL2 Ubuntu** (the `user@PC:~$` prompt). Obsidian and the PDF conversion happen on the Windows side.

Any agent or dashboard launched from Windows Terminal keeps running in the background even if you close the Ubuntu window. When you're done and want to give the memory WSL is using back to Windows, run `wsl --shutdown` in PowerShell (Ubuntu is ready to use again next time you open it).

###### 0. Open this vault

1. Put this vault's folder somewhere. If you ran the research set (step 1 below), it is already placed:
	- Mac: e.g. `~/Documents/orrery-demo-vault-en`
	- Windows: e.g. `C:\Users\<you>\Documents\orrery-demo-vault-en`
	- WSL (same folder as Windows): `/mnt/c/Users/<you>/Documents/orrery-demo-vault-en`; check with `wslpath -u 'C:\Users\<you>\Documents\orrery-demo-vault-en'`
2. In Obsidian, "Open folder as vault" → select this folder
3. If asked "Trust author and enable plugins?", choose "Trust author and enable plugins"

**Open this vault as-is.** The Kanban task board, the Daily Note listings, and the paper conversion all run on plugins bundled with this vault. If you move the contents into your own vault instead, do the following first (otherwise task notes won't render as Kanban, the Daily Note listings will come up empty, and so on):

- Install and enable from Community Plugins: **Kanban**, **Dataview**, **Templater**, **Calendar**, **QuickAdd**
- Not in Community Plugins (**Task Done At**, **PDF Mistral (Hi-Res)**): **only if** your own vault's `.obsidian/plugins/` doesn't already have a folder with the same name (`task-done-at`, `pdf-mistral-plugin`), create that folder and copy **`main.js`, `manifest.json`, `styles.css`, `pdf.worker.min.js` (whichever exist)** from the same folder in this vault. **Don't copy `data.json`** (that's where settings and API keys live — copying it can overwrite your own settings). Reopen Obsidian, enable the plugins, and in the PDF Mistral settings set **Markdown Output Folder** and **Images Output Folder** to `20_MDPapers`, **Images Folder Name** to `pdf-mistral-images`, and **Image Render DPI** to `300` (this vault's instructions and prompts assume this layout — if you don't copy `data.json`, the default output location is the vault root). Enter your own API key in that same settings screen
- To use the "**Add task**" command (QuickAdd) from the command palette: copy `30_Templates/Scripts/addTaskQA.js` to the same path, create a Macro choice named "Add task" in QuickAdd settings, add `30_Templates/Scripts/addTaskQA.js` as a User Script inside it, and turn on ⚡ (show in command palette). If you don't need this, asking an agent with `/addtodo` works just as well
- Settings: set Templater's "Template folder location" to `30_Templates` and turn on "Trigger Templater on new file creation." In core Daily Notes, set "New file location" to `02_DailyNotes` and "Template file location" to `30_Templates/Daily Note`. If you want today's note to open automatically, set "Files & links" → "Default file to open" to "Daily note"

**Check**: opening the vault creates today's Daily Note in `02_DailyNotes/` automatically (with "Files & links" → "Default file to open" set to "Daily note"), showing the "Tasks," "Completed today," and "Today's work logs" sections (use the calendar on the left to view other days).

###### 1. Install ORRERY

Install ORRERY by following its install guide for your computer, [Mac](https://github.com/gyroid-eth/orrery/blob/master/docs/en/install.md#mac) or [Windows 11](https://github.com/gyroid-eth/orrery/blob/master/docs/en/install.md#windows-11) (it includes Claude Code). That installs ORRERY itself (the agent roster, ORRERY Mail, the cockpit) and opens the cockpit in your browser.

Then run the research set (on Mac in Terminal; on Windows in the WSL2 Ubuntu window):

```bash
curl -fsSL https://raw.githubusercontent.com/gyroid-eth/orrery/master/scripts/research-set.sh | bash -s -- --lang en
```

The research set installs the digest-paper add-on, creates this vault if it's missing, makes this vault the work folder of the agents you start from then on, and finally prints the folder to open in Obsidian and a ready-to-paste prompt for your agent (with the paths filled in). If you've already set up this vault, it just installs the add-on without touching your notes. Manual setup steps are in each repository's README.

**Check**: the launched agents' names appear on the left side of the cockpit.

###### 2. Verify communication with a word-chain exercise

After the research set, start an agent from the cockpit's NEW AGENT: it starts in this vault by default. Then ask:

**The agent has to work in this vault's folder.** This vault's `/addtodo`, `/adddone`, `/log`, and its rules (`CLAUDE.md`/`AGENTS.md`) are only visible to an agent that works in this folder. An agent that was already running before you ran the research set stays on its old folder, so exit it and start a new one. If you start Claude Code yourself in a terminal, use `cd <vault path>` → `claude`. Launching from a different folder (like `~/orrery`) means these won't show up.

> Use /delegate to spawn a child, and play three rounds of a word-chain game over Mail

(If you don't have Codex, a Claude child works fine too)

**Check**: the Mail panel on the right of the cockpit shows the word-chain messages going back and forth. The mini-orrery shows a parent-child link. If it never completes a round, check the ORRERY Telemetry troubleshooting guide.

###### 3. Convert a paper PDF to Markdown (pdf-mistral)

**No Mistral key?** Skip this step — in step 4 you can choose "convert the PDF locally first" or "use the already-converted Onimaru 2016."

1. In Obsidian Settings → Community plugins → **PDF Mistral (Hi-Res)**, enter your Mistral API key. Keep the key in Obsidian's settings only — never in chat or notes
2. Sample papers are in `10_Reference/Papers/` ([[Paper sources and licenses]]). Convert Guo et al. 2024 live for the demo. Onimaru et al. 2016 already has a converted Markdown file and a sample reading note. To use your own paper, drop the PDF into this vault
3. Open the PDF, then run "Convert PDF to Markdown with images" from the command palette (`Cmd+P` / `Ctrl+P`)

**Check**: the paper's Markdown appears in `20_MDPapers/`, and its figures appear in `20_MDPapers/pdf-mistral-images/`.

The PDF is sent to Mistral. For unpublished papers or collaborative material, follow your institution's policies.

On Mistral's free plan, requests can fail with 429 (Too Many Requests) even if you haven't used any credits, so pdf-mistral doesn't work. Adding $10 of credit resolves it. Without credit, use the no-key route in step 4.

###### 4. Have an agent team write a reading note with digest-paper

digest-paper is an ORRERY add-on. One agent drafts the note, a second agent reviews it against the text and figures, and the two exchange findings directly over ORRERY Mail. With both Claude and Codex available, Claude writes and Codex reviews; with only one, two agents of the same kind split the roles (the note then states that the review wasn't cross-checked by a different vendor's model).

1. The add-on was installed by the one-liner in step 1 (the research set)
2. Paste the prompt shown at the end of the research set setup into an agent that works in this vault. There are three variants:
	- (a) from a paper already converted with pdf-mistral
	- (b) **no Mistral key**: convert the PDF locally first (e.g. Guo et al. 2024 in `10_Reference/Papers/`; the PDF never leaves the machine. Figures come from per-caption crops plus whole-page images, coarser than pdf-mistral. Scanned PDFs won't work)
	- (c) from the already-converted Onimaru et al. 2016 (the fastest option)
	
	If you've closed that screen, ask in this form (substitute your own paths):
	> Use digest-paper to write a reading note for this paper.
	> Paper: `<vault path>/20_MDPapers/<paper name>.md`
	> Vault: `<vault path>`, figures folder: `<vault path>/20_MDPapers/pdf-mistral-images`
	> Save to: `<vault path>/10_Reference/Notes`
	> Write the note in English.

An agent that works in this vault registers itself with ORRERY Mail before its first action (you may briefly see something like "no agent identity yet" — that's expected; once registration finishes it proceeds on its own, so just wait).

Save notes to **`10_Reference/Notes`**, per this vault's rules (`CLAUDE.md`). Pointing elsewhere makes the note harder for the `/log` agent and the Daily Note to find.

**Check**: in the cockpit, Mail messages flow back and forth between the writer and the reviewer. When it finishes, you'll have `10_Reference/Notes/<citekey>-<hash>/=<citekey>=.md` (e.g. `=GuoSelfregulatedReversalDeformation2024=.md`), with a line near the end naming which agent pair reviewed it. Since Onimaru 2016 already has a sample note, your own run lands alongside it as `…-r2`, so you can compare them. The note's `review_status` becomes `checked` (`checked` means the reviewer confirmed the checked points against the text and figures — it is not a guarantee that the paper itself is correct).

See the digest-paper README for details.

###### 5. Save a work log with `/log`

In Claude Code, run:

> /log wrote a paper note

**Check**: `05_Agents/LOG_<timestamp> wrote a paper note.md` is created, and it appears automatically under "Today's work logs" in today's Daily Note.

###### 6. Verify with the Daily Note and Kanban board

- On the [[Tasks]] board, check off a finished card. It gets a completion time and moves to the "Done" column
- Checked cards appear under "Completed today" in today's Daily Note
- To add something new yourself, press `Ctrl+P` (`Cmd+P` on Mac) and choose "**Add task**." You'll be asked for the task name, due date, and board, and a card is added to the To Do column
- To ask an agent, say "`/addtodo <task>`" (or "add X to the tasks") in Claude Code
- Telling an agent "`/adddone <task>`" (or "X is done") moves that card to Done, and it shows up under "Completed today" in today's Daily Note

###### Troubleshooting

- This vault's rules (how to write notes, the log format) live in `CLAUDE.md` (Codex: `AGENTS.md`). Agents read these and follow them
- For ORRERY issues, file them on the relevant GitHub repository's Issues page
