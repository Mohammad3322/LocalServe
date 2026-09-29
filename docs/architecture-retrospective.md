# LocalServe architecture retrospective

This is my short review of the main choices in the current version. I used the
working code and test files as the reference. The project still uses local seed
data, so these decisions are for a portfolio demo and not a production service.

## Decisions I would keep

### Search filters belong in the URL

Search, location, category, rating, availability, sort order, and page are
represented as query parameters. That makes a result page easier to share and
means Back and Forward can restore the view.

### Use public slugs for profiles and IDs for booking operations

Provider profiles use `/providers/[providerSlug]`, which is readable when
shared. Booking and availability use provider IDs because they are stable keys
for looking up records. Keeping those roles separate avoids putting internal
IDs in public profile links.

### Keep interactive code in client components

Pages and layouts can stay server components unless they need browser state,
storage, event handlers, or client navigation. Search inputs, booking forms,
calendar interactions, and confirmation recovery need client behavior.

### Keep the booking draft in the browser, but not as the source of truth

The booking flow uses Zustand with `sessionStorage` so the customer can move
between steps without losing the form. The API still validates the final
request.

### Treat availability differently from profile data

Provider and service details come from predictable seed data. Availability can
change during a booking, so the API response uses `Cache-Control: no-store` and
the browser request opts out of caching. This is safer for slot selection than
reusing a stale response, even though the current data source is local.

### Put validation and data access behind reusable modules

Zod schemas check API and form data. Search, provider lookup, and availability
logic live in service modules rather than being duplicated across page
components.

## QA retrospective

1. **Which testing method found the most defects?**The booking
   conflict E2E test did expose an important cross-page issue, and the Jest
   tests now cover metadata and request details.
2. **Which booking defect was hardest to reproduce?** `BUG-004`: "Choose
   Another Time" discarded the chosen service
3. **Which requirement was hardest to test?** Availability freshness. The slot
   response should not be reused from cache, so both the API response and the
   browser request need the right cache behavior.
4. **Which test became brittle?** The browser tests are most at risk when they
   depend on a control's visible text or its position in the page.
5. **Which failure mode was initially forgotten?** A time slot could become
   stale while a customer is booking.
6. **What belongs at unit level rather than E2E?** Search and formatting
   functions, input schemas, metadata helpers, and service lookups. E2E is for
   real navigation and flows such as submitting a booking or recovering from a
   slot conflict.
7. **Which checks remain better manual?** Screen-reader behavior, visual
   hierarchy, and whether the mobile filter layout is comfortable
   to use.
8. **What would change with real payments or accounts?** I would add durable
   server-side storage, account authorization, payment provider integration,
   and tests for duplicate submissions, payment failures,and access to
   booking details.
