/// <reference types="Cypress" />

describe("My First Test Suite", function () {
  it("My FirstTest case test API  ", function () {
    cy.request("POST", "http://216.10.245.166/Library/Addbook.php", {
      name: "The Design Every Day",
      isbn: "ncjksiwk122",
      aisle: "22as2",
      author: "Don Norman",
    }).then((res) => {
      expect(res.body).to.have.property("Msg", "successfully added")
      expect(res.status).to.equal(200)
    })
  })
})
