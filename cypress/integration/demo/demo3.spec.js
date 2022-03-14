/** @format */

/// <reference types="cypress" />
describe("The first test suit", () => {
  it("The test case to check checkbox", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    cy.get("#checkBoxOption1")
      .check()
      .should("be.checked")
      .and("have.value", "option1")

    cy.get("#checkBoxOption1").uncheck().should("not.be.checked")
    //select multi checkbox
    cy.get('input[type="checkbox"]').check(["option2", "option3"])
  })

  it("The test case to check dropdown static", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    //1
    // cy.get("#dropdown-class-example").select("option2")
    // cy.get("#dropdown-class-example").should("have.value", "option2")
    //2
    cy.get("#dropdown-class-example")
      .select("option2")
      .should("have.value", "option2")
  })
  it("The test case to check dropdown dynamic", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    cy.get("#autocomplete").type("can")
    cy.get(".ui-menu-item div").each(($el, index, $list) => {
      if ($el.text() === "Canada") {
        $el.click()
      }
    })
    cy.get("#autocomplete").should("have.value", "Canada")
  })
  it("The test case to check element displayed or not", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    cy.get("#displayed-text").should("be.visible")
    cy.get("#hide-textbox").click()
    cy.get("#displayed-text").should("not.be.visible")
    cy.get("#show-textbox").click()
    cy.get("#displayed-text").should("be.visible")
  })
  it("The test case to check radio button", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    //1
    //cy.get('input[value="radio2"]').check()
    // cy.get('input[value="radio2"]').should("be.checked")
    //2
    cy.get('input[value="radio2"]').check().should("be.checked")
  })
  it("The test case to check pop-up", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    cy.get('input[id="name"]').type("Bob")
    cy.get("#alertbtn").click()
    cy.get("#confirmbtn").click()

    //window:alert
    cy.on("window:alert", (str) => {
      //depend on Mocha
      expect(str).to.equal(
        "Hello Bob, share this practice page and share your knowledge"
      )
    })

    //confirm popup
    cy.on("window:confirm ", (str) => {
      //depend on Mocha
      expect(str).to.equal("Hello , Are you sure you want to confirm?")
    })
  })

  it("The test case to check open new tab", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    //remove attribute of tag
    cy.get("#opentab").invoke("removeAttr", "target").click()
    cy.url().should("include", "www.rahulshettyacademy")
  })

  it("The test case to check navigate window", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    //remove attribute of tag
    cy.get("#opentab").invoke("removeAttr", "target").click()
    cy.go("back")
  })
  it.only("The test case to check table", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    //remove attribute of tag
    cy.get("#opentab").invoke("removeAttr", "target").click()
    cy.go("back")
  })
  it("The test case to check table", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    //get all rows of the second column
    cy.get("tr td:nth-child(2)").each(($el, index, $list) => {
      const name = $el.text()
      if (name.includes("Python")) {
        cy.get("tr td:nth-child(2)")
          .eq(index)
          .next()
          .then((price) => {
            const priceText = price.text()
            expect(priceText).to.equal("25")
          })
      }
    })
  })

  it.only("The test case to check mouseover", () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/")

    //1
    // cy.get("div.mouse-hover-content").invoke("show")
    // cy.contains("Top").click()
    // cy.url().should("include", "top")
    //2
    cy.contains("Top").click({ force: true })
    cy.url().should("include", "top")
  })
})
