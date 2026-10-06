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

**If you already did steps 2 and 3 of the README, you can skip this step.** Install ORRERY by following its install guide for your computer, [Mac](https://github.com/gyroid-eth/orrery/blob/master/docs/en/install.md#mac) or [Windows 11](https://github.com/gyroid-eth/orrery/blob/master/docs/en/install.md#windows-11) (it includes Codex and Claude Code). That installs ORRERY itself (the agent roster, ORRERY Mail, the cockpit) and opens the cockpit in your browser.

Then run the research set (on Mac in Terminal; on Windows in the WSL2 Ubuntu window):

```bash
curl -fsSL https://raw.githubusercontent.com/gyroid-eth/orrery/master/scripts/research-set.sh | bash -s -- --lang en
```

The research set installs the digest-paper add-on, creates this vault if it's missing, makes this vault the work folder of the agents you start from then on, and finally prints the folder to open in Obsidian and a ready-to-paste prompt for your agent (with the paths filled in). If you've already set up this vault, it just installs the add-on without touching your notes. Manual setup steps are in each repository's README.

If you use Codex, do [Install the Codex plugin](https://github.com/gyroid-eth/orrery/blob/master/docs/en/install.md#install-the-codex-plugin-if-you-use-codex) **after the research set** (you need it to resume a finished Codex agent).

**Check**: the cockpit opens in your browser, and the research set's closing summary has a line `work folder  the vault (…)`, which means this vault is where agents work from now on. If you already ran the research set from the README, the line says `work folder  already the vault`, which is just as good. No agent has been started yet; you start one in step 2.

###### 2. Verify communication with a word-chain exercise

After the research set, start an agent from the cockpit's NEW AGENT: it starts in this vault by default. Then ask:

**The agent has to work in this vault's folder.** This vault's `/addtodo`, `/adddone`, `/log`, and its rules (`CLAUDE.md`/`AGENTS.md`) are only visible to an agent that works in this folder. An agent that was already running before you ran the research set stays on its old folder, so exit it and start a new one. If you start an agent yourself in a terminal, use `cd <vault path>` → `codex` (or `claude`). Launching from a different folder (like `~/orrery`) means these won't show up.

> Use $delegate to spawn a child, and play three rounds of a word-chain game over Mail

That is for a Codex agent. For a Claude Code agent, write `/delegate` instead of `$delegate` (in Codex, a word starting with `/` is one of Codex's own commands). The child can be Codex or Claude.

**Check**: the Mail panel on the right of the cockpit shows the word-chain messages going back and forth. The mini-orrery shows a parent-child link. If it never completes a round, check the ORRERY Telemetry troubleshooting guide.

###### 3. Convert a paper PDF to Markdown (pdf-mistral — a how-to)

This step is a **how-to**. `20_MDPapers/` already contains six converted papers (Onimaru et al. 2016, plus Tanaka et al. 2024, Inoue and Kondo 2016, Imada et al. 2025, Nojoomi et al. 2018, and Seelinger et al. 2024 — all CC BY 4.0, see [[Paper sources and licenses]]). **You may use the bundled converted papers**, so you can go straight to step 4 without converting anything. To convert your own paper, follow the steps below (and if you have no Mistral key, step 4 still lets you choose "convert the PDF locally first" or "use a bundled converted paper").

1. In Obsidian Settings → Community plugins → **PDF Mistral (Hi-Res)**, enter your Mistral API key. Keep the key in Obsidian's settings only — never in chat or notes
2. A PDF you can try converting is in `10_Reference/Papers/` (Guo et al. 2024; [[Paper sources and licenses]]). The bundled converted Markdown files are in `20_MDPapers/`, and the digest-paper sample note (Onimaru et al. 2016) is in `10_Reference/Notes/`. `=tanakaFabricSoftPneumatic2024=.md` in the same place (Tanaka et al. 2024) is an example reading note, not a digest-paper output. To use your own paper, drop the PDF into this vault
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
	- (c) pick one of the six bundled converted papers (Onimaru plus five others, all in `20_MDPapers/`) — the fastest option. The request that the research set prints for (c) names Onimaru, so to use one of the other five, replace the Paper line of the request with the full path of the `.md` you chose (`<vault path>/20_MDPapers/<paper name>.md`)
	
	If you've closed that screen, ask in this form (substitute your own paths):
	> Use digest-paper to write a reading note for this paper.
	> Paper: `<vault path>/20_MDPapers/<paper name>.md`
	> Vault: `<vault path>`, figures folder: `<vault path>/20_MDPapers/pdf-mistral-images`
	> Save to: `<vault path>/10_Reference/Notes`
	> Write the note in English.

An agent that works in this vault registers itself with ORRERY Mail before its first action (you may briefly see something like "no agent identity yet" — that's expected; once registration finishes it proceeds on its own, so just wait).

Save notes to **`10_Reference/Notes`**, per this vault's rules (`CLAUDE.md`). Pointing elsewhere makes the note harder for the `/log` agent and the Daily Note to find.

**Check**: in the cockpit, Mail messages flow back and forth between the writer and the reviewer. When it finishes, you'll have `10_Reference/Notes/<citekey>-<hash>/=<citekey>=.md` (e.g. `=GuoSelfregulatedReversalDeformation2024=.md`), with a line near the end naming which agent pair reviewed it. Since Onimaru 2016 already has a sample note, if you pick it, your own run lands alongside the sample as `…-r2`, so you can compare them. If you pick Tanaka 2024, your note is created in its own folder, so you can compare it with the example note. The note's `review_status` becomes `checked` (`checked` means the reviewer confirmed the checked points against the text and figures — it is not a guarantee that the paper itself is correct).

See the digest-paper README for details.

###### 5. Save a work log with `/log`

In Codex, ask in words (this vault's `AGENTS.md` gives the log format):

> Write a log: wrote a paper note

In Claude Code, run `/log wrote a paper note`.

**Check**: `05_Agents/LOG_<timestamp> wrote a paper note.md` is created, and it appears automatically under "Today's work logs" in today's Daily Note.

###### 6. Verify with the Daily Note and Kanban board

- On the [[Tasks]] board, check off a finished card. It gets a completion time and moves to the "Done" column
- Checked cards appear under "Completed today" in today's Daily Note
- To add something new yourself, press `Ctrl+P` (`Cmd+P` on Mac) and choose "**Add task**." You'll be asked for the task name, due date, and board, and a card is added to the To Do column
- To ask an agent, say "add X to the tasks" (in Claude Code, `/addtodo <task>` also works)
- Telling an agent "X is done" (in Claude Code, `/adddone <task>`) moves that card to Done, and it shows up under "Completed today" in today's Daily Note

###### Troubleshooting

- This vault's rules (how to write notes, the log format) live in `CLAUDE.md` (Codex: `AGENTS.md`). Agents read these and follow them
- For ORRERY issues, file them on the relevant GitHub repository's Issues page
