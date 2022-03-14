beforeEach("Import data from fixture", () => {
  // run one before all tests in describe
  cy.fixture("data.json").then((data) => {
    globalThis.data = data
  })
})
