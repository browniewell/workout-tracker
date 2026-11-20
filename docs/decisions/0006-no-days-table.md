# 0006: Store entries by date, with no table of days

**Status:** Accepted, 2026-11-18

## Context

The core logic works on `DayLog`s: one per day, with that day's workouts and
whether it was rest or sick. Most days have nothing logged, and I don't want
empty rows for them. The question is whether the database should mirror
`DayLog` with a table of days.

## Options considered

- **A days table, with workouts pointing to it:** mirrors `DayLog`, and the
  database can enforce the link. But every write has to keep the two tables
  in sync: create the day before its first workout, and delete it when its
  last workout goes, unless it's rest or sick.
- **No days table:** workouts and rest/sick marks each carry their own date.
  A day exists only when something references it, so there's nothing to keep
  in sync.

## Decision

No days table. Workouts get one row each, and rest/sick marks one row per
date. A day can be rest or sick but not both, so `DayLog` holds a single
mark instead of two booleans.

## Consequences

`DayLog` is a shape for the core rules, not a stored record. The data-access
module is the one place that builds `DayLog`s from rows, including date-only
logs for days with nothing logged. Features that are about workouts rather
than days, like running totals, can query the workouts table directly.
