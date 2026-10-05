// addTaskQA.js -- QuickAdd User Script
// Run from the QuickAdd Macro "Add task" (callable from the command palette).
// Prompts for a task name, then a due date, then a Kanban board under 01_Planning, and appends
// `- [ ] Task name 📅 YYYY-MM-DD` to the end of its To Do column (## To Do). Doesn't create a note
// or change the currently open file.
// Don't put Templater tags in comments (Templater will try to execute them).

module.exports = async (params) => {
  const { app, quickAddApi, obsidian } = params;
  const { Notice, Modal } = obsidian;
  const PLANNING = "01_Planning";

  // 1. Prompt for task name
  const taskName = await quickAddApi.inputPrompt("Task name");
  if (!taskName || !taskName.trim()) return;

  // 2. Due date picker
  const dueDate = await pickDate(params);

  // 3. Board selection
  const boards = app.vault.getFiles().filter((f) => {
    if (!f.path.startsWith(PLANNING + "/") || f.extension !== "md") return false;
    const cache = app.metadataCache.getFileCache(f);
    return cache?.frontmatter?.["kanban-plugin"] === "board";
  });

  if (boards.length === 0) {
    new Notice("❌ No Kanban board found");
    return;
  }

  boards.sort((a, b) => a.basename.localeCompare(b.basename));
  const board = await quickAddApi.suggester(
    boards.map((b) => b.basename),
    boards,
  );
  if (!board) return;

  // 4. Build the task line
  let taskLine = `- [ ] ${taskName.trim()}`;
  if (dueDate) taskLine += ` 📅 ${dueDate}`;

  // 5. Insert at the end of the To Do section
  const content = await app.vault.read(board);
  const lines = content.split("\n");
  // To Do column: ## To Do (or ## 未着手). If neither, the first column that isn't Ideas or Done
  let todoIdx = lines.findIndex((l) => /^## (未着手|To Do)\s*$/.test(l.trim()));
  if (todoIdx === -1)
    todoIdx = lines.findIndex((l) => /^## /.test(l) && !/アイデア|完了|Ideas|Done|Complete/i.test(l));

  if (todoIdx === -1) {
    new Notice("❌ No To Do column found (## To Do or ## 未着手)");
    return;
  }

  let i = todoIdx + 1;
  while (i < lines.length && lines[i].trim() === "") i++;
  while (
    i < lines.length &&
    (lines[i].startsWith("- [") || /^\t/.test(lines[i]))
  )
    i++;

  lines.splice(i, 0, taskLine);
  await app.vault.modify(board, lines.join("\n"));

  new Notice(`✅ Added to ${board.basename}: ${taskName.trim()}`);

  // Build the date in local time (building it in UTC would show the previous day until 9am JST)
  function localDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  // ---------------------------------------------------------------------------
  // Due date picker: Modal + <input type="date"> -> native OS calendar on mobile
  // Fallback: relative date selection via suggester
  // ---------------------------------------------------------------------------
  async function pickDate(p) {
    try {
      return await new Promise((resolve) => {
        let resolved = false;
        const done = (v) => {
          if (!resolved) {
            resolved = true;
            resolve(v);
          }
        };

        const modal = new Modal(app);
        modal.titleEl.setText("📅 Pick a due date");

        const ct = modal.contentEl;
        ct.style.padding = "16px";

        const input = ct.createEl("input");
        input.type = "date";
        input.value = localDate(new Date());
        Object.assign(input.style, {
          fontSize: "18px",
          padding: "12px",
          width: "100%",
          marginBottom: "16px",
        });

        const row = ct.createEl("div");
        row.style.display = "flex";
        row.style.gap = "8px";

        const okBtn = row.createEl("button", { text: "OK" });
        Object.assign(okBtn.style, {
          flex: "1",
          padding: "10px",
          fontSize: "16px",
        });
        okBtn.addEventListener("click", () => {
          done(input.value);
          modal.close();
        });

        const skipBtn = row.createEl("button", { text: "No due date" });
        Object.assign(skipBtn.style, {
          flex: "1",
          padding: "10px",
          fontSize: "16px",
        });
        skipBtn.addEventListener("click", () => {
          done(null);
          modal.close();
        });

        modal.onClose = () => done(null);
        modal.open();
      });
    } catch (_e) {
      const labels = ["Today", "Tomorrow", "Day after tomorrow", "In a week", "No due date", "Enter a date"];
      const choice = await p.quickAddApi.suggester(labels, labels);
      if (!choice || choice === "No due date") return null;

      const d = new Date();
      const fmt = localDate;

      if (choice === "Today") return fmt(d);
      if (choice === "Tomorrow") {
        d.setDate(d.getDate() + 1);
        return fmt(d);
      }
      if (choice === "Day after tomorrow") {
        d.setDate(d.getDate() + 2);
        return fmt(d);
      }
      if (choice === "In a week") {
        d.setDate(d.getDate() + 7);
        return fmt(d);
      }
      if (choice === "Enter a date") {
        return await p.quickAddApi.inputPrompt("Date (YYYY-MM-DD)");
      }
      return null;
    }
  }
};
