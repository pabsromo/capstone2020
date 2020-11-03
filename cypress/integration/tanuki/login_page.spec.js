/// <reference types="cypress" />
Cypress.Cookies.defaults({
    preserve: "csrftoken"
})

context('Login Page', () => {
    
    it('visit the page', () => {
        cy.visit('http://127.0.0.1:8000/')
    })

    // Test CRSF token form security maybe

    it('login with test user', () => {
        cy.get('#username')
          .type('test', { delay:100 })
          .should('have.value', 'test')

        cy.get('#password')
          .type('tanuki404', { delay:100 })
          .should('have.value', 'tanuki404')

        cy.get('.userinfo')
          .find('form').submit()
    })

    it('check for correct url', () => {
        cy.url().should('eq', 'http://127.0.0.1:8000/home/')
    })

})