---
title: Astro
description: Add Forge Stats to your Astro site, with full support for View Transitions.
---

Add the script to your base layout and you are set - including View Transitions support out of the box.

```astro
---
// src/layouts/Layout.astro
---

<head>
  <script
    is:inline
    defer
    src="https://forge.codeserk.es/cdn/stats.js"
    data-base-url="https://api-events.forge.codeserk.es"
    data-sdk="YOUR_SDK_KEY"></script>
</head>
```

Two things worth noting:

- **`is:inline`** is required. Without it, Astro bundles the script, which **breaks `document.currentScript`** - and the auto-detection relies on that.
- **`defer`** still works with `is:inline`, so you keep the performance benefit.

## View Transitions

If your site uses [View Transitions](https://docs.astro.build/en/guides/view-transitions/), the script listens to `astro:page-load` automatically. Every navigation gets tracked as a page view - _nothing else to configure_.
