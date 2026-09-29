# LocalServe QA report

## Automated checks

| Check                                  | Current information                                             |
| -------------------------------------- | --------------------------------------------------------------- |
| Jest                                   | 20 suites and 162 tests. All passed after the availability fix. |
| Playwright                             | 4 tests across 2 specs. `_tmp-overflow.spec.ts` is not counted.  |
| TypeScript, lint, and production build | no errors or warns.                                             |

The current browser tests cover the full booking journey and slot-conflict
recovery. The temporary overflow diagnostic is not a mobile booking test, so
the mobile journey is still a required.

## Current SEO implementation

Provider and service pages generate page-specific metadata. Provider profiles
include LocalBusiness structured data. `app/sitemap.ts` lists public routes,
`app/robots.ts` defines crawler rules, and search and booking routes opt out of
indexing. The SEO unit tests cover the helper functions and crawl rules.

The built pages should still be inspected directly, especially canonical URLs,
Open Graph output, sitemap contents, and the robots response.

## Limits

- Bookings are stored in memory and are lost when the server process stops.
- No real database, authentication, or payment flow is included.
