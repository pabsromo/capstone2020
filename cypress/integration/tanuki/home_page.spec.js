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
    
    
    // Make sure the user can modify already added items
    // Make sure the user only sees their own data
    // Make sure the user can delete items
    // Progress bars are correct
    
    

    // Make sure the dates are correct
    it('Ensure dates are correct', () => {
        cy.get('#week').should('contain', GetWeek())
    })

    // Make sure when an item is added, it is added in the right place
    // it('Items are added under correct date', () => {

    // })

    // Progress bars are correct
    // it ('Totals are calculated correctly', () => {

    // })

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





})