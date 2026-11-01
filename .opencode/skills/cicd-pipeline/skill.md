---
name: cicd-pipeline
description: "Simulates the CI/CD pipeline locally — runs install, lint, typecheck, and build before you commit"
triggers:
  - "**/*.{ts,tsx,js}"
  - "**/package.json"
  - "**/package-lock.json"
version: "1.0.0"
metadata:
  category: "devops"
  audience: "developers"
  difficulty: "beginner"
---

# CI/CD Pipeline Simulator Skill

## Activation Context

Activate when the user wants to run a local CI/CD simulation, check if their changes will pass CI, or run the full install/test/build pipeline. This skill mirrors `.github/workflows/nextjs.yml` (the Deploy Next.js site to Pages workflow).

---

## Instructions

### Step 1: Run the Full Pipeline

Run the pipeline orchestrator script to execute all detected stages:

```bash
python .opencode/skills/cicd-pipeline/scripts/run_pipeline.py
```

The script auto-detects the project type and runs all relevant stages.

### Step 2: Run Specific Stages

To run only certain stages:

```bash
python .opencode/skills/cicd-pipeline/scripts/run_pipeline.py --stage=lint,typecheck
```

Available stages: `install`, `lint`, `typecheck`, `build`

### Step 3: Dry Run

To preview what would run without executing:

```bash
python .opencode/skills/cicd-pipeline/scripts/run_pipeline.py --dry-run
```

### Step 4: Verbose Output

For detailed output including stderr from each stage:

```bash
python .opencode/skills/cicd-pipeline/scripts/run_pipeline.py --verbose
```

### Step 5: Interpret Results

- **PASS** — Stage completed successfully
- **FAIL** — Stage failed (blocking — fix before committing)

### Step 6: Fix Failures

When a stage fails:
1. Read the error output for file:line references
2. Fix the issues in the reported files
3. Re-run the pipeline to verify

---

## Pipeline Stages (mirrors .github/workflows/nextjs.yml)

| # | Stage | Tool | Command |
|---|-------|------|---------|
| 1 | Install | npm | `npm ci` |
| 2 | Lint | Next.js | `npx next lint` |
| 3 | Typecheck | TypeScript | `npx tsc --noEmit` |
| 4 | Build | Next.js | `npx next build` |

CI itself runs **install + build** (`next build --no-lint`, then uploads `./out` to Pages). The `lint` and `typecheck` stages are local gates that catch the same class of errors before CI does — `next build` also type-checks, so a green `build` stage alone is already CI-equivalent.

---

## Output Format

```
╔══════════════════════════════════════════════╗
║          CI/CD Pipeline Simulator            ║
╚══════════════════════════════════════════════╝

[1/4] Install dependencies (npm ci)............. ✅ PASS (14.8s)
[2/4] Lint (next lint)......................... ✅ PASS (3.1s)
[3/4] Typecheck (tsc --noEmit)................. ✅ PASS (4.2s)
[4/4] Build with Next.js (npx next build)..... ✅ PASS (52.6s)

══════════════════════════════════════════════
  Result: 4 PASSED, 0 FAILED
  Total time: 74.7s
══════════════════════════════════════════════
```

---

## Quality Rules

- All stages must PASS for the pipeline to succeed
- A single FAIL means the pipeline fails (exit code 2)

---

## Exit Codes

- `0` — All stages passed
- `1` — Warnings (not used in this pipeline)
- `2` — One or more stages failed

---

## Reference

See `references/pipeline-stages.md` for detailed documentation of each stage.
