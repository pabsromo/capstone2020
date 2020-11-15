/// <reference types="cypress" />
Cypress.Cookies.defaults({
    preserve: "csrftoken"
})

context('Login Page', () => {
    
    it('Visit Login Page', () => {
        cy.visit('http://127.0.0.1:8000/')
    })

    // Test to make sure the user can get to signup and get back to login
    it('Navigate to Signup Page and back to Login Page', () =>{
      cy.get('.signup').click()
      cy.url().should('eq', 'http://127.0.0.1:8000/signup/')

      cy.get('#login').click()
      cy.url().should('eq', 'http://127.0.0.1:8000/')

    })

    // Test to make sure you can't access the webpages without logging in
    it('Navigate to other pages (Home, Budget, History, Logout) as unauthenticated user', () => {
      cy.visit('http://127.0.0.1:8000/home')
      cy.url().should('eq', 'http://127.0.0.1:8000/?next=/home/')

      cy.visit('http://127.0.0.1:8000/budget')
      cy.url().should('eq', 'http://127.0.0.1:8000/?next=/budget/')

      cy.visit('http://127.0.0.1:8000/history')
      cy.url().should('eq', 'http://127.0.0.1:8000/?next=/history/')

      cy.visit('http://127.0.0.1:8000/logout')
      cy.url().should('eq', 'http://127.0.0.1:8000/?next=/logout/')

    })

    // Test invalid username
    it('Login with incorrect username', () => {
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
    it('Login with incorrect password', () => {
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
    it('Login with test user', () => {
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
    it('Check that authenticated user is sent to home page', () => {
        cy.url().should('eq', 'http://127.0.0.1:8000/home/')
    })

})