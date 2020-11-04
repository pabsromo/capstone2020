/// <reference types="cypress" />

context('Home Page', () => {

    // Make sure the dates are correct
    // Make sure when an item is added, it is added in the right place
    // Make sure the user can modify already added items
    // Make sure the user only sees their own data
    // Make sure the user can delete items
    // Progress bars are correct
    // Navigate between pages
    // Logout user
    
    it('visit the page', () => {
        cy.visit('http://127.0.0.1:8000/')
    })
})