/// <reference types="cypress" />
Cypress.Cookies.defaults({
    preserve: "csrftoken"
})

context('Login Page', () => {
    
    it('visit the page', () => {
        cy.visit('http://127.0.0.1:8000/')
    })

    // Test to make sure the user can get to signup and get back to login
    it('Navigate to Signup Page and back to Login Page', () =>{
      cy.get('.signup').click()
      cy.url().should('eq', 'http://127.0.0.1:8000/signup/')

    })

    // Test to make sure you can't access the webpages without logging in

    // Test invalid username
    it('login with incorrect username', () => {
      cy.get('#username')
        .type('abcde', { delay: 100 })
        .should('have.value', 'abcde')

      cy.get('#password')
        .type('tanuki404', { delay: 100 })
        .should('have.value', 'tanuki404')

      cy.get('.userinfo')
        .find('form').submit()

      cy.get('#errormessage')
        .should('contain', 'Invalid credentials, please try again.' )
    })

    // Test invalid password
    it('login with incorrect password', () => {
      cy.get('#username')
        .type('test', { delay: 100 })
        .should('have.value', 'test')

      cy.get('#password')
        .type('tanuki404*', { delay: 100 })
        .should('have.value', 'tanuki404*')

      cy.get('.userinfo')
        .find('form').submit()

      cy.get('.account')
        .should('contain', 'Invalid credentials, please try again.')
    })

    // Able to login the user
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

    // Logged in user is sent to homepage
    it('check for correct url', () => {
        cy.url().should('eq', 'http://127.0.0.1:8000/home/')
    })

})