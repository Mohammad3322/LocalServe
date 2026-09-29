# LocalServe – Manual Test Cases

Manual test cases for LocalServe.  
Covers navigation, search, filters, provider profiles, availability, booking, failure states, responsive, accessibility and SEO.

**Total: 43 test cases**

---

## 1. Navigation (TC-01 – TC-05)

| ID    | Steps                                        | Expected                                                                                      | Status |
| ----- | -------------------------------------------- | --------------------------------------------------------------------------------------------- | ------ |
| TC-01 | Open `/`.                                    | Homepage shows hero, popular services, featured providers, how it works, FAQ preview and CTA. | Pass   |
| TC-02 | Click **Services** in the header.            | Goes to `/services` and lists every service.                                                  | Pass   |
| TC-03 | Click a service in the directory.            | Goes to the service page and the slug resolves.                                               | Pass   |
| TC-04 | Click a provider card.                       | Goes to the public provider page.                                                             | Pass   |
| TC-05 | Use Back then Forward in the booking wizard. | Each step is restored with the chosen service, date and time.                                 | Pass   |

---

## 2. Search and Filters (TC-06 – TC-15)

| ID    | Steps                                    | Expected                                       | Status |
| ----- | ---------------------------------------- | ---------------------------------------------- | ------ |
| TC-06 | On `/`, search a service and a location. | Goes to `/search` with both in the URL.        | Pass   |
| TC-07 | Search only a service.                   | `service` is in the URL, no `location`.        | Pass   |
| TC-08 | Search only a location.                  | `location` is in the URL, no `service`.        | Pass   |
| TC-09 | Submit with both fields empty.           | Goes to bare `/search`.                        | Pass   |
| TC-10 | Search a service that matches nothing.   | Shows a clear empty state.                     | Pass   |
| TC-11 | Pick a category filter.                  | Results narrow, `category` appears in the URL. | Pass   |
| TC-12 | Set minimum rating to 4.                 | Only providers rated 4+ remain.                | Pass   |
| TC-13 | Hide unavailable providers.              | Filter applies and appears in the URL.         | Pass   |
| TC-14 | Change the sort order.                   | Results reorder, `sort` updates in the URL.    | Pass   |
| TC-15 | Copy a filtered URL into a new tab.      | Same results render from the URL alone.        | Pass   |

---

## 3. Provider Profile (TC-16 – TC-19)

| ID    | Steps                                | Expected                                                       | Status |
| ----- | ------------------------------------ | -------------------------------------------------------------- | ------ |
| TC-16 | Open a provider profile.             | Shows name, headline, rating, review count and verified badge. | Pass   |
| TC-17 | Read the About section.              | Description, experience, credentials and languages are listed. | Pass   |
| TC-18 | Read the Reviews section.            | Reviews show author, rating, date and comment.                 | Pass   |
| TC-19 | Click **Book Service** on a service. | Goes to the booking page with the service in the URL.          | Pass   |

---

## 4. Availability (TC-20 – TC-24)

| ID    | Steps                                                   | Expected                                           | Status |
| ----- | ------------------------------------------------------- | -------------------------------------------------- | ------ |
| TC-20 | Open the booking step for a provider with availability. | A calendar loads and bookable days are selectable. | Pass   |
| TC-21 | Look at a day with no bookable slot.                    | Marked disabled, cannot be selected.               | Pass   |
| TC-22 | Select a day, then change to another day.               | The previously chosen time is cleared.             | Pass   |
| TC-23 | Open a provider whose every slot is taken.              | Explains no times are available.                   | Pass   |
| TC-24 | Choose a date and time, read the summary.               | Summary shows date and time, Continue is enabled.  | Pass   |

---

## 5. Booking Form (TC-25 – TC-32)

| ID    | Steps                                                  | Expected                                                        | Status |
| ----- | ------------------------------------------------------ | --------------------------------------------------------------- | ------ |
| TC-25 | Open the booking page with no service.                 | "Select a service first" with a link back to the provider.      | Pass   |
| TC-26 | Complete all steps and confirm.                        | Confirmation shows reference, provider, service, date and time. | Pass   |
| TC-27 | Submit with name and email empty.                      | Both fields flagged, submission blocked.                        | Pass   |
| TC-28 | Enter a name of only spaces.                           | Rejected as required-field error.                               | Pass   |
| TC-29 | Enter an invalid email like `ada@`.                    | Rejected with an email-specific message.                        | Pass   |
| TC-30 | Type more than 500 characters into Notes.              | Input capped at 500, counter stays at 500.                      | Pass   |
| TC-31 | Complete the form without Phone and Notes.             | Submission still succeeds.                                      | Pass   |
| TC-32 | Paste `<script>alert(1)</script>` into the name field. | Treated as plain text, rendered without executing.              | Pass   |

---

## 6. Failure States (TC-33 – TC-36)

| ID    | Steps                                                 | Expected                                                         | Status |
| ----- | ----------------------------------------------------- | ---------------------------------------------------------------- | ------ |
| TC-33 | Someone else takes the slot, then confirm.            | Clear "This time slot is no longer available" message.           | Pass   |
| TC-34 | On that conflict screen, check the form data.         | Customer's name and email are still on screen.                   | Pass   |
| TC-35 | Click **Choose Another Time** on the conflict screen. | Returns to date & time step with the service still selected.     | Pass   |
| TC-36 | Make the availability request fail.                   | A recoverable message appears, provider and service stay stable. | Pass   |

---

## 7. Responsive (TC-37 – TC-39)

| ID    | Steps                                        | Expected                                                    | Status  |
| ----- | -------------------------------------------- | ----------------------------------------------------------- | ------- |
| TC-37 | Load main pages at 360px.                    | No horizontal scrolling on any page.                        | Not run |
| TC-38 | Repeat the check at 768px and 1024px.        | No horizontal scrolling, layout moves to wider arrangement. | Not run |
| TC-39 | Complete a booking using only taps at 390px. | Every control reachable and tappable.                       | Not run |

---

## 8. Accessibility (TC-40 – TC-41)

| ID    | Steps                                                      | Expected                                                 | Status |
| ----- | ---------------------------------------------------------- | -------------------------------------------------------- | ------ |
| TC-40 | Tab to the search inputs on the homepage.                  | Service and location are announced with different names. | Pass   |
| TC-41 | Tab to the sort control on `/search` and use the keyboard. | Receives focus, can be applied with Enter.               | Pass   |

---

## 9. Metadata and SEO (TC-42 – TC-43)

| ID    | Steps                                              | Expected                                                  | Status  |
| ----- | -------------------------------------------------- | --------------------------------------------------------- | ------- |
| TC-42 | Inspect `<title>` and description of public pages. | Each public page has a descriptive title and description. | Not run |
| TC-43 | Request `/sitemap.xml` and `/robots.txt`.          | Both are served with public routes and crawl rules.       | Not run |

---

## Result Summary

| Area               | Cases  | Pass   | Fail  | Not run |
| ------------------ | ------ | ------ | ----- | ------- |
| Navigation         | 5      | 5      | 0     | 0       |
| Search and filters | 10     | 10     | 0     | 0       |
| Provider profile   | 4      | 4      | 0     | 0       |
| Availability       | 5      | 5      | 0     | 0       |
| Booking form       | 8      | 8      | 0     | 0       |
| Failure states     | 4      | 4      | 0     | 0       |
| Responsive         | 3      | 0      | 0     | 3       |
| Accessibility      | 2      | 2      | 0     | 0       |
| Metadata and SEO   | 2      | 0      | 0     | 2       |
| **Total**          | **43** | **38** | **0** | **5**   |
