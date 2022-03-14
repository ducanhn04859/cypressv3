/// <reference types="cypress" />

import { homePage } from "../../support/pageObjects/HomePage"
import { productPage } from "../../support/pageObjects/ProductPage"

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
    homePage.getNameForm().type(data.name)
    cy.get("select").select(data.gender)
    homePage.getEmailForm().type(data.email)
    homePage.getTwoWayDataBinding().should("have.value", data.name)
    homePage.getNameForm().should("have.attr", "minlength", 2)
    homePage.getNameForm().should("have.attr", "required")
    homePage.getRadioDisableButton().should("be.disabled")
  })
  it("The test case to demo reuse code", () => {
    cy.visit("https://rahulshettyacademy.com/angularpractice/")
    homePage.getShopTag().click()
    data.productsName.forEach((productName) => {
      cy.selectProduct(productName)
    })
    productPage.getCheckoutButton().click()
    cy.contains("Checkout").click()
    cy.get("#country").type("India")
    cy.get(".suggestions > ul > li > a").click()
    cy.get("#checkbox2").check({ force: true })
    cy.get(".ng-untouched > .btn").click()
    // cy.get(".alert").should(
    //   "have.text",
    //   "Success! Thank you! Your order will be delivered in next few weeks :-)."
    // )

    cy.get(".alert").then((element) => {
      const message = element.text()
      expect(message.includes("Success")).to.be.true
    })
  })

  it("The test case to check summary of total", () => {
    cy.visit(Cypress.env("url"))
    homePage.getShopTag().click()
    data.productsName.forEach((productName) => {
      cy.selectProduct(productName)
    })
    productPage.getCheckoutButton().click()
    let sum = 0
    cy.get("tr td:nth-child(4) strong")
      .each(($el, index, $list) => {
        const price = $el.text()
        let actualPrice = price.split(" ")
        actualPrice = actualPrice[1].trim()
        sum += Number(actualPrice)
        cy.log(sum)
      })
      //1
      .then(() => {
        cy.get("h3 > strong").should("contain", sum)
      })

    //2
    cy.get("h3 > strong").then((element) => {
      const total = element.text()
      let actualTotal = total.split(" ")
      let amount = actualTotal[1].trim()
      expect(Number(amount)).to.equal(Number(sum))
    })
  })
  it.only("The test case to use ENV", () => {
    cy.visit(Cypress.env("url"))
    homePage.getNameForm().type(data.name)
    cy.get("select").select(data.gender)
    homePage.getEmailForm().type(data.email)
    homePage.getTwoWayDataBinding().should("have.value", data.name)
    homePage.getNameForm().should("have.attr", "minlength", 2)
    homePage.getNameForm().should("have.attr", "required")
    homePage.getRadioDisableButton().should("be.disabled")
  })
})
