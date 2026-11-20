# 0007: Settings live in one row, created at startup from core defaults

**Status:** Accepted, 2026-11-20

## Context

Settings (the walk minimum and the tracking start date) are stored in the
database. Something has to create them the first time, and the default
values have to live somewhere. The start date can't be a fixed default: it's
the day I start tracking, and core never reads the clock (0004).

## Options considered

- **Key/value rows:** flexible, but every value is stored as text and has
  to be converted back when read.
- **One row, one column per setting:** typed columns. A fixed `id` of 1,
  enforced by a check constraint, keeps it to a single row.
- **Defaults as database column defaults:** puts a rule about what counts
  as a workout in the storage layer.
- **Creating the row the first time settings are read:** nothing to do at
  startup, but a read that writes is surprising.

## Decision

One settings row, with a check constraint so there can never be a second.
Default values live in core, next to the settings type. At server startup,
if there is no settings row, the server saves the defaults with today as
the start date. Saving settings is an upsert, so the same function handles
the first save and every later one.

## Consequences

Startup is the one place the settings row gets created. After that, the
start date only changes when I change it, never because of the workouts I
log or delete.
