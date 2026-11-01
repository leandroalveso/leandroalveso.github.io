# CI/CD Pipeline Stages Reference

Mirrors `.github/workflows/nextjs.yml` — the Deploy Next.js site to Pages workflow.

## Stage 1: Install dependencies

**Command:** `npm ci`

Installs dependencies from `package-lock.json`. Equivalent to `npm install` but faster and deterministic.

**Requires:** `package.json`, `package-lock.json`

---

## Stage 2: Lint

**Command:** `npx next lint`

Runs ESLint with `eslint-config-next` (`next/core-web-vitals`) over the project — the same config as `npm run lint`.

**Requires:** `package.json`, `.eslintrc.json`

---

## Stage 3: Typecheck

**Command:** `npx tsc --noEmit`

Type-checks the whole project without emitting output — the same check as `npm run typecheck`.

**Requires:** `package.json`, `tsconfig.json`

---

## Stage 4: Build with Next.js

**Command:** `npx next build`

Runs the full Next.js production build: lint, TypeScript compilation, static page generation, and export to `./out` (`output: 'export'` in `next.config.js`). Roughly 12 pages; about 1–2 minutes.

**Requires:** `package.json`, `next.config.js`

**Note:** CI runs this stage as `next build --no-lint` — lint is folded into the local `lint` stage above, and `next build` performs its own type-check regardless.

---

## Stage 5: Deploy (not simulated)

The deploy step uploads `./out` to GitHub Pages. This is not simulated locally — it only runs on GitHub Actions.

---

## Pipeline Config

**File:** `.github/workflows/nextjs.yml`

- Triggers on push to `main` branch (plus `workflow_dispatch`)
- Uses Node.js 20 with npm cache
- Caches `.next/cache`
- Concurrency group: `pages` (no cancel in-progress)
- `actions/configure-pages` with `static_site_generator: next` (injects `basePath`)
- Uploads `./out` via `actions/upload-pages-artifact@v3`
