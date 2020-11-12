function GetWeek() {
    var date = new Date()
    var start = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    var end = start + 6;

    var monday = new Date(date.setDate(start));
    var sunday = new Date(date.setDate(end));

    var month1 = monday.toLocaleString('default', { month: 'long' })
    var month2 = sunday.toLocaleString('default', { month: 'long' })
    var day1 = monday.toLocaleString('default', { day: 'numeric' })
    var day2 = sunday.toLocaleString('default', { day: 'numeric' })

    var string = "Week of " + month1 + " " + day1 + " - " + month2 + " " + day2
    return string

}


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
    })

    beforeEach(() => {
        // before each test, we can automatically preserve the
        // 'session_id' and 'remember_token' cookies. 
        Cypress.Cookies.preserveOnce('csrftoken', 'sessionid')
    })
    

    // Make sure the dates are correct
    it('Ensure dates are correct', () => {
        cy.get('#week').should('contain', GetWeek())
    })


    // Progress bars are correct
    it ('Totals are calculated correctly', () => {
        cy.get("#essSum").should('contain', "Essential $70.49/200.00")
        cy.get("#leiSum").should('contain', "Leisure $3.50/100.00")
        cy.get("#optSum").should('contain', "Optional $12.95/50.00")
        cy.get("#unxSum").should('contain', "Unexpected $35.46/100.00")
        cy.get("#totalSum").should('contain', 'Totals: $122.40/700.00')

    })


    // Make sure the user can modify already added items
    it ('Item can be added, modified, and deleted', () => {
        cy.get("#essentialadd").click()
        cy.get("#essential-modal-form > input").first().next().type("Jack Boots")
        cy.get("#essential-modal-form > input").first().next().next().type("550.78")
        cy.get("#essential-modal-form > input").first().next().next().next().type("2020-11-11")
        cy.get("#essential-inside-modal > button").first().click()

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
        cy.url().should('eq', 'http://127.0.0.1:8000')
    })





})