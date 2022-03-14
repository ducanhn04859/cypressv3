/// <reference types="Cypress" />
describe("OpenCart", async function () {
  it("visit page", function () {
    cy.visit("http://192.168.66.111:8180/index.php?route=common/home")
    cy.get("[title='My Account']").click()
    cy.get('.dropdown-menu > :nth-child(1) > a').click()
  })
})