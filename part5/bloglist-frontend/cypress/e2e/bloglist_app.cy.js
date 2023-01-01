
describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/testing/reset")

        const user = {
            name: "Kamil Starmach",
            username: "starmil",
            password: "test123"
        }

        cy.request("POST", "http://localhost:3003/api/users/", user)

        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", function () {
        cy.contains("username")
        cy.contains("password")
    })

    describe("Login", () => {
        it("correct credentials", function() {
            cy.get("#username").type("starmil")
            cy.get("#password").type("test123")
            cy.get("#login-button").click()

            cy.contains("successfully log-in")
        })

        it("wrong credentials", function() {
            cy.get("#username").type("wrongname")
            cy.get("#password").type("wrongpassword")
            cy.get("#login-button").click()

            cy.get('.error').should('contain', 'invalid username or password')

            //            cy.contains("invalid username or password")
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            // log in user here
            cy.get("#username").type("starmil")
            cy.get("#password").type("test123")
            cy.get("#login-button").click()
        })

        it('A blog can be created', function() {
            // ...
            cy.contains('create new blog').click()

            cy.get('#title').type('new title for test')
            cy.get('#author').type('new author for test')
            cy.get('#url').type('new url for test')
            cy.get('#create_new_blog').click()

            cy.get('.success')
                .should('contain', 'a new blog new title for test by new author for test added')
                .should('have.css', 'border-style', 'solid')
                .should('have.css', 'color', 'rgb(0, 128, 0)')
            cy.contains('new title for test')
        })

        describe('When blog already exist', function()  {
            beforeEach(function(){
                cy.contains('create new blog').click()

                cy.get('#title').type('TestTitle')
                cy.get('#author').type('testAuthor')
                cy.get('#url').type('testUrl')
                cy.get('#create_new_blog').click()
            })

            it('A blog can be liked', function(){
                cy.contains('show').click()
                cy.contains('0')
                cy.contains('like').click()
                cy.contains('like').click()
                cy.contains('2')
            })

            it('user who created a blog can delete it', function(){
                cy.contains('show').click()
                cy.contains('remove').click()
                cy.on('window:confirm',() => true)

                cy.contains('blog successfully removed')
                cy.get('.blogs').should('not.contain', 'TestTitle')
            })
        })
    })

    describe('When many blogs', function() {
        beforeEach(function(){
            cy.login({ username:'starmil', password:'test123' })
            cy.addBlog({ title:'title1', author:'author1', url:'url1', likes:13 })
            cy.addBlog({ title:'title2', author:'author2', url:'url2', likes:99 })
            cy.addBlog({ title:'title3', author:'author3', url:'url3', likes:15 })
        })

        it('blogs are ordered according to likes', function(){
            cy.get('ul>li').eq(0).should('contain', 'title2')
            cy.get('ul>li').eq(1).should('contain', 'title3')
            cy.get('ul>li').eq(2).should('contain', 'title1')
        })
    })
})