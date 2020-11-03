/// <reference types="cypress" />

context('Login Page', () => {
    
    it('visit the page', () => {
        cy.visit('http://127.0.0.1:8000/')
    })

    it('login with test user', () => {
        cy.get('#username')
          .type('test username')
    })

})