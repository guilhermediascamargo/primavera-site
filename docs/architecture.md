# Arquitetura

## Arquitetura vigente

Uma aplicação Next.js 16 App Router, full-stack, em TypeScript strict, executada
com Node.js 24 LTS e pnpm. Sem microserviços, monorepo ou backend separado.

Server Components são o padrão. Client Components devem se limitar às fronteiras
de interação. O conteúdo público deve priorizar geração estática/ISR; definir
estratégias de revalidação a partir de dados reais. As páginas públicas atuais
usam geração estática, incluindo Home, Notícias, Jogos, Elenco, História e Sócios.

## Limites dos módulos

```text
rotas (src/app) → casos de uso e regras (src/features)
                        ↑ contratos conforme a necessidade
                 adaptadores privados (src/server)
                        ↓
                PostgreSQL / R2 / autenticação
```

Rotas compõem interface, entrada e resposta. Componentes compartilhados ficam em
`src/components`; os específicos ficam no domínio correspondente.

As features existentes incluem Home, notícias, atletas, jogos, competições,
história, sócios e patrocinadores. Datasets tipados de Jogos e Elenco são as fontes
compartilhadas entre Home e páginas internas. As fronteiras Client cuidam de
navegação, carrossel, countdown, filtros, capítulos da História, carteirinhas e
experiência de Clube (vídeo, estados e hotspots em dataset tipado local);
não mova composição ou dados para o cliente apenas por efeitos visuais.

Notícias mantém um dataset editorial único em `src/features/news/data/news-articles.ts`.
O corpo usa somente parágrafo, subtítulo e imagem; capas e imagens internas têm alt,
crédito opcional e marcação provisória. Listagem, rotas estáticas por slug, curadoria
da Home e relacionadas consomem esse cadastro, com um único template no servidor.
Os fatos esportivos reutilizam Jogos; não há CMS, admin, banco ou IA editorial nesta V1.

O domínio deve ser independente de Next.js e dos provedores. Quando houver
persistência, os casos de uso dependerão de contratos pequenos implementados por
adaptadores no servidor. Não criar repositórios genéricos, contêiner de injeção ou
camadas vazias antes de haver necessidade.

Os primeiros módulos privados deverão usar `server-only` para impedir importação
por componentes cliente. Variáveis de ambiente serão lidas e validadas nessa
fronteira, sem expor segredos em `NEXT_PUBLIC_*`.

## Infraestrutura prevista

| Área         | Escolha                     | Situação nesta etapa                                      |
| ------------ | --------------------------- | --------------------------------------------------------- |
| Banco        | PostgreSQL / Neon           | Sem conexão ou esquema; Free no desenvolvimento           |
| ORM          | Prisma ORM 7 estável        | Adiado até a primeira modelagem; não instalar 8 RC        |
| Arquivos     | Cloudflare R2               | Sem cliente; apenas referências/metadados no banco futuro |
| Autenticação | Better Auth                 | Adiada até o painel administrativo                        |
| Admin        | `/admin` na aplicação atual | Sem rotas ou funcionalidades                              |
| CMS          | Painel próprio              | Sem CMS externo                                           |
| Hospedagem   | Netlify Pro                 | Configuração de build preparada; sem publicação           |
| Código       | GitHub privado              | Remoto configurado; colaboração em branches e PRs         |

Na produção, escolher plano Neon baseado no uso esperado. Separar dados e
credenciais de desenvolvimento, previews e produção. Implementar detalhes de
pooling, migrations e URLs de conexão ao configurar Prisma 7/Neon.

O runtime/adaptador da Netlify fica restrito ao deploy. O código da aplicação não
importa SDK da Netlify nem depende de seus eventos. Não usar `output: export`, pois
isso limitaria futuras funcionalidades de servidor e ISR.

## Estilos e qualidade

Tailwind CSS 4 integrado por PostCSS; tokens institucionais em
`src/styles/globals.css` e CSS Modules para composições das features. Direção Jalde
Contemporâneo: preto, jalde e marfim. Archivo e Barlow Condensed usam `next/font/google`,
com necessidade de rede durante builds que ainda precisem obter as fontes.

TypeScript strict, `noUncheckedIndexedAccess` e `exactOptionalPropertyTypes`;
ESLint flat config com Next.js/TypeScript; Prettier; CI e smoke HTTP do build.
O runner nativo do Node executa testes de domínio e smoke HTTP das rotas compiladas,
sem dependência adicional. O protótipo mantém `noindex, nofollow`.

ESLint 9.39.5 foi mantido porque `eslint-plugin-react`, trazido pela configuração
oficial do Next.js 16.3.6, declara suporte até ESLint 9. O registro já marca essa
linha como fora de suporte. Reavaliar ESLint 10 assim que a cadeia de plugins for
compatível; não forçar peer dependencies ou retirar regras para ocultar o conflito.
TypeScript 5.9.3 é estável e compatível com essa cadeia de ferramentas.

`pnpm-workspace.yaml` guarda somente políticas do gerenciador; não define pacotes
de workspace nem transforma o projeto em monorepo. O postinstall do resolvedor
nativo `unrs-resolver` (dependência do lint) está explicitamente autorizado.

## Referências consultadas em 26/09/2026

- [Instalação Next.js](https://nextjs.org/docs/app/getting-started/installation)
- [Releases e avisos de segurança Next.js](https://nextjs.org/blog)
- [Status de releases Prisma](https://www.prisma.io/docs/orm/release-status)
- [Next.js na Netlify](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/)

As versões instaladas foram verificadas no registro npm, usando somente releases
estáveis. Atualizações futuras devem preservar as linhas aprovadas e o lockfile.
