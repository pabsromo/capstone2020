/// <reference types="cypress" />

context('Home Page', () => {
    
    it('visit the page', () => {
        cy.visit('http://127.0.0.1:8000/')
    })
})