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

var new_item_id = 0;


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
    // Item can be added, modified, and deleted
    it('Manipulating items in Essential', () => {
        
        // Add new essential item
        cy.get("#essentialadd").click()
        cy.get("#essential-modal-form > input").first().next().type("Jack Boots")
        cy.get("#essential-modal-form > input").first().next().next().type("550.78")
        cy.get("#essential-modal-form > input").first().next().next().next().type("2020-11-14")
        cy.get("#essential-modal-buttons > button:last").click()

        // Checking for the new item
        cy.get('.essential').children()
          .first().next().next().children()
          .first().next().next().next().next().next().children()
          .should('have.length', 1)
        cy.get('.essential').children()
          .first().next().next().children()
          .first().next().next().next().next().next().children()
          .first().children()
          .first().children().then($el => {
              expect($el[0].textContent == 'Jack Boots').to.be.true
              expect($el[1].textContent == '$550.78').to.be.true
          })

        // Editing and deleting
        cy.get('.essential').children()
          .first().next().next().children()
          .first().next().next().next().next().next().children()
          .first().children()
          .first().then($el => {
            // Get id of newly added item
            cy.log($el.attr('id').split('-')[0])
            var new_item_id = $el.attr('id').split('-')[0]

            // Edit the item
            cy.get('#' + new_item_id + '-btn').click()
            cy.get('#' + new_item_id + '-form').children()
            .first().next().type('Yogurt')
            cy.get('#' + new_item_id + '-form').children()
            .first().next().next().type('70')
            cy.get('#' + new_item_id + '-form').children()
            .first().next().next().next().type('2020-11-14')
            cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
            .should('be.visible')
            cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})

            var new_items = ['Yogurt', '$70.00'];

            // Check that edit worked
            cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
                expect($el2.text() == new_items[index]).to.be.true
            })

            // Delete item
            cy.get('#' + new_item_id + '-btn').click()
            cy.get("#" + new_item_id + '-editable-form > button:first')
            .click()
            
            // Check that item is deleted
            cy.get('.essential').children()
              .first().next().next().children()
              .first().next().next().next().next().next().children()
              .should('have.length', 0)
          })
    })

    // Make sure the user can modify already added items
    // Item can be added, modified, and deleted
    it('Manipulating items in Leisure', () => {
        
        // Add new essential item
        cy.get("#leisureadd").click()
        cy.get("#leisure-modal-form > input").first().next().type("Jack Boots")
        cy.get("#leisure-modal-form > input").first().next().next().type("550.78")
        cy.get("#leisure-modal-form > input").first().next().next().next().type("2020-11-14")
        cy.get("#leisure-modal-buttons > button:last").click()

        // Checking for the new item
        cy.get('.leisure').children()
          .first().next().next().children()
          .first().next().next().next().next().next().children()
          .should('have.length', 1)
        cy.get('.leisure').children()
          .first().next().next().children()
          .first().next().next().next().next().next().children()
          .first().children()
          .first().children().then($el => {
              expect($el[0].textContent == 'Jack Boots').to.be.true
              expect($el[1].textContent == '$550.78').to.be.true
          })

        // Editing and deleting
        cy.get('.leisure').children()
          .first().next().next().children()
          .first().next().next().next().next().next().children()
          .first().children()
          .first().then($el => {
            // Get id of newly added item
            cy.log($el.attr('id').split('-')[0])
            var new_item_id = $el.attr('id').split('-')[0]

            // Edit the item
            cy.get('#' + new_item_id + '-btn').click()
            cy.get('#' + new_item_id + '-form').children()
            .first().next().type('Yogurt')
            cy.get('#' + new_item_id + '-form').children()
            .first().next().next().type('70')
            cy.get('#' + new_item_id + '-form').children()
            .first().next().next().next().type('2020-11-14')
            cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
            .should('be.visible')
            cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})

            var new_items = ['Yogurt', '$70.00'];

            // Check that edit worked
            cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
                expect($el2.text() == new_items[index]).to.be.true
            })

            // Delete item
            cy.get('#' + new_item_id + '-btn').click()
            cy.get("#" + new_item_id + '-editable-form > button:first')
            .click()
            
            // Check that item is deleted
            cy.get('.leisure').children()
              .first().next().next().children()
              .first().next().next().next().next().next().children()
              .should('have.length', 0)
          })
    })

    // Make sure the user can modify already added items
    // Item can be added, modified, and deleted
    it('Manipulating items in Optional', () => {
        
        // Add new optional item
        cy.get("#optionaladd").click()
        cy.get("#optional-modal-form > input").first().next().type("Jack Boots")
        cy.get("#optional-modal-form > input").first().next().next().type("550.78")
        cy.get("#optional-modal-form > input").first().next().next().next().type("2020-11-14")
        cy.get("#optional-modal-buttons > button:last").click()

        // Checking for the new item
        cy.get('.optional').children()
          .first().next().next().children()
          .first().next().next().next().next().next().children()
          .should('have.length', 2)
        cy.get('.optional').children()
          .first().next().next().children()
          .first().next().next().next().next().next().children()
          .first().children()
          .first().children().then($el => {
              expect($el[0].textContent == 'Jack Boots').to.be.true
              expect($el[1].textContent == '$550.78').to.be.true
          })

        // Editing and deleting
        cy.get('.optional').children()
          .first().next().next().children()
          .first().next().next().next().next().next().children()
          .first().children()
          .first().then($el => {
            // Get id of newly added item
            cy.log($el.attr('id').split('-')[0])
            var new_item_id = $el.attr('id').split('-')[0]

            // Edit the item
            cy.get('#' + new_item_id + '-btn').click()
            cy.get('#' + new_item_id + '-form').children()
            .first().next().type('Yogurt')
            cy.get('#' + new_item_id + '-form').children()
            .first().next().next().type('70')
            cy.get('#' + new_item_id + '-form').children()
            .first().next().next().next().type('2020-11-14')
            cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
            .should('be.visible')
            cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})

            var new_items = ['Yogurt', '$70.00'];

            // Check that edit worked
            cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
                expect($el2.text() == new_items[index]).to.be.true
            })

            // Delete item
            cy.get('#' + new_item_id + '-btn').click()
            cy.get("#" + new_item_id + '-editable-form > button:first')
            .click()
            
            // Check that item is deleted
            cy.get('.optional').children()
              .first().next().next().children()
              .first().next().next().next().next().next().children()
              .should('have.length', 1)
          })
    })

    // Make sure the user can modify already added items
    // Item can be added, modified, and deleted
    it('Manipulating items in Unexpected', () => {
        
        // Add new unexpected item
        cy.get("#unexpectedadd").click()
        cy.get("#unexpected-modal-form > input").first().next().type("Jack Boots")
        cy.get("#unexpected-modal-form > input").first().next().next().type("550.78")
        cy.get("#unexpected-modal-form > input").first().next().next().next().type("2020-11-14")
        cy.get("#unexpected-modal-buttons > button:last").click()

        // Checking for the new item
        cy.get('.unexpected').children()
          .first().next().next().children()
          .first().next().next().next().next().next().children()
          .should('have.length', 1)
        cy.get('.unexpected').children()
          .first().next().next().children()
          .first().next().next().next().next().next().children()
          .first().children()
          .first().children().then($el => {
              expect($el[0].textContent == 'Jack Boots').to.be.true
              expect($el[1].textContent == '$550.78').to.be.true
          })

        // Editing and deleting
        cy.get('.unexpected').children()
          .first().next().next().children()
          .first().next().next().next().next().next().children()
          .first().children()
          .first().then($el => {
            // Get id of newly added item
            cy.log($el.attr('id').split('-')[0])
            var new_item_id = $el.attr('id').split('-')[0]

            // Edit the item
            cy.get('#' + new_item_id + '-btn').click()
            cy.get('#' + new_item_id + '-form').children()
            .first().next().type('Yogurt')
            cy.get('#' + new_item_id + '-form').children()
            .first().next().next().type('70')
            cy.get('#' + new_item_id + '-form').children()
            .first().next().next().next().type('2020-11-14')
            cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
            .should('be.visible')
            cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})

            var new_items = ['Yogurt', '$70.00'];

            // Check that edit worked
            cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
                expect($el2.text() == new_items[index]).to.be.true
            })

            // Delete item
            cy.get('#' + new_item_id + '-btn').click()
            cy.get("#" + new_item_id + '-editable-form > button:first')
            .click()
            
            // Check that item is deleted
            cy.get('.unexpected').children()
              .first().next().next().children()
              .first().next().next().next().next().next().children()
              .should('have.length', 0)
          })
    })

    // // Make sure the dates are correct
    // it('Ensure dates are correct', () => {
    //     cy.get('#week').should('contain', GetWeek())
    // })


    // // Progress bars are correct
    // it ('Totals are calculated correctly', () => {
    //     cy.get("#essSum").should('contain', "Essential $70.49/200.00")
    //     cy.get("#leiSum").should('contain', "Leisure $3.50/100.00")
    //     cy.get("#optSum").should('contain', "Optional $12.95/50.00")
    //     cy.get("#unxSum").should('contain', "Unexpected $35.46/100.00")
    //     cy.get("#totalSum").should('contain', 'Totals: $122.40/640.00')
    // })

    // // Navigate between pages
    // it('Navigate to other pages (Home, Budget, History) as authenticated user', () => {
    //     cy.get('#home1').click()
    //     cy.url().should('eq', 'http://127.0.0.1:8000/home/')
        
    //     cy.get('#budget1').click()
    //     cy.url().should('equal', 'http://127.0.0.1:8000/budget/')

    //     cy.get('#home1').click()
    //     cy.url().should('eq', 'http://127.0.0.1:8000/home/')

    //     cy.get('#history1').click()
    //     cy.url().should('eq', 'http://127.0.0.1:8000/history/')

    //     cy.get('#home1').click()
    //     cy.url().should('eq', 'http://127.0.0.1:8000/home/')
    // })

    // // Logout user
    // it('Logout', () => {
    //     cy.visit('http://127.0.0.1:8000/logout/')    
    //     cy.url().should('eq', 'http://127.0.0.1:8000/')
    // })

})