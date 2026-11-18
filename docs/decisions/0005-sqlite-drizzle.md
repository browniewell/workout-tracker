# 0005: SQLite with Drizzle for storage

**Status:** Accepted, 2026-11-18

## Context

The log has to survive server restarts (S-005). It's a single-user app with
small, simple queries: save and edit entries, and load a date range. Tests
must use a throwaway database, never my real data.

SQLite fits that: one file, no database server to run, and it can live on a
Fly.io volume when I deploy (Milestone 4). 0001 already chose it. This
record is about how the code talks to it.

## Options considered

- **Prisma:** I used it on a previous API and it worked well. It has a
  polished ecosystem and an object-style query API, but it has its own schema
  language and a generated client, and it keeps SQL out of sight.
- **Drizzle:** the schema is plain TypeScript, the types come straight from
  it, and queries read like SQL. It's a thin layer over better-sqlite3, so
  an in-memory database for tests takes one line. It's new to me.
- **better-sqlite3 with hand-written SQL:** no extra layer, but no typed
  queries or migration tooling, so I'd build that plumbing myself.

## Decision

Drizzle on top of better-sqlite3, with drizzle-kit for migrations. The main
purpose of this project is learning, so where two tools would both do the
job, I pick the one I haven't used before.

## Consequences

S-005 includes a learning curve that Prisma wouldn't have. In exchange, I
get to compare the two first-hand, and I see the SQL behind each query. The
database file path comes from an environment variable, and tests use a
temporary or in-memory database.
