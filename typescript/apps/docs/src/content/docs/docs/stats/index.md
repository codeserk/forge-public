---
title: Forge Stats
description: Lightweight, privacy-friendly analytics for any web project.
---

Forge Stats tracks page views, custom events, and uncaught errors, and sends them to the Forge API. No fingerprinting, no third-party scripts phoning home, **no cookie banners required**.

It works in any context:

- Drop a `<script>` tag and forget about it (add `data-errors` to also capture uncaught errors globally)
- Use the TypeScript SDK if you need more control, custom events, or manual error tracking
- Works with plain HTML, SPAs, Astro, Node.js, and React Native

## Pick your approach

**[Script (CDN)](/docs/stats/usage/script)** - one tag in your `<head>`, done. No build step, no npm. Best for most cases.

**[TypeScript SDK](/docs/stats/usage/sdks/typescript)** - install the package and call `track()`. Use this when you need custom event data, error handling, or are working in Node.js or React Native.

## Integrations

**[Astro](/docs/stats/usage/integrations/astro)** - full View Transitions support out of the box.
