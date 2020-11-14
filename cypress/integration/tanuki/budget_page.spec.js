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
    cy.get('#budget1').click()
    cy.url().should('eq', 'http://127.0.0.1:8000/budget/')
  })

  beforeEach(() => {
    // before each test, we can automatically preserve the
    // 'session_id' and 'remember_token' cookies. 
    Cypress.Cookies.preserveOnce('csrftoken', 'sessionid')
  })

  // Users can add and delete items to income
  it('Users can add and delete income items', () => {
    
    // Add new income item
    cy.get('#id_itemDate')
      .type('2020-11-15')
      .should('have.value', '2020-11-15')
      
    cy.get('#id_itemName')
      .type('Job')
      .should('have.value', 'Job')

    cy.get('#id_itemAmount')
      .type('400')
      .should('have.value', '400')

    cy.get('#id_itemAmount')
      .type('{enter}')
    
    cy.get(".inside-cash-category").last().should('contain', "$1040.00")
    cy.get(".inside-cash-category").first().next().should('contain', "$1100.00")
    
    // Delete the item
    cy.get(".income-table-column .elem #deleteincome").last().click()

    // Check that item was deleted correctly
    cy.get(".inside-cash-category").last().should('contain', "$640.00")
  })


  // users can add and delete items to fixed expenses
  it('Users can add and delete fixed expenses items', () => {
    
    // Add new fixed expenses item
    cy.get(".new-fixed-expenses .flex-outer > li").first()
      .type('2020-11-11')
      //.should('contain', '11-Nov-2020')

    cy.get(".new-fixed-expenses .flex-outer > li").first().next()
      .type('Spotify')
      //.should('contain', 'Spotify')

    cy.get(".new-fixed-expenses .flex-outer > li").first().next().next()
      .type('5.99')
      //.should('have.value', '5.99')
      .type('{enter}')
    
    cy.get(".inside-cash-category").last().should('contain', "$634.01")
    cy.get(".inside-cash-category").next().should('contain', "$5.99")

    // Delete the item
    cy.get(".fixed-expenses-table-column .elem #deletefixed").last().click()

    // Check that the item was deleted correctly
    cy.get(".inside-cash-category").last().should('contain', "$640.00")
  })

  //users can add and delete items to investing
  it('Users can add and delete investing items', () => {

    cy.get(".new-investing .flex-outer > li").first()
      .type('Retirement')
    //.should('have.value', 'Retirement')

    cy.get(".new-investing .flex-outer > li").first().next()
      .type('500')
      //.should('have.value', '500')
      .type('{enter}')

    cy.get(".inside-cash-category").last().should('contain', "$140.00")
    cy.get(".inside-cash-category").next().should('contain', "$500.00")

    // Delete the item
    cy.get(".investing-table-column .elem #deleteinvest").last().click()

    // Check that the item was deleted correctly
    cy.get(".inside-cash-category").last().should('contain', "$640.00")
  })

    // users can adjust where their additional spending goes
    it('Modify savings and spending', () => {
      cy.get('#id_monthlySavings').clear().type('80').should('have.value', '80').type('{enter}')
      cy.get(".inside-cash-category").last().should('contain', "$620.00")
      cy.get('#id_essential').clear().type('100').should('have.value', '100')
      cy.get('#id_leisure').clear().type('20').should('have.value', '20')
      cy.get('#id_optional').clear().type('35').should('have.value', '35')
      cy.get('#id_unexpected').clear().type('250').should('have.value', '250').type('{enter}')
      cy.get('#home1').click()
      cy.url().should('eq', 'http://127.0.0.1:8000/home/')
      cy.get("#essSum").should('contain', "Essential $70.49/100.00")
      cy.get("#leiSum").should('contain', "Leisure $3.50/20.00")
      cy.get("#optSum").should('contain', "Optional $12.95/35.00")
      cy.get("#unxSum").should('contain', "Unexpected $35.46/250.00")
      cy.get("#totalSum").should('contain', 'Totals: $122.40/620.00')
      cy.get('#budget1').click()
      cy.url().should('equal', 'http://127.0.0.1:8000/budget/')

      //reset so other values dont get messed up ;)
      cy.get('#id_monthlySavings').clear().type('60').should('have.value', '60').type('{enter}')
      cy.get(".inside-cash-category").last().should('contain', "$640.00")
      cy.get('#id_essential').clear().type('200').should('have.value', '200')
      cy.get('#id_leisure').clear().type('100').should('have.value', '100')
      cy.get('#id_optional').clear().type('50').should('have.value', '50')
      cy.get('#id_unexpected').clear().type('100').should('have.value', '100').type('{enter}')

    })
    
    // Summary is calculated correctly
    it('Available cash is calculated correctly', () => {
      cy.get(".inside-cash-category").last().should('contain', "$640.00")
    })

    // Navigate between pages
    it('Navigate to other pages (Home, Budget, History) as authenticated user', () => {
      cy.get('#budget1').click()
      cy.url().should('equal', 'http://127.0.0.1:8000/budget/')

      cy.get('#home1').click()
      cy.url().should('eq', 'http://127.0.0.1:8000/home/')
      
      cy.get('#budget1').click()
      cy.url().should('equal', 'http://127.0.0.1:8000/budget/')

      cy.get('#history1').click()
      cy.url().should('eq', 'http://127.0.0.1:8000/history/')

      cy.get('#budget1').click()
      cy.url().should('equal', 'http://127.0.0.1:8000/budget/')
    })

    // Logout user
    it('Logout', () => {
        cy.visit('http://127.0.0.1:8000/logout/')    
        cy.url().should('eq', 'http://127.0.0.1:8000/')
    })
})
