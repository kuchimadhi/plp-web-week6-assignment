# SpendWise Interactive

SpendWise is a simple budgeting dashboard that helps users track spending, compare it against a monthly budget, and understand whether they are over or under budget. This version adds interactivity by using JavaScript to collect user input, make decisions, and update the page dynamically.

## Improvements made this week

- Added a budget input so the user can update their monthly spending limit.
- Added an expense form with fields for expense name, category, and amount.
- Added live summary cards that show total budget, expenses, and remaining balance.
- Added an expense list with a delete option to remove individual records.
- Added push notifications-style status messages to show whether the budget is safe, near limit, or over budget.

## How conditionals are used

Conditional statements are used to calculate the budget health message. For example, JavaScript checks whether the remaining amount is negative, close to zero, or still comfortably above the threshold. Based on that result, the page shows a different message and color-coded status:

- If remaining budget is less than zero, the app warns that the user is over budget.
- If remaining budget is low but not negative, the app shows a caution message.
- Otherwise, it shows a success message telling the user they are on track.

## How arrays are used to store data

The app stores all expense records in an array called `expenses`. Each expense is an object containing:

- a unique id
- a name
- a category
- an amount

This structure makes it easy to add, remove, calculate, and display multiple records without creating separate variables for each one.

## How loops are used

Loops are used to read through the `expenses` array and process each item. The app loops through the list to:

- calculate the total expenses
- group totals by category
- render the expense table on the page
- create the category summary list

Using loops makes the code shorter, cleaner, and easier to maintain.

## How the DOM is updated

The project uses JavaScript DOM manipulation to update the webpage without reloading it. After the user adds or deletes an expense, the script updates:

- the total expenses card
- the remaining budget card
- the budget status message
- the list of categories
- the expense table

This is done by selecting HTML elements and changing their `textContent` or `innerHTML` values.

## How user interactions are handled through events

The app listens for user actions such as:

- clicking the update budget button
- clicking the reset budget button
- submitting the expense form
- clicking the delete button for an expense

Each interaction triggers an event listener, which calls a function to update the app state and refresh the dashboard.

## Challenges and how they were resolved

One challenge was keeping the budget calculation and displayed information in sync after each change. The solution was to centralize the logic in a single function called `updateDashboard()`, which recalculates totals and refreshes every relevant section whenever the data changes.

Another challenge was making the page responsive and readable on smaller screens. This was handled by using CSS grid and media queries so the dashboard still looks clean on mobile devices.

## Project structure

- `index.html` contains the layout of the budget dashboard.
- `style.css` contains the design and responsive styling.
- `script.js` contains the interactive logic and event handling.
- `README.md` explains the project and the concepts used.
