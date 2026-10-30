# tarefas-poc-cypress

Testes E2E (Cypress) do [tarefas-poc-front](https://github.com/lucasfeitozas/tarefas-poc-front).

## Rodando localmente

```bash
npm ci
# com o front rodando em http://localhost:4200 (npm start no tarefas-poc-front)
npm test
# ou contra outra URL
CYPRESS_BASE_URL=https://lucasfeitozas.github.io/tarefas-poc-front/ npm test
```

`npm run cy:open` abre o modo interativo.

## Testes

- `cypress/e2e/cadastro.cy.js`: estado vazio, cadastro, validação de título obrigatório e persistência após reload.
- `cypress/e2e/visualizacao.cy.js`: ordenação, conclusão, filtros por status e remoção.

Os seletores usam atributos `data-cy` do front. O comando `cy.getByCy('nome')` está em `cypress/support/commands.js`.

## Pipeline

`.github/workflows/e2e.yml` é um workflow reutilizável. A pipeline do front chama:

```yaml
e2e:
  needs: build
  uses: lucasfeitozas/tarefas-poc-cypress/.github/workflows/e2e.yml@main
  with:
    app-artifact: tarefas-front-dist
```

O workflow baixa o build do front, serve em `http://127.0.0.1:8080` e roda o Cypress. Se algum teste falhar, o job falha e a pipeline do front para antes do deploy.

Outras formas de execução:
- **Manual** (Actions > E2E > Run workflow): informe a URL publicada.
- **Push/PR neste repo**: faz o build do `main` do front e roda os testes contra ele.
