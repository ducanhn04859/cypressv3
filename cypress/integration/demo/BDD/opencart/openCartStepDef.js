import { registerPage } from "../../../../support/pageObjects/RegisterPageOpenCart"
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
Given("I open register opencart page", () => {
  cy.visit("http://192.168.66.111:8180/index.php?route=common/home")
  cy.get("[title='My Account']").click()
  cy.get('.dropdown-menu > :nth-child(1) > a').click()
})

When("I fill the form register", function (dataTable) {
  //Data table
  // |First Name  | Last Name | email                | tel        | passwd |
  // | Duc Anh    | Nguyen    | ndanh9@cmcmglobal.vn | 0123456789 | 123456 |
  registerPage.getFirstNameForm().type(dataTable.rawTable[1][0])
  registerPage.getLastNameForm().type(dataTable.rawTable[1][1])
  registerPage.getEmailForm().type(dataTable.rawTable[1][2])
  registerPage.getPhoneForm().type(dataTable.rawTable[1][3])
  registerPage.getPasswordForm().type(dataTable.rawTable[1][4])
  registerPage.getRePasswordForm().type(dataTable.rawTable[1][4])
  registerPage.getCheckPolicyForm().check()
})

Then("select submit and verify", () => {
  registerPage.getSubmitBtnForm().click()
  cy.get('h1').should('have.text',"Your Account Has Been Created!")
})

