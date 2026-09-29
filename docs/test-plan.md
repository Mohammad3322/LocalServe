# LocalServe Test Plan

| Item          | Value                                          |
| ------------- | ---------------------------------------------- |
| Project       | LocalServe — find and book local professionals |
| Version       | 1.0                                            |
| Stack         | Next.js 16.3.5, React 19.2.8, TypeScript 5     |
| Unit / UI     | Jest 30 + React Testing Library (jsdom)        |
| Browser tests | Playwright 1.63 (Chromium)                     |
| Node          | v24.18.0                                       |
| Machine       | Windows, PowerShell                            |

---

## 1. What I test

I cover the parts a user actually touches:

- Public pages: home, services, service page, search, provider profile, about, FAQ.
- The booking wizard: service → date & time → details → review, then confirmation.
- The four API routes: search, availability, create booking, get booking.
- Search filters, sorting, pagination, and the URL.
- Slots, slot conflicts, form validation, and double submit.
- Page metadata, sitemap, robots.
- Layout on phone, tablet, and desktop widths.
- Keyboard use and accessible names on the main controls.

## 2. What I don't test

- Payments and accounts. The project has neither.
- Real network problems. Data is local seed data, so "network" here just means
  the dev server and the in-memory booking store.
- Firefox and Safari. I only have Chromium installed, so I test one engine plus
  a few screen widths. This is a real gap, not coverage.
- Speed and load. I have no Lighthouse run and no bundle budget yet.

## 3. Test environment

| Item       | Value                                               |
| ---------- | --------------------------------------------------- |
| OS         | Windows (win32), PowerShell 5.1                     |
| Browser    | Chromium (Playwright build v1243)                   |
| Dev server | `npm run dev -- --port 3000`, started by Playwright |
| API origin | `http://localhost:3000/api` (from `.env.local`)     |
| Data       | Seed files in `lib/data/seed/`                      |
| Bookings   | In-memory map in `lib/data/mock-bookings.ts`        |

## 4. How I test

| Type          | What it is for                         | Tool                          | Count                 |
| ------------- | -------------------------------------- | ----------------------------- | --------------------- |
| Static checks | Catch problems before anything runs    | `tsc`, `eslint`, `next build` | 3 gates               |
| Jest          | Domain logic, UI behaviour, real flows | Jest + RTL                    | 20 suites / 162 tests |
| E2E           | Full journeys in a real browser        | Playwright                    | 2 specs / 4 tests     |
| Manual        | What automation cannot check           | `docs/test-cases.md`          | 43 cases              |

## 5. Feature areas

| Area             | What I check                                                  |
| ---------------- | ------------------------------------------------------------- |
| Home search      | Two inputs, suggestions, submit goes to `/search`             |
| Search results   | Category / rating / availability filters, sort, paginate      |
| Provider profile | Header, services, reviews, availability, book button          |
| Availability     | Slots per provider, disabled days, empty and error states     |
| Booking wizard   | Each step, validation, review, confirmation                   |
| Slot conflicts   | 409 message shown, form data kept, user sent back to calendar |
| Data layer       | Seed filtering, schemas, in-memory store                      |
| API routes       | Query validation, status codes, conflicts, lookup             |
| SEO              | Titles, descriptions, index, sitemap, robots                  |
| Responsive       | No sideways scroll, tap targets big enough, filters usable    |

## 6. Browsers and screens

| Browser  | Engine | Status                  |
| -------- | ------ | ----------------------- |
| Chromium | Blink  | Used for E2E            |
| Chrome   | Blink  | Same engine as Chromium |

| Width  | Device       | Checked by                              |
| ------ | ------------ | --------------------------------------- |
| 360px  | Small phone  | Manual only                             |
| 390px  | Phone        | Manual, plus a throwaway overflow check |
| 768px  | Tablet       | Manual only                             |
| 1024px | Small laptop | Manual only                             |
| 1280px | Desktop      | Playwright default viewport             |

## 7. Accessibility

What I did:

- Gave the two search fields different accessible names (they shared one before).
- Made each calendar day announce a full date, not just the day number.
- Set `aria-disabled` on days with no slots so they cannot be picked.
- Checked the sort and filter controls work from the keyboard.

## 8. SEO checks

| Check                                     | Result                                       |
| ----------------------------------------- | -------------------------------------------- |
| Public pages render on the server         | Pass — home, services, about, FAQ are static |
| Each provider page has its own metadata   | Done with `generateMetadata`                 |
| Each service page has its own metadata    | Done with `generateMetadata`                 |
| `sitemap.xml` exists                      | Done in `app/sitemap.ts`                     |
| `robots.txt` exists                       | Done in `app/robots.ts`                      |
| Confirmation page is `noindex`            | Set in the booking layout                    |
| Wizard and search pages opt out of Google | Set in their metadata                        |
| JSON-LD on provider pages                 | Done as `LocalBusiness`                      |

## 9. Performance

Honestly, I have nothing here yet.

## 11. When I start and stop

I start testing a change when:

1. `npm run typecheck` passes.
2. `npm run lint` passes.
3. `npm run build` passes.
4. The suite was green before my change, so a new failure is mine.
5. I know which requirement I am changing, so I know what to test.

I stop when:

1. No Critical bugs left.
2. No High bugs in search or booking.
3. Required E2E tests pass.
4. Required Jest tests pass.
5. Typecheck, lint and build pass.
6. The manual checklist for that area passes.
