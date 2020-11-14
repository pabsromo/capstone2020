
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

  it('testing datepicker', () => {
    cy.get('#id_itemDate')
      .type('2020-11-05')
  })

  // Users can add and delete items to income
  it('Users can add and delete income items', () => {
    
    // Add new income item
    cy.get('#id_itemDate')
      .type('2020-11-05')
      .should('have.value', '2020-11-05')
      
    cy.get('#id_itemName')
      .type('Piggybank')
      .should('have.value', 'Piggybank')

    cy.get('#id_itemAmount')
      .type('200')
      .should('have.value', '200')

    cy.get('#id_itemAmount')
      .type('{enter}')

    // Check that item was entered correctly
    
    // Delete the item
    cy.get("#deleteincome").click()

    // Check that item was deleted correctly
  })


  // users can add and delete items to fixed expenses
  it('Users can add and delete fixed expenses items', () => {
    
    // Add new fixed expenses item
    cy.get('.fixed-expenses-table-column').get("#id_itemDate")
      .type('2020-11-05')
      .should('have.value', '2020-11-05')

    cy.get('#id_itemName')
      .type('Piggybank')
      .should('have.value', 'Piggybank')

    cy.get('#id_itemAmount')
      .type('200')
      .should('have.value', '200')

    cy.get('#id_itemAmount')
      .type('{enter}')

    // Check that item was entered correctly

    // Delete the item
    cy.get("#deletefixed").click()

    // Check that the item was deleted correctly
  })

    // users can adjust where their additional spending goes

    // users can modify their items in various sections
    // Adjusting additional spending is shown in progress bars in the home page
    
    // Summary is calculated correctly
    it('Available cash is calculated correctly', () => {
        
    })

    // // Navigate between pages
    // it('Navigate to other pages (Home, Budget, History) as authenticated user', () => {
    //   cy.get('#home1').click()
    //   cy.url().should('eq', 'http://127.0.0.1:8000/home/')
      
    //   cy.get('#budget1').click()
    //   cy.url().should('equal', 'http://127.0.0.1:8000/budget/')

    //   cy.get('#home1').click()
    //   cy.url().should('eq', 'http://127.0.0.1:8000/home/')

    //   cy.get('#history1').click()
    //   cy.url().should('eq', 'http://127.0.0.1:8000/history/')

    //   cy.get('#home1').click()
    //   cy.url().should('eq', 'http://127.0.0.1:8000/home/')
    // })

    // // Logout user
    // it('Logout', () => {
    //     cy.visit('http://127.0.0.1:8000/logout/')    
    //     cy.url().should('eq', 'http://127.0.0.1:8000/')
    // })
})
