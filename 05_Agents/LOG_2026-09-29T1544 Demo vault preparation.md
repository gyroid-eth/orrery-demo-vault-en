---
tags: [claude]
---

## Goal

Build the Biomatter Lab demo vault (2026-10-01) from the 2026-08-30 talk vault, so attendees can try everything from installing ORRERY through the word-chain exercise, pdf-mistral, digest-paper, `/log`, and the Daily Note/Kanban flow, following [[Getting started]] end to end.

## Discussion process

- The talk vault had a lot of notes specific to that day's presentation: talk notes, Q&A, attendee troubleshooting, a web app demo, a note.com article, QR codes, and so on. None of that belongs in the demo, so it was dropped and the whole flow was consolidated into [[Getting started]]
- pdf-mistral was matched to the settings in the distributed Release (v1.1.1). That version only saves figures inside the vault, so the output folder was set to `20_MDPapers/` so it can be handed straight to digest-paper
- Papers were chosen for redistributable CC BY 4.0 licensing, verified against both Crossref and the PDF body text
- Testing `/log` surfaced local Claude Code personal settings bleeding in, producing logs with different headings than this vault expects. Rewrote it to match this vault's `CLAUDE.md` and the log skill's format

## What was implemented

- Bundled PDF Mistral (Hi-Res) 1.1.1 in `.obsidian/plugins/pdf-mistral-plugin/`. API key left empty ([[NOTICE]])
- [[Getting started]]: steps 0–6, each with its own "check." Covers both Mac and Windows (WSL2)
- `10_Reference/Papers/`: Onimaru et al. 2016 (CC BY 4.0) and [[Paper sources and licenses]]
- [[Tasks]]: turned each demo step into a card
- log skill: the final Obsidian-open step now uses an `obsidian://` URL that works on both Mac and WSL

## Related notes

- [[Getting started]]
- [[Tasks]]
- [[Paper sources and licenses]]
- [[README]]
- [[NOTICE]]

## Next actions

- [ ] Open this vault in Obsidian on Windows and verify plugin loading and the Daily Note
- [ ] Run through step 3 (pdf-mistral) and step 4 (digest-paper) once with the bundled paper
