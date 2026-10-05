---
tags:
  - daily_note
date: <% tp.file.title %>
---

###### 🎯 Today's highlight

- 

###### ✔ Tasks
```dataview
TASK
FROM "01_Planning"
WHERE !completed AND !contains(meta(section).subpath, "Ideas")
SORT due ASC
```

###### ✔ Completed today
```dataview
TASK
FROM "01_Planning"
WHERE completed AND (due = this.file.day OR dateformat(done-at, "yyyy-MM-dd") = dateformat(this.file.day, "yyyy-MM-dd"))
SORT done-at DESC
```

###### 🔗 Today's work logs
```dataview
LIST
FROM "05_Agents"
WHERE startswith(file.name, "LOG_" + dateformat(this.file.day, "yyyy-MM-dd"))
SORT file.name DESC
```

###### 📝 Notes created today
```dataview
LIST
FROM ""
WHERE file.cday = date(this.date) AND file.name != this.file.name
SORT file.ctime DESC
LIMIT 50
```

###### 🔄 Notes edited today
```dataview
LIST
FROM ""
WHERE file.mday = date(this.date) AND file.cday != date(this.date) AND file.name != this.file.name
SORT file.mtime DESC
LIMIT 50
```

##### 🔗 Prev / next
← [[<% tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD") %>]] | [[<% tp.date.now("YYYY-MM-DD", 1, tp.file.title, "YYYY-MM-DD") %>]] →
