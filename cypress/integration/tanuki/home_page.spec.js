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

  var string = "Week of " + month1 + " 0" + day1 + " - " + month2 + " " + day2
  return string

}

context('Home Page', () => {

  before('Login', () => {
    // log in only once before any of the tests run.
    cy.visit('https://tanuki-58.uc.r.appspot.com/')

    cy.get('#username')
      .type('test', { delay: 100 })
      .should('have.value', 'test')

    cy.get('#password')
      .type('tanuki404', { delay: 100 })
      .should('have.value', 'tanuki404')

    cy.get('.userinfo')
      .find('form').submit()

    cy.url().should('eq', 'https://tanuki-58.uc.r.appspot.com/home/')
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
        .first().next().next().type('7')
        cy.get('#' + new_item_id + '-form').children()
        .first().next().next().next().type('2020-11-14')
        cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
        .should('be.visible')
        cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})

        var new_items = ['Yogurt', '$7.00'];

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

  it('Moving an item around in Essential', () => {
    
    // Add new essential item
    cy.get("#essentialadd").click()
    cy.get("#essential-modal-form > input").first().next().type("Notebooks")
    cy.get("#essential-modal-form > input").first().next().next().type("3")
    cy.get("#essential-modal-form > input").first().next().next().next().type("2020-11-09")
    cy.get("#essential-modal-buttons > button:last").click()

    // Check for new item on Monday
    cy.get('.essential').children()
      .first().next().next().children()
      .first().children()
    .should('have.length', 2)
    cy.get('.essential').children()
      .first().next().next().children()
      .first().children()
      .first().children()
      .first().children().then($el => {
          expect($el[0].textContent == 'Notebooks').to.be.true
          expect($el[1].textContent == '$3.00').to.be.true
      })

      // Move item to Tuesday
      cy.get('.essential').children()        // essential category
        .first().next().next().children()    // table-data
        .first().children()                  // Monday
        .first().children()                  // get Monday elems
        .first().then($el => {
          // Get id of newly added item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          // Move to Tuesday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Book')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('8')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-10')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})

        })

      // Movie item to Wednesday and check Tuesday Moved Correctly
      cy.get('.essential').children()        // essential category
        .first().next().next().children()    // table-data
        .first().next().children()           // Tuesday
        .first().children()                  // get Tuesday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Book', '$8.00'];

          // Check move to Tuesday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Wednesday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Pencils')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('2')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-11')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Move item to Thursday and check Wednesday Moved Correctly
      cy.get('.essential').children()        // essential category
        .first().next().next().children()    // table-data
        .first().next().next().children()    // Wednesay
        .first().children()                  // get Wednesday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Pencils', '$2.00'];

          // Check move to Wednesday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Thursday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Water')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('1.5')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-12')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Movie item to Friday and check Thursday Moved Correctly
      cy.get('.essential').children()                      // essential category
        .first().next().next().children()                  // table-data
        .first().next().next().next().children()           // Thursday
        .first().children()                                // get Thursday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Water', '$1.50'];

          // Check move to Thursday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Friday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Socks')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('5')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-13')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Movie item to Saturday and check Friday Moved Correctly
      cy.get('.essential').children()                             // essential category
        .first().next().next().children()                         // table-data
        .first().next().next().next().next().children()           // Friday
        .first().children()                                       // get Friday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Socks', '$5.00'];

          // Check move to Friday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Saturday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Haircut')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('14')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-14')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Movie item to Sunday and check Saturday Moved Correctly
      cy.get('.essential').children()                                    // essential category
        .first().next().next().children()                                // table-data
        .first().next().next().next().next().next().children()           // Saturday
        .first().children()                                              // get Saturday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Haircut', '$14.00'];

          // Check move to Saturday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Sunday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Charger')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('20')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-15')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Check Sunday Moved Correctly
      cy.get('.essential').children()                                           // essential category
        .first().next().next().children()                                       // table-data
        .first().next().next().next().next().next().next().children()           // Sunday
        .first().children()                                                     // get Sunday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Charger', '$20.00'];

          // Check move to Sunday worked
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
            .first().next().next().next().next().next().next().children()
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

  it('Moving an item around in Leisure', () => {
    
    // Add new leisure item
    cy.get("#leisureadd").click()
    cy.get("#leisure-modal-form > input").first().next().type("Tea")
    cy.get("#leisure-modal-form > input").first().next().next().type("3")
    cy.get("#leisure-modal-form > input").first().next().next().next().type("2020-11-09")
    cy.get("#leisure-modal-buttons > button:last").click()

    // Check for new item on Monday
    cy.get('.leisure').children()
      .first().next().next().children()
      .first().children()
    .should('have.length', 1)
    cy.get('.leisure').children()
      .first().next().next().children()
      .first().children()
      .first().children()
      .first().children().then($el => {
          expect($el[0].textContent == 'Tea').to.be.true
          expect($el[1].textContent == '$3.00').to.be.true
      })

      // Move item to Tuesday
      cy.get('.leisure').children()          // leisure category
        .first().next().next().children()    // table-data
        .first().children()                  // Monday
        .first().children()                  // get Monday elems
        .first().then($el => {
          // Get id of newly added item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          // Move to Tuesday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Books')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('8')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-10')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})

        })

      // Movie item to Wednesday and check Tuesday Moved Correctly
      cy.get('.leisure').children()          // leisure category
        .first().next().next().children()    // table-data
        .first().next().children()           // Tuesday
        .first().children()                  // get Tuesday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Books', '$8.00'];

          // Check move to Tuesday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Wednesday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Video Game')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('50')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-11')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Move item to Thursday and check Wednesday Moved Correctly
      cy.get('.leisure').children()          // leisure category
        .first().next().next().children()    // table-data
        .first().next().next().children()    // Wednesay
        .first().children()                  // get Wednesday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Video Game', '$50.00'];

          // Check move to Wednesday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Thursday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Six Flags')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('25')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-12')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Movie item to Friday and check Thursday Moved Correctly
      cy.get('.leisure').children()                        // leisure category
        .first().next().next().children()                  // table-data
        .first().next().next().next().children()           // Thursday
        .first().children()                                // get Thursday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Six Flags', '$25.00'];

          // Check move to Thursday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Friday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Date')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('12')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-13')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Movie item to Saturday and check Friday Moved Correctly
      cy.get('.leisure').children()                               // leisure category
        .first().next().next().children()                         // table-data
        .first().next().next().next().next().children()           // Friday
        .first().children()                                       // get Friday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Date', '$12.00'];

          // Check move to Friday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Saturday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Mini Golf')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('10')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-14')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Movie item to Sunday and check Saturday Moved Correctly
      cy.get('.leisure').children()                                      // leisure category
        .first().next().next().children()                                // table-data
        .first().next().next().next().next().next().children()           // Saturday
        .first().children()                                              // get Saturday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Mini Golf', '$10.00'];

          // Check move to Saturday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Sunday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Movie')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('10')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-15')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Check Sunday Moved Correctly
      cy.get('.leisure').children()                                             // leisure category
        .first().next().next().children()                                       // table-data
        .first().next().next().next().next().next().next().children()           // Sunday
        .first().children()                                                     // get Sunday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Movie', '$10.00'];

          // Check move to Sunday worked
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
            .first().next().next().next().next().next().next().children()
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

  it('Moving an item around in Optional', () => {
    
    // Add new essential item
    cy.get("#optionaladd").click()
    cy.get("#optional-modal-form > input").first().next().type("Coffee")
    cy.get("#optional-modal-form > input").first().next().next().type("9")
    cy.get("#optional-modal-form > input").first().next().next().next().type("2020-11-09")
    cy.get("#optional-modal-buttons > button:last").click()

    // Check for new item on Monday
    cy.get('.optional').children()
      .first().next().next().children()
      .first().children()
    .should('have.length', 1)
    cy.get('.optional').children()
      .first().next().next().children()
      .first().children()
      .first().children()
      .first().children().then($el => {
          expect($el[0].textContent == 'Coffee').to.be.true
          expect($el[1].textContent == '$9.00').to.be.true
      })

      // Move item to Tuesday
      cy.get('.optional').children()        // essential category
        .first().next().next().children()    // table-data
        .first().children()                  // Monday
        .first().children()                  // get Monday elems
        .first().then($el => {
          // Get id of newly added item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          // Move to Tuesday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Shoes')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('70')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-10')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})

        })

      // Movie item to Wednesday and check Tuesday Moved Correctly
      cy.get('.optional').children()        // essential category
        .first().next().next().children()    // table-data
        .first().next().children()           // Tuesday
        .first().children()                  // get Tuesday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Shoes', '$70.00'];

          // Check move to Tuesday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Wednesday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Phone')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('350')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-11')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Move item to Thursday and check Wednesday Moved Correctly
      cy.get('.optional').children()        // essential category
        .first().next().next().children()    // table-data
        .first().next().next().children()    // Wednesay
        .first().children()                  // get Wednesday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Phone', '$350.00'];

          // Check move to Wednesday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Thursday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('New Toaster')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('15')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-12')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Movie item to Friday and check Thursday Moved Correctly
      cy.get('.optional').children()                      // essential category
        .first().next().next().children()                  // table-data
        .first().next().next().next().children()           // Thursday
        .first().children()                                // get Thursday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['New Toaster', '$15.00'];

          // Check move to Thursday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Friday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Jeans')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('35')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-13')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Movie item to Saturday and check Friday Moved Correctly
      cy.get('.optional').children()                             // essential category
        .first().next().next().children()                         // table-data
        .first().next().next().next().next().children()           // Friday
        .first().children()                                       // get Friday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Jeans', '$35.00'];

          // Check move to Friday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Saturday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Camera')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('120')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-14')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Movie item to Sunday and check Saturday Moved Correctly
      cy.get('.optional').children()                                    // essential category
        .first().next().next().children()                                // table-data
        .first().next().next().next().next().next().children()           // Saturday
        .first().children()                                              // get Saturday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Camera', '$120.00'];

          // Check move to Saturday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Sunday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Develop Film')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('20')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-15')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Check Sunday Moved Correctly
      cy.get('.optional').children()                                           // essential category
        .first().next().next().children()                                       // table-data
        .first().next().next().next().next().next().next().children()           // Sunday
        .first().children()                                                     // get Sunday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Develop Film', '$20.00'];

          // Check move to Sunday worked
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
            .first().next().next().next().next().next().next().children()
            .should('have.length', 0)
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

  it('Moving an item around in Unexpected', () => {
    
    // Add new essential item
    cy.get("#unexpectedadd").click()
    cy.get("#unexpected-modal-form > input").first().next().type("Baby")
    cy.get("#unexpected-modal-form > input").first().next().next().type("30000")
    cy.get("#unexpected-modal-form > input").first().next().next().next().type("2020-11-09")
    cy.get("#unexpected-modal-buttons > button:last").click()

    // Check for new item on Monday
    cy.get('.unexpected').children()
      .first().next().next().children()
      .first().children()
    .should('have.length', 1)
    cy.get('.unexpected').children()
      .first().next().next().children()
      .first().children()
      .first().children()
      .first().children().then($el => {
          expect($el[0].textContent == 'Baby').to.be.true
          expect($el[1].textContent == '$30000.00').to.be.true
      })

      // Move item to Tuesday
      cy.get('.unexpected').children()        // essential category
        .first().next().next().children()    // table-data
        .first().children()                  // Monday
        .first().children()                  // get Monday elems
        .first().then($el => {
          // Get id of newly added item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          // Move to Tuesday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('New Car')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('15000')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-10')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})

        })

      // Movie item to Wednesday and check Tuesday Moved Correctly
      cy.get('.unexpected').children()        // essential category
        .first().next().next().children()    // table-data
        .first().next().children()           // Tuesday
        .first().children()                  // get Tuesday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['New Car', '$15000.00'];

          // Check move to Tuesday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Wednesday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Root Canal')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('1500')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-11')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Move item to Thursday and check Wednesday Moved Correctly
      cy.get('.unexpected').children()        // essential category
        .first().next().next().children()    // table-data
        .first().next().next().children()    // Wednesay
        .first().children()                  // get Wednesday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Root Canal', '$1500.00'];

          // Check move to Wednesday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Thursday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Water')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('1.5')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-12')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Movie item to Friday and check Thursday Moved Correctly
      cy.get('.unexpected').children()                      // essential category
        .first().next().next().children()                  // table-data
        .first().next().next().next().children()           // Thursday
        .first().children()                                // get Thursday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Water', '$1.50'];

          // Check move to Thursday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Friday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Bike Tube')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('10')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-13')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Movie item to Saturday and check Friday Moved Correctly
      cy.get('.unexpected').children()                             // essential category
        .first().next().next().children()                         // table-data
        .first().next().next().next().next().children()           // Friday
        .first().children()                                       // get Friday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Bike Tube', '$10.00'];

          // Check move to Friday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Saturday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Cat')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('14')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-14')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Movie item to Sunday and check Saturday Moved Correctly
      cy.get('.unexpected').children()                                    // essential category
        .first().next().next().children()                                // table-data
        .first().next().next().next().next().next().children()           // Saturday
        .first().children()                                              // get Saturday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Cat', '$14.00'];

          // Check move to Saturday worked
          cy.get('#' + new_item_id + '-p > p').each(($el2,index) => {
            expect($el2.text() == new_items[index]).to.be.true
          })

          // Move to Sunday
          cy.get('#' + new_item_id + '-btn').click()
          cy.get('#' + new_item_id + '-form').children()
          .first().next().type('Casino')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().type('20')
          cy.get('#' + new_item_id + '-form').children()
          .first().next().next().next().type('2020-11-15')
          cy.get('#' + new_item_id + '-editable-form > button:last').scrollIntoView()
          .should('be.visible')
          cy.get('#' + new_item_id + '-editable-form > button:last').click({force: true})
      })

      // Check Sunday Moved Correctly
      cy.get('.unexpected').children()                                           // essential category
        .first().next().next().children()                                       // table-data
        .first().next().next().next().next().next().next().children()           // Sunday
        .first().children()                                                     // get Sunday elems
        .first().then($el => {
          // Get id of first item
          cy.log($el.attr('id').split('-')[0])
          var new_item_id = $el.attr('id').split('-')[0]

          var new_items = ['Casino', '$20.00'];

          // Check move to Sunday worked
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
            .first().next().next().next().next().next().next().children()
            .should('have.length', 0)
      })
  })

  // Make sure the dates are correct
  it('Ensure dates are correct', () => {
      cy.get('.week > .section-title > h1').should('contain', GetWeek())
  })


  // Progress bars are correct
  it ('Totals are calculated correctly', () => {
      cy.get("#essSum").should('contain', "Essential $70.49/200.00")
      cy.get("#leiSum").should('contain', "Leisure $3.50/100.00")
      cy.get("#optSum").should('contain', "Optional $12.95/50.00")
      cy.get("#unxSum").should('contain', "Unexpected $35.46/100.00")
      cy.get("#totalSum").should('contain', 'Totals: $122.40/640.00')
  })

  // Navigate between pages
  it('Navigate to other pages (Home, Budget, History) as authenticated user', () => {
    cy.get('#home1').click()
    cy.url().should('eq', 'https://tanuki-58.uc.r.appspot.com/home/')

    cy.get('#budget1').click()
    cy.url().should('equal', 'https://tanuki-58.uc.r.appspot.com/budget/')

    cy.get('#home1').click()
    cy.url().should('eq', 'https://tanuki-58.uc.r.appspot.com/home/')

    cy.get('#history1').click()
    cy.url().should('eq', 'https://tanuki-58.uc.r.appspot.com/history/')

    cy.get('#home1').click()
    cy.url().should('eq', 'https://tanuki-58.uc.r.appspot.com/home/')
  })

  // Logout user
  it('Logout', () => {
    cy.visit('https://tanuki-58.uc.r.appspot.com/logout/')
    cy.url().should('eq', 'https://tanuki-58.uc.r.appspot.com/')
  })

})