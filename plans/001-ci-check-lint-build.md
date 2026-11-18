# Plan 001: Run type check, lint and build on every pull request

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report, do not improvise. When done, update the status row for this plan
> in `plans/README.md`.
>
> **Drift check (run first)**: `git diff --stat f7c9072..HEAD -- package.json yarn.lock .github vite.config.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `f7c9072`, 2026-11-18
- **Issue**: none

## Why this matters

The repo has no tests and no CI. The only check on a pull request, Dependabot's included, is Vercel's preview build. That build catches a compile error but not a type error, a lint failure or a Prettier violation. The repo is public, so GitHub Actions minutes are free for it. A workflow that runs the three scripts the project already has closes the gap at no running cost.

## Current state

- `package.json` scripts (the commands to run):
  - `"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json"`
  - `"lint": "prettier --check . && eslint ."`
  - `"build": "vite build"`
- Package manager is Yarn 1 (`yarn.lock`, no `packageManager` field, no `.nvmrc`). Vercel builds on Node 22.x (see the comment in `.github/dependabot.yml`: "Vercel builds on Node 22.x").
- **Trap**: in Yarn 1, `yarn check` is a built-in command (it verifies installed packages against the lockfile). It runs instead of the `check` script, and on a fresh install it fails with errors about wrong package versions. The script must be invoked as `yarn run check`. Checked at planning time on Node 24.19.0 and Yarn 1.22.22: `yarn run check` reports `0 ERRORS 0 WARNINGS`, `yarn lint` passes, `yarn build` passes (it prints "Could not detect a supported production environment", which is the expected adapter-auto message, not a failure).
- `.github/` holds only `dependabot.yml`. It already has a `github-actions` ecosystem block, so Dependabot will keep action versions current once a workflow exists.
- The contact route reads `AHASEND_API_KEY`, `AHASEND_ACCOUNT_ID` and `AHASEND_FROM_ADDRESS` through `src/env.ts` (`defineEnvVars`). The build passed locally with none of them set, so CI needs no secrets.
- Repo style: tabs in JSON and source, single quotes in YAML (see `.github/dependabot.yml`), conventional commits (`ci:`, `feat:`, `fix:`, `docs:`, `chore:`).

## Commands you will need

| Purpose                | Command                                               | Expected on success   |
| ---------------------- | ----------------------------------------------------- | --------------------- |
| Install                | `yarn install --frozen-lockfile`                      | exit 0                |
| Type check             | `yarn run check`                                      | `0 ERRORS 0 WARNINGS` |
| Lint                   | `yarn lint`                                           | exit 0                |
| Build                  | `yarn build`                                          | exit 0                |
| Validate workflow YAML | `npx --yes prettier --check .github/workflows/ci.yml` | exit 0                |

## Scope

**In scope**:

- `.github/workflows/ci.yml` (create)

**Out of scope**:

- Any source change. If a command fails on a clean checkout, that is a STOP condition, not something to fix here.
- A test runner. The repo has none and this plan does not add one.
- A link checker for project URLs. It was judged not worth it until CI exists and has not been planned.
- Branch protection settings. Making the check required is the owner's call in the GitHub settings.

## Git workflow

- Branch: `advisor/001-ci-check-lint-build`
- Commit message style: conventional commits, for example `ci: run check, lint and build on pull requests`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Confirm the three commands pass on a clean install

Run `yarn install --frozen-lockfile`, then `yarn run check`, `yarn lint`, `yarn build`.

**Verify**: all four exit 0. If any fails, STOP.

### Step 2: Create the workflow

Create `.github/workflows/ci.yml` with this shape. Look up the current major version of `actions/checkout` and `actions/setup-node` with `gh api repos/actions/checkout/releases/latest -q .tag_name` (and the same for `setup-node`) and use those majors.

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [master]

permissions:
  contents: read

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  verify:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@<major>
      - uses: actions/setup-node@<major>
        with:
          node-version: 22
          cache: yarn
      - run: yarn install --frozen-lockfile
      - run: yarn run check
      - run: yarn lint
      - run: yarn build
```

Notes for the executor: the default branch is `master`, not `main`. Use `yarn run check`, never `yarn check` (see "Current state").

**Verify**: `npx --yes prettier --check .github/workflows/ci.yml` exits 0 (Prettier reads the repo's config; run `npx --yes prettier --write .github/workflows/ci.yml` once if it reports a style difference, then re-check).

### Step 3: Commit

Stage `.github/workflows/ci.yml` by name and commit.

**Verify**: `git status --short` is empty.

## Test plan

No unit tests exist for a workflow file. The real test is the first run: when the branch is pushed and a PR is opened (only if the operator asked for that), the `verify` job on the PR must finish green. Until then, Step 1 is the stand-in, since the job runs those same commands.

## Done criteria

- [ ] `.github/workflows/ci.yml` exists and `npx --yes prettier --check .github/workflows/ci.yml` exits 0
- [ ] The file contains `yarn run check`, `yarn lint`, `yarn build` and does not contain `yarn check`
- [ ] The trigger names `master`
- [ ] No files outside `.github/workflows/` and `plans/README.md` are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

- `yarn run check`, `yarn lint` or `yarn build` fails on a clean `yarn install --frozen-lockfile`. Report the output instead of fixing source.
- The default branch is no longer `master` (`git symbolic-ref refs/remotes/origin/HEAD`).
- A `.github/workflows/` directory already exists with another CI file. Report it, since this plan would duplicate it.

## Maintenance notes

- A new check (a test runner, a link checker) goes in as another step of this job.
- If the repo moves to a different Yarn or Node version, change `node-version` here at the same time as the Dependabot `@types/node` note and Vercel's Node setting.
- After the first green run, the owner can mark `verify` as a required check in the repository's branch protection. That is not part of this plan.
