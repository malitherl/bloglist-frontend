describe('blog app', function() {
    beforeEach( function () {
        cy.visit('http://localhost:3000')
    })
    
    it('front page can be opened', function() {
        cy.contains('Blog')
    })
    it('login form can be opened', function () {
        cy.contains('login').click()
        cy.contains('Login')
    })
})



