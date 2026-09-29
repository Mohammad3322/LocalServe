# LocalServe system design

## What the app does

LocalServe is a front-end project for finding local professionals and booking
an appointment. A visitor can search by service and location, compare provider
profiles, check availability, and complete a booking.

The current version uses generated seed data and a small in-memory booking
store. It is a working project demo, not a production booking service.

## Functional requirements

| ID    | Requirement                                           |
| ----- | ----------------------------------------------------- |
| FR-01 | Search providers by service and location              |
| FR-02 | Filter, sort, and page through results                |
| FR-03 | Open a provider profile and view services and reviews |
| FR-04 | View availability and choose a slot                   |
| FR-05 | Validate details and create a booking                 |
| FR-06 | Confirm or recover a booking                          |

## Non-functional requirements

| ID     | Requirement                                  |
| ------ | -------------------------------------------- |
| NFR-01 | Keep public pages fast                       |
| NFR-02 | Provide crawlable public metadata and routes |
| NFR-03 | Support responsive layouts                   |
| NFR-05 | Recover from common request failures         |
| NFR-06 | Keep availability data fresh                 |
| NFR-07 | Limit unnecessary client JavaScript          |
| NFR-08 | Handle customer details appropriately        |

## Main routes

| Route                                     | Purpose                                                      |
| ----------------------------------------- | ------------------------------------------------------------ |
| `/`                                       | Landing page and search form                                 |
| `/services` and `/services/[serviceSlug]` | Browse service categories                                    |
| `/search`                                 | Filter and sort provider results                             |
| `/providers/[providerSlug]`               | Read a provider profile, reviews, services, and availability |
| `/book/[providerId]`                      | Choose a service, date, and time                             |
| `/book/[providerId]/details`              | Enter customer details                                       |
| `/book/[providerId]/review`               | Review and submit a booking                                  |
| `/booking/confirmation/[bookingId]`       | Show a booking confirmation                                  |
| `/api/provider/search`                    | Return matching providers                                    |
| `/api/availability`                       | Return current availability for a provider                   |
| `/api/bookings`                           | Validate and create a booking                                |
| `/api/bookings/[bookingId]`               | Look up a booking for confirmation                           |

The public profile URL uses a readable provider slug. Booking and API routes
use the provider's internal ID because those operations need a stable key.

## How the app is organized

```text
app/                    Next.js routes, layouts, metadata, and route handlers
components/             Page sections and interactive UI
lib/data/seed/           Generated local provider, service, review, and slot data
lib/services/            Search and data lookup logic
lib/api/                 Browser-side API requests
lib/validation/           Zod schemas for request and domain data
lib/store/               Booking draft state in the browser
test/                    Jest unit, component, and integration tests
e2e/                     Playwright browser tests
```

The route handlers validate input and use the service and data layers. The UI
does not need to know how the seed arrays are generated.

### Search and public pages

The home search builds URL query parameters and navigates to `/search`. Search
filters and sorting are represented in the URL, so the current result view can
be shared or restored by using browser navigation. The search API validates
those parameters before calling the search service.

Public provider and service pages read from the generated seed data on the
server. Provider profiles use dynamic metadata and LocalBusiness structured
data. The sitemap includes public marketing, service, and provider routes.
Search, booking, confirmation, and API routes are not included as public
sitemap entries.

### Booking and availability

The booking flow is split into service/date selection, customer details, and
review steps. The selected service is carried in the URL where the flow needs
to return to availability. Other draft values are held in a Zustand store
persisted to `sessionStorage`.

Availability is requested from the API and is not cached because a slot can be
booked while someone is using the page. The API checks seed availability and
bookings already held in the in-memory store. Booking input is validated before
the API creates a booking; a conflict returns HTTP 409 so the UI can explain
what happened and let the customer choose another time.

The confirmation page reads the booking from session storage first and can
request it from the API if needed. Customer details are not put in the booking
URL or page metadata. The booking reference and opaque booking ID are used for
confirmation.

## Component and state boundaries

- App Router pages and layouts are server components by default.
- Components that need React state, browser storage, event handlers, or client
  navigation opt in with `"use client"`.
- Search filters live in the URL rather than being duplicated in separate page
  state.
- The booking draft is client state because the customer moves through several
  pages before submitting.
- Zod schemas are used at API and form boundaries so invalid data is rejected
  before it is used.

This keeps public page data on the server where possible, while reserving client
components for interactions.

## Important choices and trade-offs

| Decision                                        | Why it is used here                                                                                                     | Trade-off                                                                                                 |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Server pages with client interaction components | Public profile and service content can render from seed data on the server; forms and filters need browser interaction. | Client boundaries still need care to avoid shipping more JavaScript than needed.                          |
| Search state in the URL                         | Filters and sort order can be shared, reloaded, and navigated with Back/Forward.                                        | Query parameters need validation and sensible defaults.                                                   |
| Human-readable provider slugs                   | Profile links are readable and suitable for public sharing.                                                             | The slug has to be unique and resolved to the internal provider ID.                                       |
| Zustand booking draft in session storage        | Values survive movement between booking pages in the same browser session.                                              | This is not server persistence and is not shared across devices or tabs.                                  |
| No-store availability responses                 | Slot information can change during the booking flow.                                                                    | The API is called more often than a cached endpoint would be.                                             |
| Seed data plus services and route handlers      | It keeps the demo easy to run without an external database.                                                             | In-memory bookings disappear when the server restarts and are not safe for concurrent production traffic. |

## Limits and next steps

There is no authentication, payment processing, or database. Booking creation
uses a process-local map, so it does not provide durable storage or a reliable
cross-instance slot lock. A production version would need persistent storage,
an atomic availability check, authentication/authorization where required, and
monitoring.

The accessibility and responsive-design defects found during QA are all
recorded and fixed in [bug reports](./bug-reports.md). The gaps that remain are
unverifiable rather than unfixed: no accessibility audit has been run, there is
no mobile end-to-end journey, and performance has not been measured against a
budget.
