# FinxiIT — apresentação cinematográfica

Site de apresentação baseado no Plano de Negócios Finxi-IT de outubro de 2026. A empresa vem antes do aplicativo: origem do nome, missão, visão, valores, equipe e pesquisa regional; depois entram o protótipo Android, núcleo financeiro, IA como copiloto, evolução e planos propostos. Space Grotesk e a paleta azul mantêm a direção tecnológica. Evidências e limites: design/38-business-plan-presentation.md.

## Executar

Ambiente usado na validação: Node.js 24 e pnpm 11.25.0. O lockfile está incluído para reproduzir as dependências.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
pnpm preview --port 4173
```

Prévia local em http://127.0.0.1:4173/. Distribuição em dist/. Não publicado em domínio nesta revisão.

## Conteúdo do repositório

O repositório inclui código, configurações, fontes, imagens, vídeos do site, documentação de design e scripts de validação. Os arquivos em public/ permitem gerar o site completo depois de clonar, sem precisar baixar novamente os vídeos do Flow. O projeto não exige chaves de API para funcionar.

Dependências instaladas, build, caches, anexos, versões arquivadas, logs de navegador e documentos originais de negócio ficam locais, conforme .gitignore. Os scripts de produção dos vídeos usam originais em referência/ e bibliotecas locais; eles são opcionais e não fazem parte do build do site. As menções a essas pastas na documentação registram a produção local.

## Estrutura

| Arquivo                           | Uso                                                     |
| --------------------------------- | ------------------------------------------------------- |
| src/App.jsx                       | Navegação e composição institucional, app, IA e Android |
| src/cinematic/ZoomJourney.jsx     | Abertura com zoom e alternativa estática                |
| src/cinematic/zoom-journey.css    | Enquadramentos e coreografia da abertura                |
| src/cinematic/content.js          | Roteiro da empresa, público e problema brasileiro       |
| src/content/company.js            | Funções do projeto Android e arquitetura da IA          |
| src/finxi/ScrollScene.jsx         | Tempo do filme controlado pela rolagem                  |
| src/styles.css                    | Layout e responsividade                                 |
| design/finxi-cinematic-tokens.css | Paleta, tipos, espaçamento e largura                    |
| public/site-config.json           | Destino do download Android                             |
| tooling/qa-brand-opening.mjs      | Revisão atual com Chrome DevTools MCP                   |

## Download Android

Preencha androidDownloadUrl em public/site-config.json com a URL oficial e gere o build. Na distribuição, o arquivo fica em dist/site-config.json. Sem endereço, o botão informa que o canal está em preparação. Não há link fictício ou APK de desenvolvimento publicado.

## Mídia e movimento

A abertura atual usa public/media/finxi-flow-full-film-v1.mp4, preparado a partir do filme completo do Google Flow enviado pelo usuário em 03/10/2026. Preserva a sequência logo → app → pessoas → Brasil e os 17,5 segundos. Dois blends locais suaves corrigem as junções sem acrescentar cenas. A cópia para web tem keyframes frequentes para buscar o tempo do filme com a rolagem, faststart e cerca de 6,56 MB. O filme avança e retorna com o scroll; textos entram e saem com Motion. O original com áudio foi preservado em referência/videos/filme-completo-2026-10-03/. Fontes, ajustes e validação: design/36-user-full-film-integration.md.

Estado ativo: src/cinematic/opening-media.json. A preparação local reproduzível está em tooling/install-user-film.py; tooling/inspect-user-film.py examina o arquivo fornecido e os cortes. A versão anterior foi preservada em archive/finxi-before-user-full-film/. Não há cenas de varejo na abertura. Os documentos anteriores em design/ registram tentativas de geração e versões substituídas; a revisão atual usa o MP4 que o próprio usuário forneceu, sem novo download ou nova geração de IA.

Na seção de público, src/cinematic/BrazilNetwork.jsx apresenta um mapa com as cinco regiões e o contorno oficial do IBGE. As conexões representam o propósito, sem indicar clientes ou cobertura medida. O mapa funciona localmente.

Três novos filmes foram gerados no Flow em 18/10/2026 com Omni 1.1 Flash, 720p, oito segundos cada, sem Veo Quality. As capturas reais foram recompostas nas telas para preservar textos e valores. Arquivos public/media/finxi-plan-{organize,entenda,converse}.mp4; originais em referência/videos/plano-2026-10-18/. Detalhes: design/39-flow-plan-films.md.

Os filmes aparecem num único palco, na sequência Organize → Entenda → Converse. Cada vídeo avança com a rolagem; ao completar sua etapa, o próximo assume o palco e o botão correspondente fica ativo. Depois de Converse, a página continua para os recursos. Rolar para cima percorre o caminho inverso. Os botões saltam para o início de cada etapa, e Rever filme volta ao início do filme atual. Os vídeos ficam pausados, sem autoplay ou loop. O parâmetro demo da URL acompanha a etapa e permite acesso direto a ela.

Os vídeos acompanham a rolagem também em celulares pequenos e em paisagem. Tipografia e espaçamento se ajustam à altura disponível, sem desativar os filmes. O carregamento espera os metadados e, quando necessário, usa o primeiro gesto para liberar a decodificação móvel; o filme permanece pausado e avança ou retorna apenas com a rolagem. As preferências de movimento reduzido e economia de dados recebem imagens estáticas e leitura normal, sem palcos longos. As barras e porcentagens foram removidas. Botões de capítulo, botão Rever filme e teclado permitem explorar sem depender apenas de gestos. A abertura é verificada com tooling/qa-brand-opening.mjs; a sequência e os botões, com tooling/qa-demo-sequence.mjs. O teste tooling/qa-mobile-scroll.mjs cobre emulação móvel com toque, orientação, quadros decodificados, retorno e continuidade da página. Relatórios locais em design/qa/. Correção móvel: design/40-mobile-scroll-fix.md.

## Conteúdo e ferramentas

Missão, visão, valores, nomes dos fundadores e papéis agora seguem o plano de negócios fornecido. A pesquisa própria é exploratória, com 12 respostas; não comprova resultados do app nem representa o Brasil. O dado nacional do Sebrae foi conferido na publicação de janeiro de 2026. Não há clientes, parcerias firmadas ou resultados comerciais inventados. Dados de aporte, orçamento e projeções da empresa ficam fora da apresentação pública.

A IA é descrita como copiloto para explicar informações e apoiar escolhas; cálculos seguem regras verificáveis. Fornecedores definitivos não são afirmados pelo plano. Armazenamento seguro, cobrança, testes e atendimento compõem a preparação comercial. Os planos Simples e Pro são propostas em validação, sem checkout no site.

Nesta revisão: Flow Studio pelo navegador, Gemini 4 Argon em modo Tarefa para roteiro/revisão textual, Motion, componentes shadcn/ui, processamento local das capturas nos filmes e Chrome DevTools MCP para validação. A revisão do Gemini não substitui os testes locais. Os registros anteriores citam ferramentas utilizadas em outras versões; não representam novas execuções nesta etapa.

## Histórico

A versão anterior à direção tecnológica foi preservada em archive/finxi-cinematic-before-tech/. Outros históricos e referências permanecem em archive/ e referência/. O prompt Mostar está em referência/prompt-cinematic-mostar.txt e orienta a coreografia, sem usar imagens ou marca daquela cidade.
