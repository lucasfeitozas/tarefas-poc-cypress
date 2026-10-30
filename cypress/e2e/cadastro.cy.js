describe('Cadastro de tarefas', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('exibe o estado vazio quando não há tarefas', () => {
    cy.getByCy('page-title').should('contain', 'Minhas tarefas');
    cy.getByCy('empty-state').should('be.visible');
    cy.getByCy('pending-count').should('contain', '0 pendente');
  });

  it('cadastra uma tarefa com título e descrição', () => {
    cy.addTask('Estudar Cypress', 'Comandos customizados');

    cy.getByCy('task-item').should('have.length', 1);
    cy.getByCy('task-title').should('have.text', 'Estudar Cypress');
    cy.getByCy('task-description').should('have.text', 'Comandos customizados');
    cy.getByCy('pending-count').should('contain', '1 pendente');
    cy.getByCy('task-title-input').should('have.value', '');
  });

  it('não cadastra tarefa sem título', () => {
    cy.getByCy('task-submit').click();
    cy.getByCy('title-error').should('be.visible');
    cy.getByCy('task-item').should('not.exist');

    cy.addTask('   ');
    cy.getByCy('title-error').should('be.visible');
    cy.getByCy('task-item').should('not.exist');
  });

  it('mantém as tarefas após recarregar a página', () => {
    cy.addTask('Tarefa persistente');
    cy.reload();
    cy.getByCy('task-title').should('have.text', 'Tarefa persistente');
  });
});
