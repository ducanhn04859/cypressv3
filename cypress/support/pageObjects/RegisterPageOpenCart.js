export class RegisterPageOpenCart {
	getFirstNameForm() {
		return cy.get("#input-firstname");
	}

	getLastNameForm() {
		return cy.get("#input-lastname");
	}

	getEmailForm() {
		return cy.get("#input-email");
	}

	getPhoneForm() {
		return cy.get("#input-telephone");
	}

	getPasswordForm() {
		return cy.get("#input-password");
	}

	getRePasswordForm() {
		return cy.get("#input-confirm");
	}

	getCheckPolicyForm() {
		return cy.get('[type="checkbox"]')
	}

	getSubmitBtnForm(){
		return cy.get('.pull-right > .btn')
	}
}

export const registerPage = new RegisterPageOpenCart();
