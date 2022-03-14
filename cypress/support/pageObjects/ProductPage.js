export class ProductPage {
  getCheckoutButton() {
    return cy.get("#navbarResponsive > .navbar-nav > .nav-item > .nav-link")
  }
}

export const productPage = new ProductPage()
