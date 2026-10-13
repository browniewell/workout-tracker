# 0001: TypeScript with Vite + React and Express

**Status:** Accepted, 2026-10-13

## Context

A single-user web app I can use from my phone and desktop. I'm returning to
hands-on coding and want a stack that is widely used and builds on what I know.

## Options considered

- **SvelteKit:** less boilerplate, but far less common in job postings.
- **Next.js:** popular, but adds server/client components and its own
  conventions on top of learning React.
- **Vite + React frontend, Express API:** React is the most common frontend
  library, and I've used Express before.

## Decision

Vite + React for the UI, Express for the API, TypeScript throughout. Vitest
for tests, SQLite for storage (Milestone 3), Fly.io for hosting (Milestone 4).

## Consequences

I write the API and the fetch calls myself, which is more plumbing than a
full-stack framework, but every layer is visible and easy to debug.
