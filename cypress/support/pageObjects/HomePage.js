export class HomePage {
  getNameForm() {
    return cy.get("form input[name='name']:nth-child(2)")
  }

  getEmailForm() {
    return cy.get(":nth-child(2) > .form-control")
  }

  getRadioDisableButton() {
    return cy.get("#inlineRadio3")
  }

  getTwoWayDataBinding() {
    return cy.get(":nth-child(4) > .ng-untouched")
  }

  getShopTag() {
    return cy.get(":nth-child(2) > .nav-link")
  }
}

export const homePage = new HomePage()
