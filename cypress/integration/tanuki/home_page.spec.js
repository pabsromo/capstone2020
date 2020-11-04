/// <reference types="cypress" />
Cypress.Cookies.defaults({
    preserve: "csrftoken"
})

context('Home Page', () => {

    
    
    // Make sure the user can modify already added items
    // Make sure the user only sees their own data
    // Make sure the user can delete items
    // Progress bars are correct
    
    
    
    it('Login', () => {
        cy.visit('http://127.0.0.1:8000/')

        cy.get('#username')
            .type('test', { delay: 100 })
            .should('have.value', 'test')

        cy.get('#password')
            .type('tanuki404', { delay: 100 })
            .should('have.value', 'tanuki404')

        cy.get('.userinfo')
            .find('form').submit()

        cy.url().should('eq', 'http://127.0.0.1:8000/home/')
    })

    // Make sure the dates are correct
    it('Ensure dates are correct', () => {
        cy.get('#week').should('contain', 'Week of November 2 - November 8')
    })

    // Make sure when an item is added, it is added in the right place
    it('Items are added under correct date', () => {

    })

    // Navigate between pages
    it('Navigate to other pages (Home, Budget, History, Logout) as authenticated user', () => {
        // cy.get('#home1').click()
        // cy.url().should('eq', 'http://127.0.0.1:8000/home/')

        //cy.get('#budget1').click()
        cy.get('#budget1').click()
        cy.url().should('equal', 'http://127.0.0.1:8000/budget/')

        // cy.get('#history1').click()
        // cy.url().should('eq', 'http://127.0.0.1:8000/history/')

        // cy.get('#logout1').click()
        // cy.url().should('eq', 'http://127.0.0.1:8000/?next=/logout/')
    })

    // Logout user





})