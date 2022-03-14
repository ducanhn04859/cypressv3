/** @format */

/// <reference types="cypress" />
describe("The first test suit", () => {
  it("The first test case", () => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
    cy.get('input[type="search"]').type("ca")
    cy.wait(2000)
    //some products are not invisible
    cy.get(".product").should("have.length", 5)
    //filter products are invisible
    cy.get(".product:visible").should("have.length", 4)
    //parent child chaining
    cy.get(".products").find(".product").should("have.length", 4)
    //add product at index 2 to cart
    cy.get(".products").find(".product").eq(1).contains("ADD TO CART").click()

    //add product with name: "" to cart
    cy.get(".products")
      .find(".product")
      .each(($el, index, $list) => {
        const findCap = $el.find("h4.product-name").text()
        if (findCap.includes("Capsicum")) {
          cy.wrap($el).find("button").click()
        }
      })
    cy.get(".brand").then((logoElement) => {
      cy.log(logoElement.text())
    })
  })
  it.only("The second test case", () => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
    cy.get('input[type="search"]').type("ca")
    cy.wait(2000)
    //create variable for cypress
    cy.get(".products").as("productsVariable")
    // cy.get(".products").find(".product").eq(1).contains("ADD TO CART").click()
    cy.get("@productsVariable")
      .find(".product")
      .eq(1)
      .contains("ADD TO CART")
      .click()

    //assert if logo text is correctly displayed
    cy.get(".brand").should("have.text", "GREENKART")
  })
})
