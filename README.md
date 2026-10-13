# Workout Consistency Tracker

> 🚧 **WORK IN PROGRESS:** actively being built. Expect missing features and rough edges.

A personal tracker focused on **consistency, not intensity**: it answers "am I showing up?", not "am I getting stronger?"

The v1 goal is simple: **don't miss two days in a row.** Planned rest days and sick days never count as misses. See [decision 0003](docs/decisions/0003-no-two-misses-goal.md) for the full rules.

## Getting started

Requires Node 26 (see `.nvmrc`).

```bash
npm install
npm run dev        # API on :3000, web app on :5173
npm test           # run the test suite once
npm run test:watch # rerun tests on save
```

Other checks (all run in CI): `npm run typecheck`, `npm run lint`, `npm run format:check`.

## Project layout

```
src/core/    pure logic: goal evaluation and totals (no I/O)
src/server/  Express API
src/web/     Vite + React app
docs/decisions/  why things are the way they are
```

## Planning

Work is planned as stories in [GitHub Issues](https://github.com/browniewell/workout-tracker/issues) and tracked on the [project board](https://github.com/users/browniewell/projects/1). Each PR closes the story it delivers.
