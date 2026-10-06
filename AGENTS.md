# Instruções para agentes

## Escopo e verdade dos dados

- Este repositório contém um protótipo não oficial do Grêmio Esportivo Bagé,
  com Home-hub, Notícias, Jogos, Elenco, História, Sócios e Clube já implementados.
- Leia `README.md`, `docs/product.md`, `docs/architecture.md` e
  `docs/project-status.md` antes de trabalhar; este último registra o estado atual.
- Não invente notícias, atletas, partidas, resultados, patrocinadores ou história.
- Conteúdo demonstrativo somente com autorização e identificação explícita.
  A notícia do hero, o próximo jogo da Home e os benefícios de Sócios ainda são exemplos.
- Não implemente novas áreas ou integrações sem escopo autorizado. Preserve as
  composições aprovadas e a direção Jalde Contemporâneo.
  Notícias usa cadastro editorial único e imagens de referência provisórias.
  Sócios não realiza associação online.

## Stack e dependências

- Next.js 16 App Router, sempre no patch estável de segurança mais recente da linha
  16; sem canary. Node.js 24 LTS, TypeScript strict, pnpm e Tailwind CSS 4.
- React estável compatível com Next.js 16. Prisma ORM 7 estável ao iniciar banco;
  não usar Prisma 8 RC. Não trocar a stack sem avisar e explicar ao responsável.
- Use somente pnpm; mantenha `pnpm-lock.yaml` versionado e instale versões exatas.
- Consulte fontes oficiais e o registro ao atualizar; rode todas as verificações.
- Não instale dependências sem uso imediato. shadcn/ui somente para primitives e
  componentes funcionais necessários ao design system próprio.

## Arquitetura

- Uma aplicação full-stack, monólito modular, sem monorepo ou microserviços.
- `src/app`: rotas e composição; Server Components por padrão. `use client` somente
  para interação, estado ou APIs do navegador que o exijam.
- `src/components`: compartilhados; `src/features`: regras e UI por domínio;
  `src/server`: código privado, integrações e adaptadores.
- Ao implementar módulos server-only, instale `server-only` e marque seus pontos
  de entrada. Nunca exponha segredos em Client Components ou `NEXT_PUBLIC_*`.
- Regras de domínio não dependem de Next.js, Prisma, Neon, R2 ou Netlify.
- Priorize geração estática/ISR e SEO para conteúdo público. Defina revalidação
  quando existir uma fonte de dados real; não force renderização dinâmica global.
- Futuro banco: PostgreSQL no Neon, Prisma 7. Arquivos no R2; banco guarda apenas
  referências e metadados. Sem CMS externo.
- Futuro `/admin` e Better Auth na mesma aplicação; autenticação e autorização
  devem ser verificadas no servidor antes de liberar mutações administrativas.

## Qualidade e entrega

- Preserve strict mode; não silencie erros com `any`, desativação de lint ou flags
  de build. Faça mudanças pequenas e diretamente relacionadas à tarefa.
- Execute `pnpm check` antes de entregar (formatação, lint, tipos, build e smoke).
- `pnpm test` requer `pnpm build` prévio. Ao alterar comportamentos aprovados,
  atualize os smoke tests pertinentes. Preserve os testes de domínio existentes.
- Nunca versione credenciais, `.env.local`, `node_modules` ou `.next`.
- Trabalhe em branches e Pull Requests. Nunca faça push direto para `main`.
- Não publique nem crie recursos pagos fora do escopo autorizado. GitHub privado;
  produção futura na Netlify Pro com Deploy Previews e deploy automático após merge.
- Documente decisões e relate arquivos alterados, verificações e limitações reais.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
