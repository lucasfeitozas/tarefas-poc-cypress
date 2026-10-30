import './commands';

beforeEach(() => {
  // Cada teste começa com a lista vazia (o app guarda as tarefas no localStorage).
  cy.clearLocalStorage();
});
