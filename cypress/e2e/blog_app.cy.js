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

describe('login', function(){
    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })
    it('succeeds with correct credentials', ()=> {
        cy.contains('login').click()
        cy.get('input:first').type('mich')
        cy.get('input:last').type('right')
        cy.contains('Login').click()
        cy.contains('welcome, mich')
    })
    it('fails with incorrect credentials', () => {
        cy.contains('login').click()
        cy.get('input:first').type('mchi')
        cy.get('input:last').type('right')
        cy.contains('Login').click()
        cy.contains('Error: Wrong credentials')
    })

})

describe('when logged in', function() {
    beforeEach( function () {
        cy.request('POST', 'http://localhost:3000/api/testing/reset')
        const user = {
            name: "Mchi Mich",
            username: "mich",
            password: "right"
        }
        cy.request('POST', 'http://localhost:3000/api/users/', user)
        cy.visit('http://localhost:3000') 
        cy.contains('login').click()
        cy.get('input:first').type('mich')
        cy.get('input:last').type('right')
        cy.contains('Login').click()
    })
    it('create a new blog', function () {
        cy.contains('create new blog?').click()
        cy.get('#title').type('new blog')
        cy.get('#author').type('michi')
        cy.get('#url').type('nowhere')
        cy.get('#save').click()
        cy.visit('http://localhost:3000') 
        cy.contains('new blog by michi')
    })
})




