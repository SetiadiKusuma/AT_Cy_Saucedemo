/// <reference types= "cypress" />

const Baseurl = 'https://www.saucedemo.com/';
var key_local_storage = null;
var value_local_storage = null;
var current_username = null;

const Cookie = {
    key: "",
    value: ""
}

function setLocalStorage() {
    window.localStorage.setItem(key_local_storage, value_local_storage);
}

function getLocalStorage(key) {
    key_local_storage = key
    value_local_storage = window.localStorage.getItem(key)
}


before(() => {
        Cookie.key = "session-username";

        cy.visit(Baseurl, { timeout: 10000 })
})

beforeEach(() => {
    cy.setCookie(Cookie.key, Cookie.value);
})

describe('Fitur Checkout', () => {
    it('Berhasil login menggunakan username & password yang benar dan melakukan checkout', () => {
        cy.fixture("saucedemo").then((saucedemo) => {

            cy.get('#user-name').type(saucedemo.username)
            cy.get('#password').type(saucedemo.password)
    
            cy.get('#login-button').click()

            cy.url().should('contain', '/inventory.html')
        })
    });

    it('Menambahkan beberpa produk ke dalam keranjang', () => {
        cy.get('#add-to-cart-sauce-labs-backpack').should('have.text','Add to cart')
        cy.get('#add-to-cart-sauce-labs-backpack').click()
        cy.get('#shopping_cart_container').click()
        cy.url().should('contain', '/cart.html')
    });

    it('Melakukan Checkout', () => {
        cy.get('#checkout').click()
        cy.url().should('include', '/checkout-step-one.html')
    });

    it('Melakukan pengisian informasi data diri', () => {
        cy.fixture("saucedemo").then((saucedemo) => {
            cy.get('#first-name').type(saucedemo.first_name).should('have.value', 'Standard')
            cy.get('#last-name').type(saucedemo.last_name).should('have.value', 'User')
            cy.get('#postal-code').type(saucedemo.zip_code).should('have.value', '16610')

            cy.get('#continue').click()
            cy.url().should('include', '/checkout-step-two.html')

            cy.get('#finish').click()
        })
    });
})