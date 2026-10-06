# Desenvolvimento e operação

## Git e revisão

O repositório é local nesta etapa. O destino deve ser um repositório **privado**
no GitHub. Estabelecer `main` como branch padrão e proteger antes de habilitar deploy
de produção. Desenvolver em branches e integrar por Pull Request.

Na configuração remota, exigir PR, revisão e o check `Quality`; bloquear force push
e exclusão de `main`. Restringir bypass das regras. O bootstrap da primeira branch
remota depende da conta/repositório escolhidos e deve acontecer antes de produção.

`pnpm-lock.yaml` deve entrar em todo commit que altere dependências. Não editar o
lockfile manualmente. `pnpm install --frozen-lockfile` é usado no CI.

## CI

`.github/workflows/ci.yml` executa em PRs para `main`, pushes para `main` e execução
manual. O job `Quality` roda instalação, formatação, lint, typecheck, build e smoke.
O build antecede o teste porque o smoke valida a aplicação em modo produção.
Não precisa de segredos. O workflow só será executado remotamente após conectar o
GitHub; execução local bem-sucedida não equivale a uma execução no GitHub Actions.

Dependabot prepara PRs semanais para dependências e Actions, sem merge automático;
upgrades de major ficam bloqueados para revisão explícita da stack. Avisos críticos
de segurança devem ser tratados imediatamente, sem esperar o ciclo semanal.

## Netlify (etapa futura)

1. Conectar o GitHub privado à conta Netlify e selecionar o plano Pro.
2. Definir `main` como produção e habilitar Deploy Previews em Pull Requests.
3. Usar `pnpm build`, publicação `.next`, Node 24 e pnpm fixado no projeto.
4. Manter o adaptador oficial Next.js gerenciado pela Netlify.
5. Configurar variáveis por contexto; previews não devem usar dados de produção.
6. Validar o primeiro Deploy Preview antes de liberar o deploy automático de produção.

`netlify.toml` prepara somente configurações; não cria conta, plano, site ou deploy.
Antes do lançamento público, remover o `noindex` temporário e definir metadados,
URLs canônicas, robots/sitemap e política de indexação das páginas reais.

## Integrações e segredos

`.env.example` contém apenas nomes comentados de variáveis futuras. Nenhuma chave
é necessária para build ou desenvolvimento atual. Não criar recursos externos
antes da etapa correspondente. Prisma 7/Neon, R2 e Better Auth terão configuração
própria quando houver modelagem e requisitos aprovados.

## Inicialização e validação desta fundação

O scaffold foi criado diretamente, sem template visual do `create-next-app`.
Comandos de preparação: consultas `pnpm view`/registro npm, `pnpm install`,
`git init --initial-branch=main`, `git switch -c chore/technical-foundation`
e `git add .`.
Verificações: `pnpm format`, `pnpm check` e `pnpm install --frozen-lockfile`.
Em 26/09/2026, formatação, lint sem warnings, typecheck, build estático e quatro
testes HTTP passaram localmente. Não há deploy nesta etapa.

Os arquivos, incluindo o lockfile, foram adicionados ao índice do Git. Não foi
criado commit: o ambiente inicial não tinha `user.name` e `user.email` configurados.
Antes do primeiro commit, configurar a identidade Git do responsável. Não inventar
autoria. Nenhum remoto foi adicionado.
