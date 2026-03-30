---
title: Script (CDN)
description: Add Forge Stats to any page with a single script tag - no bundler needed.
---

No npm, no build step, _no fuss_. Drop a `<script>` tag into your `<head>` and you are done.

```html
<script
  defer
  src="https://forge.codeserk.es/cdn/stats.js"
  data-base-url="https://api-events.forge.codeserk.es"
  data-sdk="YOUR_SDK_KEY"
></script>
```

Use `defer` so the script loads in parallel and **never blocks rendering**.

## What gets tracked

Page views are tracked automatically via `trackView`. The script detects the context it is running in and adapts:

- **Astro** - listens to `astro:page-load` to support View Transitions
- **SPA** - patches `history.pushState` and listens to `popstate`
- **Plain HTML** - fires once on load

No extra configuration needed for any of these - _it just works_.

## Astro

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
    data-sdk="YOUR_SDK_KEY"
  ></script>
</head>
```

> `is:inline` is required to prevent Astro from bundling the script, so that `document.currentScript` works correctly.

## Integrations

Looking for framework-specific setup? Check the integrations section:

- [Astro](/docs/stats/usage/integrations/astro)
