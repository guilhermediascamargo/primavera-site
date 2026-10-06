# Domínios

Espaços reservados: `news`, `athletes`, `matches`, `competitions`, `standings`,
`sponsors` e `club`. Nenhum domínio possui implementação ou dados nesta etapa.

Criar `components`, `domain` e `application` dentro de cada domínio somente conforme
a necessidade. Regras de negócio não devem importar Next.js, Prisma, Neon, R2 ou
Netlify. Integrações e implementações de persistência ficam em `src/server`.

Evitar importações de detalhes internos entre domínios. Definir contratos pequenos
quando surgir uma necessidade real de integração; não criar abstrações especulativas.
