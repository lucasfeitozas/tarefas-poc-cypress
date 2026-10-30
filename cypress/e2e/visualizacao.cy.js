describe('Visualização de tarefas', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.fixture('tarefas').then((tarefas) => {
      tarefas.forEach((t) => cy.addTask(t.title, t.description));
    });
  });

  it('lista as tarefas da mais recente para a mais antiga', () => {
    cy.getByCy('task-item').should('have.length', 3);
    cy.getByCy('task-title').first().should('have.text', 'Configurar GitHub Actions');
    cy.getByCy('task-title').last().should('have.text', 'Estudar Angular');
  });

  it('marca uma tarefa como concluída e filtra por status', () => {
    cy.contains('[data-cy="task-item"]', 'Estudar Angular').find('[data-cy="task-toggle"]').check();
    cy.getByCy('pending-count').should('contain', '2 pendente');

    cy.getByCy('filter-done').click();
    cy.getByCy('task-item').should('have.length', 1).and('contain', 'Estudar Angular');

    cy.getByCy('filter-pending').click();
    cy.getByCy('task-item').should('have.length', 2).and('not.contain', 'Estudar Angular');

    cy.getByCy('filter-all').click();
    cy.getByCy('task-item').should('have.length', 3);
  });

  it('remove uma tarefa', () => {
    cy.contains('[data-cy="task-item"]', 'Escrever testes Cypress').find('[data-cy="task-remove"]').click();
    cy.getByCy('task-item').should('have.length', 2);
    cy.contains('Escrever testes Cypress').should('not.exist');
  });
});
