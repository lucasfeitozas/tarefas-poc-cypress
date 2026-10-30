Cypress.Commands.add('getByCy', (name, ...args) => cy.get(`[data-cy="${name}"]`, ...args));

Cypress.Commands.add('addTask', (title, description) => {
  cy.getByCy('task-title-input').clear().type(title);
  if (description) {
    cy.getByCy('task-description-input').clear().type(description);
  }
  cy.getByCy('task-submit').click();
});
