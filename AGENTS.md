# AGENTS.md — UI mockups → Vue SPA migration

## Goal
Convert static mockups in `ui/*.html` into a single-page app (SPA) using Vue 3 + Vite + Vue Router.

## Non-negotiables
- Preserve the visual output and DOM structure as closely as possible.
- Keep `ui/*.html` intact as source-of-truth references (do not delete).
- Every `ui/<name>.html` becomes a route `/<name>` (with special-case `index.html` => `/`).
- Replace internal page-to-page <a href="...html"> links with Vue Router navigation.
- Consolidate each page’s inline <style> into CSS files; also factor out shared CSS.

## Implementation plan
1. Inspect `ui/*.html`:
   - Identify page list, shared layout, navigation links, asset paths (images/fonts).
   - Collect each file’s inline `<style>` and note common selectors/rules.
2. Scaffold Vue app (Vue 3 + Vite):
   - Use TypeScript if repo already uses TS, otherwise JS.
   - Add Vue Router.
3. Port pages:
   - Create `src/views/<PageName>View.vue` per page.
   - Paste the HTML that belongs in `<body>` into the `<template>`.
   - Move page-specific `<style>` into `src/assets/styles/pages/<pagename>.css`.
   - Import that CSS from the corresponding view component (or via route-level layout if needed).
4. CSS consolidation:
   - Create `src/assets/styles/base.css` (global resets/shared typography/etc).
   - Create `src/assets/styles/components.css` or `shared.css` for repeated rules.
   - Keep page CSS minimal; only unique rules remain per page.
5. Assets:
   - Put static assets in `public/` (or `src/assets/` if imported) to preserve paths.
   - Fix relative links as needed so the app renders the same.
6. Dev/test:
   - Ensure `npm install`, `npm run dev`, and `npm run build` work.
   - Add concise README steps.

## Acceptance criteria checklist
- `npm run dev` serves the SPA.
- All routes render and match the mockups closely.
- No broken internal links (router navigation works).
- No missing assets.
- CSS is consolidated (no inline <style> left in views, unless absolutely required).
- Original `ui/*.html` untouched.

## Preferences
- Prefer simple, explicit code over abstractions.
- Avoid introducing heavy UI libraries unless required by the mockups.
- Keep diffs reviewable: small commits/steps, clear file organization.
