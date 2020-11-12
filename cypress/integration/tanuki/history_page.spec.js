/// <reference types="cypress" />

Cypress.Cookies.defaults({
    preserve: "csrftoken"
})

context('Home Page', () => {
    before('Login', () => {
        // log in only once before any of the tests run.
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
        cy.get('#history1').click()
        cy.url().should('eq', 'http://127.0.0.1:8000/history/')
    })

    beforeEach(() => {
        // before each test, we can automatically preserve the
        // 'session_id' and 'remember_token' cookies. 
        Cypress.Cookies.preserveOnce('csrftoken', 'sessionid')
    })

    it('test', () => {
        
    })


})

// Data for logged in user is only displayed
// Data can be sorted
// maybe later let them edit the items

// users should be able to navigate to other pages and logout