---
title: Forge Stats
description: Lightweight, privacy-friendly analytics for any web project.
---

Forge Stats is the analytics module of Forge. It tracks page views and sends them to the Forge API - that's it. No fingerprinting, no third-party scripts phoning home, no cookie banners required.

It works in any context:

- Drop a `<script>` tag and forget about it
- Use the TypeScript SDK if you need more control
- Works with plain HTML, SPAs, Astro, Node.js, and React Native

## Pick your approach

**[Script (CDN)](/docs/stats/usage/script)** - one tag in your `<head>`, done. No build step, no npm. Best for most cases.

**[TypeScript SDK](/docs/stats/usage/sdks/typescript)** - install the package and call `track()`. Use this when you need custom event data, error handling, or are working in Node.js or React Native.

## Integrations

**[Astro](/docs/stats/usage/integrations/astro)** - full View Transitions support out of the box.
