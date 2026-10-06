# História

Escopo isolado de `/historia`, a partir do briefing editorial fornecido pelo
responsável. Server Components compõem cenas, arquivo e conteúdo. A fronteira
Client se limita a `HistoryProgress`: IntersectionObserver atualiza o capítulo
em mudanças discretas, sem listeners contínuos de scroll.

CSS Modules mantém todos os estilos locais. Sticky segura a casa e 1925 enquanto
os registros avançam; scroll timelines nativas fazem convergir as origens,
revelam a geometria do campo e ampliam/iluminam a foto atual do Pedra Moura.
Navegadores sem suporte mantêm uma composição estática completa. No mobile,
origens e cenas fixas viram uma sequência vertical. Reduced motion elimina
animações e a permanência sticky das cenas, reduzindo também os intervalos.

Nenhuma fotografia histórica está disponível. A única imagem utilizada é
`public/images/stadiums/pedra-moura.jpg`, preservada e identificada como fotografia
atual; ela não documenta 1977. Não foram criados documentos, imagens, citações,
fundadores ou presidentes. A cena de 1957 é uma composição editorial atual,
explicitamente identificada, sem simular reprodução de um jornal antigo.

Cronologia de consulta em HTML nativo (`details` / `dl`), acessível por teclado e
sem JavaScript. Os dados sensíveis mantêm ressalvas. Todo conteúdo narrativo é
gerado no servidor e pode ser lido sem animações ou JavaScript.

A única alteração externa à feature e sua rota é o smoke test existente:
`tests/production.test.mjs` deixa de exigir o placeholder de História e verifica a
nova narrativa. Os testes de Notícias, Clube e demais áreas são preservados.

## Validação

`pnpm check` executa os validadores existentes; o teste HTTP inclui História.
`tests/browser-review.mjs` oferece revisão opcional contra um servidor de produção
com Playwright disponibilizado pelo ambiente, sem instalar pacotes no projeto.
Definir `HISTORY_PLAYWRIGHT_PATH`, `HISTORY_REVIEW_OUTPUT` (fora do repositório) e,
se necessário, `HISTORY_BROWSER_PATH` e `HISTORY_REVIEW_URL`. Executar com Node.

O roteiro verifica as 12 cenas em 320, 390, 768, 1280 e 1440 px, títulos, overflow,
imagem, erros de navegador, cronologia por teclado, reduced motion e leitura sem
JavaScript. Gera capturas e `results.json` para revisão visual. Também verifica a
liberação das cenas sticky em telas de pouca altura. A revisão humana continua
necessária para aprovação editorial e visual.
