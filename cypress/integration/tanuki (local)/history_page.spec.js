/// <reference types="cypress" />

// const { first } = require("cypress/types/lodash");

const col = (arr, n) => arr.map(x => x[n]);

var test_items = [
    [5, 'test', 'apple', '$3.87', 'essential', '09/21/2020'],
    [5, 'test', 'skates', '$150.49', 'essential', '09/23/2020'],
    [5, 'test', 'pizza', '$3.45', 'essential', '09/23/2020'],
    [5, 'test', 'car', '$4.2', 'leisure', '09/23/2020'],
    [5, 'test', 'mouse', '$34.78', 'unexpected', '09/23/2020'],
    [5, 'test', 'coffee', '$5.67', 'essential', '10/06/2020'],
    [5, 'test', 'apples', '$2.34', 'essential', '10/10/2020'],
    [5, 'test', 'Brunch', '$23', 'essential', '10/21/2020'],
    [5, 'test', 'Groceries', '$26.55', 'essential', '11/03/2020'],
    [5, 'test', 'Roller Rink', '$3.5', 'leisure', '11/05/2020'],
    [5, 'test', 'Oil Change', '$50.34', 'unexpected', '11/02/2020'],
    [5, 'test', 'McDonalds', '$4.2', 'optional', '11/04/2020'],
    [5, 'test', 'Piada', '$7.58', 'optional', '11/06/2020'],
    [5, 'test', 'Boba', '$5.76', 'leisure', '11/08/2020'],
    [5, 'test', 'Groceries', '$65.49', 'essential', '11/09/2020'],
    [5, 'test', 'Roller Rink', '$3.5', 'leisure', '11/10/2020'],
    [5, 'test', 'Toe Stops', '$35.46', 'unexpected', '11/13/2020'],
    [5, 'test', 'Cinema', '$7.5', 'optional', '11/14/2020'],
    [5, 'test', 'Starbucks', '$5.45', 'optional', '11/12/2020'],
    [5, 'test', 'Laundry', '$5', 'essential', '11/11/2020'],
    [5, 'test', 'switch', '$399', 'optional', '09/23/2020'],
    [5, 'test', 'textbook', '$150', 'optional', '09/23/2020'],
    [5, 'test', 'Apple', '$3', 'essential', '10/15/2020'],
]

// 1d arrays of the test_items
var test_items_1d = col(test_items,2).concat(col(test_items,3).concat(col(test_items,4).concat(col(test_items,5))));
var first_ten = col(test_items,2).slice(0,10).concat(col(test_items,3).slice(0,10).concat(col(test_items,4).slice(0,10).concat(col(test_items,5).slice(0,10))));
var second_ten = col(test_items,2).slice(10,20).concat(col(test_items,3).slice(10,20).concat(col(test_items,4).slice(10,20).concat(col(test_items,5).slice(10,20))));
var third_ten = col(test_items,2).slice(20).concat(col(test_items,3).slice(20).concat(col(test_items,4).slice(20).concat(col(test_items,5).slice(20))));

Cypress.Cookies.defaults({
    preserve: "csrftoken"
})

