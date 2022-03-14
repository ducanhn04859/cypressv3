/** @format */

/// <reference types="cypress" />

describe("Section 9: Understand Fixture and Custom command in Cypress", () => {
  let data
  before("Import data from fixture", () => {
    // run one before all tests in describe
    cy.fixture("data.json").then((dataFix) => {
      data = dataFix
    })
  })
  it("The test case to demo fixture and validate form", () => {
    cy.visit("https://rahulshettyacademy.com/angularpractice/")
    cy.get("form input[name='name']:nth-child(2)").type(data.name)
    cy.get("select").select(data.gender)
    cy.get(":nth-child(4) > .ng-untouched").should("have.value", data.name)
    cy.get("form input[name='name']:nth-child(2)").should(
      "have.attr",
      "minlength",
      2
    )
    cy.get("form input[name='name']:nth-child(2)").should(
      "have.attr",
      "required"
    )
    cy.get("#inlineRadio3").should("be.disabled")
  })
  it.only("The test case to demo reuse code", () => {
    cy.visit("https://rahulshettyacademy.com/angularpractice/")
    // cy.pause()
    cy.get(":nth-child(2) > .nav-link").click().debug()
    //1
    // cy.get("h4.card-title").each(($el, index, $list) => {
    //   if ($el.text().includes("Blackberry")) {
    //     cy.get("button.btn.btn-info").eq(index).click()
    //   }
    // })

    //2 using support
    // cy.selectProduct("Blackberry")
    // cy.selectProduct("Nokia Edge")

    //3 using fixture and array
    data.productsName.forEach((productName) => {
      cy.selectProduct(productName)
    })
  })
})
