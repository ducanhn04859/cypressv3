/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
//For cucumber
const cucumber = require("cypress-cucumber-preprocessor").default;

//For connect SQL
const mysqlssh = require("mysql-ssh");

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
	// `on` is used to hook into various events Cypress emits
	// `config` is the resolved Cypress config
	on("file:preprocessor", cucumber());
	on("task", {
		executeSql(sql, ...args) {
			return new Promise(async (resolve, reject) => {
				try {
					let connection = await mysqlssh.connect(
						{
							host: "192.168.66.111",
							port: "22",
							user: "sks_du8",
							password: "x@jE8c2%",
						},
						{
							host: "172.28.0.3",
							user: "dhieu",
							password: "",
							database: "opencart",
						}
					);
					let result = await connection.promise().query(sql, args);
					mysqlssh.close();
					resolve(result[0]);
				} catch (err) {
					reject(err);
				}
			});
		},
	});
};
