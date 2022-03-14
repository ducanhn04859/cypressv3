/** @format */

/// <reference types="cypress" />
describe("The first test suit", () => {
  it.only("The first test case", () => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
    cy.get('input[type="search"]').type("ca")
    cy.wait(2000)
    //create variable for cypress
    cy.get(".products").as("productsVariable")

    cy.get("@productsVariable")
      .find(".product")
      .each(($el, index, $list) => {
        const findCap = $el.find("h4.product-name").text()
        if (findCap.includes("Capsicum")) {
          cy.wrap($el).find("button").click()
        }
      })

    cy.get(".cart-icon").click()
    cy.get(".cart-items")
      .find(".cart-item")
      .each(($el, index, $list) => {
        const findCap = $el.find("p.product-name").text()
        expect(findCap).to.contain("Capsicum1")
      })
    cy.contains("PROCEED TO CHECKOUT").click()
    cy.contains("Place Order").click()
  })
})