context('History Page Tests', () => {
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

    // Data for only the current user is displayed
    it('Data for only the current user is displayed', () => {
        cy.log(test_items_1d)
        // Go through first column
        cy.get('.table-data > .main-table-column')
          .children()
          .each((el, index) => {
              cy.log(el.text() == test_items_1d[index])
              cy.log(el.text())
              expect(el.text() == test_items_1d[index]).to.be.true
        })
    })

    // Pagination shows correct information
    it('Pagination shows correct initial information', () => {
        cy.get('#results').should('contain', '23')

        // Starting length
        cy.get('.pages').children().should('have.length', 1)
    })

    // Pagination flips through pages correctly
    it('Pagination flips through pages correctly', () => {
        // Show 10 results per page
        cy.get('.show-dropdown-content').then($el => {
            $el.css('display', 'flex')
            cy.wrap($el.children()[0]).click()
        })

        // Check results for first page
        cy.get('.table-data > .main-table-column')
          .children()
          .each((el, index) => {
              expect(el.text() == first_ten[index]).to.be.true
          })

        // Change to second page
        cy.get('.pages').children().first().next().click()

        // Check results for second page
        cy.get('.table-data > .main-table-column')
          .children()
          .each((el, index) => {
              expect(el.text() == second_ten[index]).to.be.true
          })

        // Change to third page
        cy.get('.pages').children().first().next().next().click()

        // Check results for third page
        cy.get('.table-data > .main-table-column')
          .children()
          .each((el, index) => {
              expect(el.text() == third_ten[index]).to.be.true
          })
    })

    // Pagination Yields correct number of pages given a certain amount of data to display on one page
    it('Pagination changes amt of pages correctly given size of page', () => {
        // Show 10 results per page
        cy.get('.show-dropdown-content').then($el => {
            $el.css('display', 'flex')
            cy.wrap($el.children()[0]).click()
        })
        cy.get('.show-dropbtn').should('contain', 10)
        cy.get('.pages').children().should('have.length', 3)

        // Show 15 results per page
        cy.get('.show-dropdown-content').then($el => {
            cy.wrap($el.children()[1]).click()
        })
        cy.get('.show-dropbtn').should('contain', 15)
        cy.get('.pages').children().should('have.length', 2)

        // Show 20 results per page
        cy.get('.show-dropdown-content').then($el => {
            cy.wrap($el.children()[2]).click()
        })
        cy.get('.show-dropbtn').should('contain', 20)
        cy.get('.pages').children().should('have.length', 2)

        // Show 25 results per page
        cy.get('.show-dropdown-content').then($el => {
            cy.wrap($el.children()[3]).click()
        })
        cy.get('.show-dropbtn').should('contain', 25)
        cy.get('.pages').children().should('have.length', 1)

        // Show 30 results per page
        cy.get('.show-dropdown-content').then($el => {
            cy.wrap($el.children()[4]).click()
        })
        cy.get('.show-dropbtn').should('contain', 30)
        cy.get('.pages').children().should('have.length', 1)

        // Show 35 results per page
        cy.get('.show-dropdown-content').then($el => {
            cy.wrap($el.children()[5]).click()
        })
        cy.get('.show-dropbtn').should('contain', 35)
        cy.get('.pages').children().should('have.length', 1)

        // Show 40 results per page
        cy.get('.show-dropdown-content').then($el => {
            cy.wrap($el.children()[6]).click()
        })
        cy.get('.show-dropbtn').should('contain', 40)
        cy.get('.pages').children().should('have.length', 1)

        // Show 45 results per page
        cy.get('.show-dropdown-content').then($el => {
            cy.wrap($el.children()[7]).click()
        })
        cy.get('.show-dropbtn').should('contain', 45)
        cy.get('.pages').children().should('have.length', 1)

        // Show 50 results per page
        cy.get('.show-dropdown-content').then($el => {
            cy.wrap($el.children()[8]).click()
        })
        cy.get('.show-dropbtn').should('contain', 50)
        cy.get('.pages').children().should('have.length', 1)
    })

    // Navigate between pages
    it('Navigate to other pages (Home, Budget, History) as authenticated user', () => {
        cy.get('#home1').click()
        cy.url().should('eq', 'http://127.0.0.1:8000/home/')
        
        cy.get('#budget1').click()
        cy.url().should('equal', 'http://127.0.0.1:8000/budget/')

        cy.get('#home1').click()
        cy.url().should('eq', 'http://127.0.0.1:8000/home/')

        cy.get('#history1').click()
        cy.url().should('eq', 'http://127.0.0.1:8000/history/')

        cy.get('#home1').click()
        cy.url().should('eq', 'http://127.0.0.1:8000/home/')
    })

    // Logout user
    it('Logout', () => {
        cy.visit('http://127.0.0.1:8000/logout/')    
        cy.url().should('eq', 'http://127.0.0.1:8000/')
    })
})