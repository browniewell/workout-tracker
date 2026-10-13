# 0004: Store calendar dates as YYYY-MM-DD strings

**Status:** Accepted, 2026-10-13

## Context

A workout belongs to a day on my calendar, not to an instant in time.
Timestamps bring time zone bugs (an 11pm workout landing on the next day).

## Decision

Workout, rest and sick dates are stored as local `YYYY-MM-DD` strings.
Date math uses a small helper library rather than raw `Date` objects.

## Consequences

"Today" is passed into core functions as an argument, which also makes the
logic easy to test.
