/// <reference types="cypress" />

Cypress.Cookies.defaults({
    preserve: "csrftoken"
})

// users can add items to income
// users can add items to fixed expenses
// users can adjust where their additional spending goes
// users can modify their items in various sections
// Adjusting additional spending is shown in progress bars in the home page
// Summary is calculated correctly

// users should be able to navigate to other pages and log out