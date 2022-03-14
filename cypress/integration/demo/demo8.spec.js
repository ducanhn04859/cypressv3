/// <reference types="Cypress" />

describe("My First Test Suite", function () {
  it("My FirstTest case test API  ", function () {
    cy.visit("https://rahulshettyacademy.com/angularAppdemo/")

    cy.intercept(
      {
        method: "GET",
        url: "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty",
      },
      (req) => {
        //modify the request of API
        req.url =
          "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"
        req.continue((res) => {
          //  expect(res.statusCode).to.equal(403)
        })
      }
    ).as("bookretrievals")
    cy.get("button[class='btn btn-primary']").click()
    cy.wait("@bookretrievals")
  })
})
