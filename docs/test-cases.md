# LocalServe - Manual Test Cases

## 1. Search & Filtering Tests

| Test ID        | Scenario / Action                                                                              | Expected Result                                                                         | Status      |
| :------------- | :--------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- | :---------- |
| **TC-SRCH-01** | Enter a valid service title (e.g., Solar Energy) or part of it (e.g, Solar) in the search bar. | The provider list updates to show only professionals offering solar services.           | [ ] Pending |
| **TC-SRCH-02** | Select a specific location filter (e.g., Paris).                                               | Only providers located in or serving Paris should be displayed.                         | [ ] Pending |
| **TC-SRCH-03** | Search for a service that does not exist.                                                      | An empty state message appears: "No professionals found matching your search criteria." | [ ] Pending |

## 2. Provider Profile & Details Tests

| Test ID        | Scenario / Action                               | Expected Result                                                                                             | Status      |
| :------------- | :---------------------------------------------- | :---------------------------------------------------------------------------------------------------------- | :---------- |
| **TC-PROV-01** | Click on any provider card from the list.       | The browser navigates to the correct provider profile page showing their details, pricing, and credentials. | [ ] Pending |
| **TC-PROV-02** | Check the reviews section on a provider's page. | Customer reviews, ratings, and creation dates are displayed correctly.                                      | [ ] Pending |

## 3. Booking Workflow Tests

| Test ID        | Scenario / Action                                                         | Expected Result                                                                        | Status      |
| :------------- | :------------------------------------------------------------------------ | :------------------------------------------------------------------------------------- | :---------- |
| **TC-BOOK-01** | Select an available time slot and click "Book".                           | The booking form opens with the correct provider and service pre-selected.             | [ ] Pending |
| **TC-BOOK-02** | Submit the booking form without entering required fields (Name or Email). | Inline validation errors appear, preventing form submission.                           | [ ] Pending |
| **TC-BOOK-03** | Fill in valid client details and complete the booking.                    | A success screen appears with a unique booking reference number.                       | [ ] Pending |
| **TC-BOOK-04** | Try to book a slot that has already been taken by another user.           | A clear error message is shown, prompting the user to pick a different available slot. | [ ] Pending |

## 4. Responsive Design & Mobile Tests

| Test ID       | Scenario / Action                                         | Expected Result                                                                                 | Status      |
| :------------ | :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------- | :---------- |
| **TC-MOB-01** | Open the website on a mobile viewport (390px width).      | The layout adjusts properly, and navigation/filters are accessible via a mobile menu or drawer. | [ ] Pending |
| **TC-MOB-02** | Complete a booking flow entirely on a mobile screen size. | All buttons, inputs, and touch targets are easy to tap and complete successfully.               | [ ] Pending |
