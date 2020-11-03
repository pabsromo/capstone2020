describe('My First Test', function () {
    it('Visits the kitchen sink', function () {
        // Arrange - setup initial app state
        
        // - visit a web page
        cy.visit('https://example.cypress.io')
        //cy.pause()
        
        // - query for an element
        cy.contains('type').click()

        // Act - take an action
        cy.url()
            .should('include', '/commands/actions')

        // - interact with that element
        cy.get('.action-email')
            .type('fake@email.com')
            .should('have.value', 'fake@email.com')

        // Assert - make an assertion
        // - make an assertion about page content
    })
})