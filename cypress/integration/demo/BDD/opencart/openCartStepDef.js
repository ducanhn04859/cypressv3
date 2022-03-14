import { registerPage } from "../../../../support/pageObjects/RegisterPageOpenCart";
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
let email;
var DateFormatter = {
  monthNames: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],
  dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  formatDate: function (date, format) {
    var self = this;
    format = self.getProperDigits(format, /d+/gi, date.getDate());
    format = self.getProperDigits(format, /M+/g, date.getMonth() + 1);
    format = format.replace(/y+/gi, function (y) {
      var len = y.length;
      var year = date.getFullYear();
      if (len == 2)
        return (year + "").slice(-2);
      else if (len == 4)
        return year;
      return y;
    })
    format = self.getProperDigits(format, /H+/g, date.getHours());
    format = self.getProperDigits(format, /h+/g, self.getHours12(date.getHours()));
    format = self.getProperDigits(format, /m+/g, date.getMinutes());
    format = self.getProperDigits(format, /s+/gi, date.getSeconds());
    format = format.replace(/a/ig, function (a) {
      var amPm = self.getAmPm(date.getHours())
      if (a === 'A')
        return amPm.toUpperCase();
      return amPm;
    })
    format = self.getFullOr3Letters(format, /d+/gi, self.dayNames, date.getDay())
    format = self.getFullOr3Letters(format, /M+/g, self.monthNames, date.getMonth())
    return format;
  },
  getProperDigits: function (format, regex, value) {
    return format.replace(regex, function (m) {
      var length = m.length;
      if (length == 1)
        return value;
      else if (length == 2)
        return ('0' + value).slice(-2);
      return m;
    })
  },
  getHours12: function (hours) {
    // https://stackoverflow.com/questions/10556879/changing-the-1-24-hour-to-1-12-hour-for-the-gethours-method
    return (hours + 24) % 12 || 12;
  },
  getAmPm: function (hours) {
    // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
    return hours >= 12 ? 'pm' : 'am';
  },
  getFullOr3Letters: function (format, regex, nameArray, value) {
    return format.replace(regex, function (s) {
      var len = s.length;
      if (len == 3)
        return nameArray[value].substr(0, 3);
      else if (len == 4)
        return nameArray[value];
      return s;
    })
  }
}

Given("I open register opencart page", () => {
	cy.visit(Cypress.env("baseURL"));
	cy.get("[title='My Account']").click();
	cy.get(".dropdown-menu > :nth-child(1) > a").click();
});

When("I fill the form register", function (dataTable) {
	//Data table
	// |First Name  | Last Name | email                | tel        | passwd |
	// | Duc Anh    | Nguyen    | ndanh9@cmcmglobal.vn | 0123456789 | 123456 |
	email = dataTable.rawTable[1][2];
	registerPage.getFirstNameForm().type(dataTable.rawTable[1][0]);
	registerPage.getLastNameForm().type(dataTable.rawTable[1][1]);
	registerPage.getEmailForm().type(dataTable.rawTable[1][2]);
	registerPage.getPhoneForm().type(dataTable.rawTable[1][3]);
	registerPage.getPasswordForm().type(dataTable.rawTable[1][4]);
	registerPage.getRePasswordForm().type(dataTable.rawTable[1][4]);
	registerPage.getCheckPolicyForm().check();
});

Then("select submit and verify", () => {
	registerPage.getSubmitBtnForm().click();
	cy.get("h1").should("have.text", "Your Account Has Been Created!");

	cy.task("executeSql", "SELECT * FROM `oc_customer`").then((data) => {
		data.forEach((element) => {
			if (element.email === email) {
				expect(element.email).to.equal(email);
			}
		});
	});
});

Given("I open login opencart page", () => {
	cy.visit(Cypress.env("baseURL"));
	cy.get("[title='My Account']").click();
	cy.get(".dropdown-menu > :nth-child(2) > a").click();
});

When("I create new account data into DB", () => {
	cy.task(
		"executeSql",
		`INSERT INTO opencart.oc_customer
    (customer_group_id, store_id, language_id, firstname, lastname, email, telephone, fax, password, salt, cart, wishlist, newsletter, address_id, custom_field, ip, status, safe, token, code, date_added)
    VALUES(1, 0, 1, 'Customer1', 'Customer1Last', 'test@cmcmglobal.vn', '0123456789', '', '59ba997a39af8aae43813f08693d341feabe9fd5', 'ZhQDffCN8', NULL, NULL, 0, 0, '', '192.168.86.104', 1, 0, '', '', '`+DateFormatter.formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss')+`');
    `
	).then((result) => {
		expect(result.affectedRows).to.equal(1);
	});
});

And("I login check account", () => {
  cy.get('#input-email').type('test@cmcmglobal.vn')
  cy.get('#input-password').type('123456')
  cy.get('form > .btn').click()
});

Then("Verify login success", () => {
  cy.url().should("include", "http://192.168.66.111:8180/index.php?route=account/account")
  cy.get('#content > :nth-child(1)').should('contain','My Account')
});
