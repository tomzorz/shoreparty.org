# Napkin

## Corrections
| Date | Source | What Went Wrong | What To Do Instead |
|------|--------|----------------|-------------------|

## Patterns That Don't Work
- `markdown-it` cannot be bumped to 15.x: `markdown-it-html5-media@0.8.0` peer-caps it at `>=13 <15`. npm install fails with ERESOLVE. Stay on 14.x until html5-media widens the range or gets replaced.

## Domain Notes
- Eleventy ≥2.0 disables *indented* markdown code blocks by design, even for custom `setLibrary` instances. All posts use fenced blocks now (the one indented block was converted 2026-08); if a future post pastes indented code it will silently render as a paragraph. Re-enable would be `eleventyConfig.amendLibrary("md", lib => lib.enable("code"))`.
- Posts deliberately contain no Liquid/Nunjucks syntax and `markdownTemplateEngine` is `false`, so `{{ }}` in code samples is safe to paste verbatim. Don't reintroduce a markdown template engine without checking every post.
- `sitemap.xml` `<lastmod>` derives from `page.date` = filesystem dates (git doesn't preserve them), so it shifts whenever files are touched or the repo is re-cloned. Cosmetic, not a build bug.
- Netlify deploys from the `prod` branch, not `main` (netlify.toml does not say so). Pushing `main` alone publishes nothing: fast-forward `prod` to `main` and push both.
