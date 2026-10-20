# LocalServe QA report

## Automated checks

| Check                                  | Current information                                             |
| -------------------------------------- | --------------------------------------------------------------- |
| Jest                                   | 19 suites and 145 tests. All passing (last verified 2026-10-20). |
| Playwright                             | 4 tests across 2 specs. All passing (last verified 2026-10-20).  |
| TypeScript, lint, and production build | no errors or warns.                                             |

The current browser tests cover the full booking journey and slot-conflict
recovery. There is still no mobile journey, so that remains a required gap.
Three defects are still open (see [bug reports](./bug-reports.md)): the category
tiles and Clear control are not keyboard reachable, changing category does not
reset the current page number, and a misspelled module filename.

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
