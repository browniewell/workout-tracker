# 0003: v1 goal is "don't miss two days in a row"

**Status:** Accepted, 2026-10-13

## Context

The tracker is about consistency, not intensity, and should never punish rest.
A weekly count ("5 per week") was the original idea.

## Decision

The only v1 goal is: never miss two days in a row.

Each day gets one status:

- **done:** at least one qualifying workout
- **rest:** a planned rest day
- **sick:** an unplanned day off for illness, marked after the fact
- **missed:** a past day that is none of the above
- **pending:** today, with nothing logged yet

Rest and sick days are never misses. The rule crosses week boundaries
(missing Sunday and Monday counts as two in a row). Today is never a miss
until it's over.

## Consequences

Statuses are computed from the data every time, never stored, so marking
yesterday as sick immediately changes the result. A weekly target can be
added later as a second goal type.
