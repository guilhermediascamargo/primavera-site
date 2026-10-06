# Código exclusivo do servidor

Reservado para configuração privada e adaptadores de persistência, armazenamento
e autenticação. Ainda não há conexões, clientes, credenciais ou implementação.

Ao criar o primeiro módulo executável aqui, adicionar a dependência `server-only`
e usar `import "server-only"` em cada ponto de entrada. Não reexportar esses módulos
em barrels compartilhados com Client Components.

- `db/`: futuro Prisma ORM 7 estável sobre PostgreSQL/Neon.
- `storage/`: futuro adaptador R2; banco guarda referências e metadados, não arquivos.
- `auth/`: futuro Better Auth, junto com `/admin` na mesma aplicação.

Criar essas pastas e seus contratos somente quando houver implementação real.
Rotas devem delegar aos casos de uso; regras de domínio não dependem dos provedores.
