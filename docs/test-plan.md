# LocalServe - Test Plan (Junior Developer Guide)

## 1. Project Overview & Testing Goal

The goal of this test plan is to ensure that the LocalServe platform works smoothly and reliably. We want to make sure users can easily search for services, view provider details, and book appointments without running into bugs.

## 2. Scope of Testing

We will focus on three main types of testing:

- **Unit Tests:** Testing small helper functions (like Date formatting ) to make sure they return the expected output.
- **Component Tests:** Testing React components (like the Provider Card or Booking Form) to ensure they render data correctly on the screen.
- **End-to-End (E2E) Tests:** Simulating real user behavior from start to finish (searching for a service $\rightarrow$ selecting a provider $\rightarrow$ choosing a time slot $\rightarrow$ completing a booking).

## 3. Test Environments & Devices

- **Desktop Browser:** Google Chrome (Latest version).
- **Mobile Viewport:** Simulated mobile screen (390px width) to test responsive design and touch interactions.

## 4. Key Manual Test Scenarios (Test Cases)

Here are the main scenarios we must manually verify:

1. **Successful Booking Flow:** A user can successfully search, select a slot, fill out their details, and receive a confirmation reference number.
2. **Slot Conflict Handling:** If a time slot is already taken, the system shows a clear error message and lets the user pick a different slot without losing their typed data.
3. **Search & Filters:** Selecting location or category filters correctly updates the results list and updates the URL parameters.
4. **Form Validation:** The booking form correctly catches empty required fields (like name or email) and prevents submission.

## 5. Tools Used

- **Vitest / React Testing Library:** For running unit and component tests quickly.
- **Playwright:** For automated browser testing of core user workflows.
