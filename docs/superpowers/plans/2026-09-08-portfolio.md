# Portfolio Implementation Plan

> Execution: subagent-driven-development for the independent backend; frontend and integration in the primary task.

**Goal:** Build a working React portfolio/activity journal backed by Strapi.
**Architecture:** Separate `fe` and `be` apps; REST boundary; feature logic/view separation.
**Tech Stack:** React, TypeScript, shadcn, Vite, TanStack Router/Query, Axios, Zod, Strapi 5.
**Spec:** ../specs/2026-09-08-portfolio-design.md

## Global constraints

Use the approved spec and its exact content field names. Keep secrets out of tracked files.
The workspace is empty and is not a Git repository; no existing changes to isolate or merge.
User-requested Vite/Strapi architecture takes precedence over a hosted Sites starter.

## Tasks

- [x] Backend: scaffold `be/`; add schema/controllers/routes/services for Profile,
  Project, Post, Tag. Test public draft isolation and writes before accepting API.
  Add opt-in demo seed, environment examples, build and startup verification.
- [x] Frontend: scaffold `fe/`; configure Router, Tailwind, shadcn primitives and
  typed REST boundary. Write failing tests for API normalization and query builder,
  implement, run tests. Build feature logic/view pairs and responsive layouts.
- [x] Integration: fetch seeded published content from real Strapi, check details,
  draft/write protections, error states, build both apps and review architecture.
- [x] Delivery: write README with install/run/admin/seed commands and known SPA
  deployment constraints. Open working local preview and report verified results.

## Progress

- Implemented approved scope. FE build/typecheck pass; seven FE tests and five BE tests pass.
- Backend admin build passed; root independently verified real CMS response schemas,
  slug details, kind filtering, draft queries, tag populate restrictions, write denial,
  CORS, and admin HTTP 200 against the running backend.
- Five frontend URLs returned HTTP 200. Local browser preview queued through Codex.
- Reviewer fixed Tag backrelation exposure and added CMS string-array validation.
- No deployment, admin account creation, or Git commit performed.
- Local session ownership: FE 63894 (port 5173), BE 72627 (port 1337).
- Shared interface: backend field names above are consumed by `fe/src/lib/content-schema.ts`.
- Frontend and backend own separate manifests/lockfiles, avoiding install conflicts.
