/** @format */

/// <reference types="cypress" />
/// <reference types="cypress-iframe" />
import "cypress-iframe"

describe("Section 8: Understand How to Automate Frames & Child windows in Cypress", () => {
  it("The test case to check child window", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    cy.get("#opentab").then((el) => {
      const url = el.prop("href")
      cy.visit(url)
    })
  })

  it.only("The test case to check iframe", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    cy.frameLoaded("#courses-iframe")
    cy.iframe().find("a[href*='mentorship']").eq(0).click()
    cy.iframe().find("h1[class*='pricing-title']").should("have.length", 2)
  })
})
