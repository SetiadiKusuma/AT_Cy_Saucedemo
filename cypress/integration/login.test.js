/// <reference types= "cypress" />

const Baseurl = 'https://www.saucedemo.com/';

describe('Fitur Login', () => {
    it('should load saucedemo.com website', () => {
        cy.visit(Baseurl, { timeout: 10000 })
    });

    it('Login menggunakan username yang kosong', () => {
        cy.fixture('saucedemo').then((saucedemo) => {
            cy.visit(Baseurl, { timeout: 10000 })

            cy.get('#user-name').type(saucedemo.username).clear()
            cy.get('#password').type(saucedemo.password)

            cy.get('#login-button').click()

            cy.get('h3').should('have.text', 'Epic sadface: Username is required')

            cy.get('.error-button').should('have.class', 'error-button')
        })
    });

    it('Login menggunakan password yang kosong', () => {
        cy.fixture("saucedemo").then((saucedemo) => {
            cy.visit(Baseurl, { timeout: 10000 })

            cy.get('#user-name').type(saucedemo.username)
            cy.get('#password').type(saucedemo.password).clear()

            cy.get('#login-button').click()

            cy.get('h3').should('have.text', 'Epic sadface: Password is required')

            cy.get('.error-button').should('have.class', 'error-button')
        })
    });

    it('Login menggunakan username & password yang kosong', () => {
        cy.fixture('saucedemo').then((saucedemo) => {
            cy.visit(Baseurl, { timeout: 10000 })

            cy.get('#user-name').type(saucedemo.username).clear()
            cy.get('#password').type(saucedemo.password).clear()

            cy.get('#login-button').click()

            cy.get('h3').should('have.text', 'Epic sadface: Username is required')

            cy.get('.error-button').should('have.class', 'error-button')
        })
    });

    it('Login menggunakan username & password yang salah', () => {
            cy.visit(Baseurl, { timeout: 10000 })

            cy.get('#user-name').type('wrongusername')
            cy.get('#password').type('wrongpassword')

            cy.get('#login-button').click()

            cy.get('h3').should('have.text', 'Epic sadface: Username and password do not match any user in this service')

            cy.get('.error-button').should('have.class', 'error-button')
    });

    it('Login menggunakan username yang salah', () => {
            cy.visit(Baseurl, { timeout: 10000 })

            cy.get('#user-name').type('wrongusername')
            cy.get('#password').type('secret_sauce')

            cy.get('#login-button').click()

            cy.get('h3').should('have.text', 'Epic sadface: Username and password do not match any user in this service')

            cy.get('.error-button').should('have.class', 'error-button')
    });

    it('Login menggunakan password yang salah', () => {
            cy.visit(Baseurl, { timeout: 10000 })

            cy.get('#user-name').type('standard_user')
            cy.get('#password').type('wrongpassword')

            cy.get('#login-button').click()

            cy.get('h3').should('have.text', 'Epic sadface: Username and password do not match any user in this service')

            cy.get('.error-button').should('have.class', 'error-button')
    });

    it('Berhasil login menggunakan username & password yang benar', () => {
        cy.fixture("saucedemo").then((saucedemo) => {
            cy.clearCookies()    
            cy.visit(Baseurl, { timeout: 4000 })

                cy.get('#user-name').type(saucedemo.username)
                cy.get('#password').type(saucedemo.password)
    
                cy.get('#login-button').click()

                cy.url().should('contain', 'inventory.html')
        })
    });
})