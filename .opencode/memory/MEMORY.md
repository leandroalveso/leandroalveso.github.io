# Project Memory — Leandro Alves Portfolio

## Core Facts

- Next.js 14 App Router, static export (`output: 'export'` → `out/`), deployed to GitHub Pages via `.github/workflows/nextjs.yml` (Node 20, `npm ci`, `next build --no-lint`, uploads `./out`; `actions/configure-pages` injects `basePath`).
- Personal portfolio + technical blog. Blog content lives in `content/blog/*.md` (frontmatter: `title`, `date`, `tags`, `description`).
- Blog data layer: `lib/posts.ts` (frontmatter validation, reading minutes, adjacent/related/tag helpers), `lib/blog-search.ts` (title/description/tag scoring — the client index ships no post bodies).
- Renderer: `components/MarkdownRenderer.tsx` — remark-gfm + remark-math (KaTeX), rehype-sanitize with an extended schema (callouts, heading ids), PrismLight highlighting (`components/FixWrapper.tsx` + `components/prism-token-colors.css`), Mermaid (`components/MermaidDiagram.tsx`), tables, TOC via `components/BlogToc.tsx`.
- SEO/feeds: `app/feed.xml/route.ts` (RSS), `app/sitemap.ts`, `app/robots.ts`, JSON-LD (BlogPosting + BreadcrumbList) on post pages, canonical/OG metadata.
- Fonts: self-hosted via `next/font/google` only — Syne (`--font-syne`, variable 400–800; `font-black` clamps to 800) and DM Sans (`--font-dm-sans`, variable 100–1000 + italics). Never load fonts from external CDNs.

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Build (static export) | `npm run build` (alias: `npm run export`) |
| CI simulation | `python .opencode/skills/cicd-pipeline/scripts/run_pipeline.py` |
| Secret scan (staged) | `npm run security:gitleaks` |
| Secret scan (full repo) | `npm run security:scan` |
| Lockfile supply-chain gate | `npm run security:lockfile` |
| Skill tests | `python -m pytest .opencode/skills/cicd-pipeline/tests/` |

## Harness (ported from nuniversity)

- **Pre-commit** (`.husky/pre-commit`): pinned/checksum-verified gitleaks on the staged diff (`scripts/security-gitleaks.mjs`, config `.gitleaks.toml`), then `lint-staged` — `eslint --fix` for staged TS/TSX and `scripts/security-lockfile.mjs` for package.json/lockfile changes. Bypass once: `SKIP_GITLEAKS=1` / `SKIP_SECURITY_LOCKFILE=1`; bypass all: `git commit --no-verify`.
- **cicd-pipeline skill** (`.opencode/skills/cicd-pipeline/`): deterministic local simulation of the Pages workflow — install → lint → typecheck → build; exit codes 0=pass, 1=warn, 2=fail. `--stage=`, `--dry-run`, `--verbose`, `PIPELINE_STAGES`.
- `.pre-commit-config.yaml` is optional (Python `pre-commit` tool users, gitleaks only); the Husky hook is the primary gate.
- `.gitignore` negations (`!.opencode/`, `!.husky/`, `!.gitleaks.toml`, `!.pre-commit-config.yaml`) keep the harness tracked despite the blanket `.*` local-folders rule.

## Known Findings / Follow-ups

- `npm audit --omit=dev` reports high/critical advisories in the pinned `next@14.0.3` tree (pre-existing). `scripts/security-lockfile.mjs` therefore warns on advisories (signature verification stays blocking); after upgrading to Next 14.2+, set `SECURITY_ENFORCE_AUDIT=1` semantics to blocking by default.
- Playwright browsers cannot launch in this dev environment (missing `libnspr4`, no sudo) — verify rendering via the generated HTML in `out/`, not a browser.

## Notes for Agents

- Before declaring blog work done: `npm run lint` + `npm run typecheck` + `npm run build`, then inspect `out/blog/<slug>/index.html` — the built HTML is the source of truth.
- Blog post bodies must stay out of the blog index bundle (search ships title/description/tags only).
- Empty `<span class="">` elements in built post HTML are harmless Prism whitespace tokens.
- All work is usually in-progress and uncommitted; ask before committing.
