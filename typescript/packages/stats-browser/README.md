# @codeserk/forge-stats-browser

CDN-ready browser script for [Forge Stats](https://github.com/codeserk/forge-public). Drop a single `<script>` tag into any page — no bundler required.

Auto-detects the page context and tracks views accordingly:

- **Astro** - listens to `astro:page-load` (View Transitions)
- **SPA** - patches `history.pushState` + listens to `popstate`
- **Plain HTML** - fires once on page load

## Usage

Add the script tag to your `<head>` with `defer` so it loads in parallel and never blocks page rendering:

```html
<script
  defer
  src="https://forge.codeserk.es/cdn/stats.js"
  data-base-url="https://api-events.forge.codeserk.es"
  data-sdk="YOUR_SDK_KEY"
></script>
```

That's it. Page views are tracked automatically.

### Astro

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

> `is:inline` is required to prevent Astro from bundling the script, so that `document.currentScript` works correctly. `defer` still applies and prevents render blocking.
