/// <reference types="cypress" />

Cypress.Cookies.defaults({
    preserve: "csrftoken"
})

context('Login Page', () => {
    
    it('visit the page', () => {
        cy.visit('http://127.0.0.1:8000/signup')
    })

    // Existing users cannot be signed up for various reasons
    it('Cannot signup because username exists', () => {
        cy.get('#id_first_name').clear()
          .type('test', { delay:50 })
          .should('have.value', 'test')

        cy.get('#id_last_name').clear()
          .type('test', { delay:50 })
          .should('have.value', 'test')

        cy.get('#id_username').clear()
          .type('test', { delay:50 })
          .should('have.value', 'test')

        cy.get('#id_email').clear()
          .type('not_testing@rightnow.com', { delay:50 })
          .should('have.value', 'not_testing@rightnow.com')
        
        cy.get('#id_password1').clear()
          .type('tanuki404', { delay:50 })
          .should('have.value', 'tanuki404')

        cy.get('#id_password2').clear()
          .type('tanuki404', { delay:50 })
          .should('have.value', 'tanuki404')

        cy.get('button').click()

        cy.get('.account').first().contains('A user with this username already exists.')
    })

    it('Cannot signup because email exists', () => {
        cy.get('#id_first_name').clear()
          .type('test', { delay:50 })
          .should('have.value', 'test')

        cy.get('#id_last_name').clear()
          .type('test', { delay:50 })
          .should('have.value', 'test')

        cy.get('#id_username').clear()
          .type('testo', { delay:50 })
          .should('have.value', 'testo')

        cy.get('#id_email').clear()
          .type('test@test.com', { delay:50 })
          .should('have.value', 'test@test.com')
        
        cy.get('#id_password1').clear()
          .type('tanuki404', { delay:50 })
          .should('have.value', 'tanuki404')

        cy.get('#id_password2').clear()          
          .type('tanuki404', { delay:50 })
          .should('have.value', 'tanuki404')

        cy.get('button').click()

        cy.get('.account').first().contains('A user with this email already exists.')
    })

    it('Cannot signup because passwords do not match', () => {
        cy.get('#id_first_name').clear()
          .type('test', { delay:50 })
          .should('have.value', 'test')

        cy.get('#id_last_name').clear()
          .type('test', { delay:50 })
          .should('have.value', 'test')

        cy.get('#id_username').clear()
          .type('testo', { delay:50 })
          .should('have.value', 'testo')

        cy.get('#id_email').clear()
          .type('testo@test.com', { delay:50 })
          .should('have.value', 'testo@test.com')
        
          cy.get('#id_password1').clear()
          .type('tanuki404', { delay:50 })
          .should('have.value', 'tanuki404')

          cy.get('#id_password2').clear()
          .type('tanuki405', { delay:50 })
          .should('have.value', 'tanuki405')

          cy.get('button').click()

          cy.get('.account').first().contains('The two password fields didn’t match.')
    })

    it('Cannot signup because of invalid username', () => {
        var userdate = new Date
        var user = userdate.toString()

        cy.get('#id_first_name').clear()
          .type('test', { delay:50 })
          .should('have.value', 'test')

        cy.get('#id_last_name').clear()
          .type('test', { delay:50 })
          .should('have.value', 'test')

        cy.get('#id_username').clear()
          .type(user, { delay:50 })
          .should('have.value', user)

        cy.get('#id_email').clear()
          .type('testo@test.com', { delay:50 })
          .should('have.value', 'testo@test.com')
        
          cy.get('#id_password1').clear()
          .type('tanuki404', { delay:50 })
          .should('have.value', 'tanuki404')

          cy.get('#id_password2').clear()
          .type('tanuki404', { delay:50 })
          .should('have.value', 'tanuki404')

          cy.get('button').click()

          cy.get('.account').first().contains('Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.')
    })

    // User is able to sign up and login
    it('User is able to sign up', () => {
        var userdate = new Date
        var user = userdate.toString()
        cy.log(user)

        cy.get('#id_first_name').clear()
          .type(userdate.getTime(), { delay:10 })
          .should('have.value', userdate.getTime())

        cy.get('#id_last_name').clear()
          .type(userdate.getTime(), { delay:10 })
          .should('have.value', userdate.getTime())

        cy.get('#id_username').clear()
          .type(userdate.getTime(), { delay:10 })
          .should('have.value', userdate.getTime())

        cy.get('#id_email').clear()
          .type(userdate.getTime() + '@test.com', { delay:10 })
          .should('have.value', userdate.getTime() + '@test.com')
        
        cy.get('#id_password1').clear()
          .type('tanuki404', { delay:50 })
          .should('have.value', 'tanuki404')

        cy.get('#id_password2').clear()
          .type('tanuki404', { delay:50 })
          .should('have.value', 'tanuki404')

        cy.get('button').click()

    })

    // User is logged in and sent to home page
    it('User is sent to home page', () => {
        cy.url().should('eq', 'http://127.0.0.1:8000/home/')
    })

})