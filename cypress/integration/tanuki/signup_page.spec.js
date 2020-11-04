/// <reference types="cypress" />

Cypress.Cookies.defaults({
    preserve: "csrftoken"
})

// it('', () => {
        
// })

context('Login Page', () => {
    
    it('visit the page', () => {
        cy.visit('http://127.0.0.1:8000/signup')
    })

    // Existing users cannot be signed up for various reasons
    it('Cannot signup because username exists', () => {
        cy.get('#id_first_name').clear()
          .type('test', { delay:100 })
          .should('have.value', 'test')

        cy.get('#id_last_name').clear()
          .type('test', { delay:100 })
          .should('have.value', 'test')

        cy.get('#id_username').clear()
          .type('test', { delay:100 })
          .should('have.value', 'test')

        cy.get('#id_email').clear()
          .type('not_testing@rightnow.com', { delay:100 })
          .should('have.value', 'not_testing@rightnow.com')
        
          cy.get('#id_password1').clear()
          .type('tanuki404', { delay:100 })
          .should('have.value', 'tanuki404')

          cy.get('#id_password2').clear()
          .type('tanuki404', { delay:100 })
          .should('have.value', 'tanuki404')

          cy.get('button').click()

          cy.get('.account').first().contains('A user with this username already exists.')
    })

    it('Cannot signup because email exists', () => {
        cy.get('#id_first_name').clear()
          .type('test', { delay:100 })
          .should('have.value', 'test')

        cy.get('#id_last_name').clear()
          .type('test', { delay:100 })
          .should('have.value', 'test')

        cy.get('#id_username').clear()
          .type('testo', { delay:100 })
          .should('have.value', 'testo')

        cy.get('#id_email').clear()
          .type('test@test.com', { delay:100 })
          .should('have.value', 'test@test.com')
        
          cy.get('#id_password1').clear()
          .type('tanuki404', { delay:100 })
          .should('have.value', 'tanuki404')

          cy.get('#id_password2').clear()          .type('tanuki404', { delay:100 })
          .should('have.value', 'tanuki404')

          cy.get('button').click()

          cy.get('.account').first().contains('A user with this email already exists.')
    })

    it('Cannot signup because passwords do not match', () => {
        cy.get('#id_first_name').clear()
          .type('test', { delay:100 })
          .should('have.value', 'test')

        cy.get('#id_last_name').clear()
          .type('test', { delay:100 })
          .should('have.value', 'test')

        cy.get('#id_username').clear()
          .type('testo', { delay:100 })
          .should('have.value', 'testo')

        cy.get('#id_email').clear()
          .type('testi@test.com', { delay:100 })
          .should('have.value', 'testi@test.com')
        
          cy.get('#id_password1').clear()
          .type('tanuki404', { delay:100 })
          .should('have.value', 'tanuki404')

          cy.get('#id_password2').clear()
          .type('tanuki405', { delay:100 })
          .should('have.value', 'tanuki405')

          cy.get('button').click()

          cy.get('.account').first().contains('The two password fields didn’t match.')
    })

    // User is able to sign up
    it('User is able to sign up', () => {
        var userdate = new Date
        var user = userdate.toString()
        cy.log(user)

        cy.get('#id_first_name').clear()
          .type(user, { delay:100 })
          .should('have.value', user)

        cy.get('#id_last_name').clear()
          .type(user, { delay:100 })
          .should('have.value', user)

        cy.get('#id_username').clear()
          .type(user, { delay:100 })
          .should('have.value', user)

        cy.get('#id_email').clear()
          .type('test@test.com', { delay:100 })
          .should('have.value', 'test@test.com')
        
          cy.get('#id_password1').clear()
          .type('tanuki404', { delay:100 })
          .should('have.value', 'tanuki404')

          cy.get('#id_password2').clear()
          .type('tanuki405', { delay:100 })
          .should('have.value', 'tanuki405')

          cy.get('button').click()

          cy.get('.account').first().contains('The two password fields didn’t match.')
    })
    
    // After signing up, they are directed to the home page
    it('User is able to sign up', () => {
        var user = new Date
        user = user.toString()
        cy.log(user)

        cy.get('#id_first_name').clear()
          .type('test', { delay:100 })
          .should('have.value', 'test')

        cy.get('#id_last_name').clear()
          .type('test', { delay:100 })
          .should('have.value', 'test')

        cy.get('#id_username').clear()
          .type('testo', { delay:100 })
          .should('have.value', 'testo')

        cy.get('#id_email').clear()
          .type('testi@test.com', { delay:100 })
          .should('have.value', 'testi@test.com')
        
          cy.get('#id_password1').clear()
          .type('tanuki404', { delay:100 })
          .should('have.value', 'tanuki404')

          cy.get('#id_password2').clear()
          .type('tanuki405', { delay:100 })
          .should('have.value', 'tanuki405')

          cy.get('button').click()

          cy.get('.account').first().contains('The two password fields didn’t match.')
    })

    // it('', () => {

    // })

    // it('login with test user', () => {
    //     cy.get('#username')
    //       .type('test', { delay:100 })
    //       .should('have.value', 'test')

    //     cy.get('#password')
    //       .type('tanuki404', { delay:100 })
    //       .should('have.value', 'tanuki404')

    //     cy.get('.userinfo')
    //       .find('form').submit()
    // })

    // it('check for correct url', () => {
    //     cy.url().should('eq', 'http://127.0.0.1:8000/home/')
    // })

})