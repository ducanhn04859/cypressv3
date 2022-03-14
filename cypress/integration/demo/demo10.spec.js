/// <reference types="Cypress" />
const nestCSV = require("neat-csv")
describe("JWT Session", async function () {
  it("is logging in through local storage", function () {
    cy.loginAPI().then(() => {
      cy.visit("https://rahulshettyacademy.com/client/", {
        onBeforeLoad: (window) => {
          window.localStorage.setItem("token", Cypress.env("token"))
        },
      })
    })

    cy.get(".card-body button:last-of-type").eq(1).click()
    cy.get("[routerlink*='cart']").click()
    cy.contains("Checkout").click()
    cy.get("[placeholder*='Country']").type("ind")

    cy.get(".ta-results button").each(($e1, index, $list) => {
      if ($e1.text() === " India") {
        cy.wrap($e1).click()
      }
    })

    cy.get(".action__submit").click()

    cy.wait(2000)

    cy.get(".order-summary button").click()

    cy.readFile(
      Cypress.config("fileServerFolder") +
        "/cypress/downloads/order-invoice_rahul.csv"
    ).then(async (text) => {
      const csv = await neatCSV(text)

      console.log(csv)

      const actualProductCSV = csv[0]["Product Name"]

      expect(productName).to.equal(actualProductCSV)
    })
  })
})
