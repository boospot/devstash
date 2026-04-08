# Security Issues

Last updated: 2026-04-08

## 1) Critical: SSRF risk in ZIP export

- Location:
  - `src/app/api/export/route.ts`
  - `src/actions/import.ts`
  - `src/actions/items.ts`
- Problem:
  - ZIP export fetches `item.fileUrl` on the server.
  - `fileUrl` can be persisted from import/create flows without strict host allowlisting.
- Impact:
  - Server-side request forgery (SSRF) against internal or unintended endpoints.
- Fix:
  1. Allow only trusted file hosts (your R2 host) when saving `fileUrl`.
  2. Re-validate allowlist in export route before `fetch`.
  3. Reject any non-allowlisted host.

## 2) High: Open redirect risk in sign-in flow

- Location:
  - `src/components/auth/sign-in-form.tsx`
- Problem:
  - `callbackUrl` from query params is pushed directly with `router.push(callbackUrl)`.
- Impact:
  - Redirect target can be user-controlled.
- Fix:
  1. Allow only internal relative paths.
  2. Reject absolute and protocol-relative URLs.
  3. Fallback to `/dashboard` when invalid.

## 3) High: Missing ownership validation for `collectionIds`

- Location:
  - `src/lib/db/items.ts` (`createItem`, `updateItem`)
- Problem:
  - Item-to-collection links are created from incoming IDs without verifying collection ownership.
- Impact:
  - Cross-tenant relation corruption if foreign IDs are used.
- Fix:
  1. Query valid collection IDs by current `userId`.
  2. Intersect incoming IDs with valid IDs.
  3. Reject invalid IDs and write only verified IDs in one transaction.
