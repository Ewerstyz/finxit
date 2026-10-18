# FinxiIT usando a referência Targo

## Direção aplicada

A geometria da referência passa a apresentar a FinxiIT: títulos Quantico em escada, fundo `#F2F1F0`, recuos graduais, mídia em grande escala e botões chanfrados. O azul original `#0649FF`, o símbolo e o nome FinxiIT identificam o aplicativo. Texto e navegação em português. Os dois grandes blocos continuam sendo Hero e apresentação; os conteúdos internos usam artigos, sem acrescentar footer.

O Hero diz “Gestão e inteligência para seu negócio”. O telefone real ocupa o lado direito, com scrim claro à esquerda. Em celular, a mídia fica acima do título. Sobre usa duas linhas em escada e o filme Relatórios. O Assistente recebe uma composição correspondente, com a mensagem “Uma conversa”. As telas mantêm as cores originais.

## Narrativa e conteúdo

1. Abertura: proposta e interface autêntica do Início.
2. Sobre: FinxiIT e organização dos números, com Relatórios.
3. Três frentes: Financeiro, Estratégia com IA e Marketing em abas; cada área explica desafio, solução, recursos e detalhes.
4. Empresa: missão, visão e quatro valores com conteúdo fundamentado no projeto.
5. Assistente: o contexto como ponto de partida para a assistência.
6. Arquitetura: fluxo, serviços especializados, armazenamento e revisão das decisões.
7. Uso: quatro passos do perfil ao acompanhamento das ações.
8. Android: fechamento da apresentação e ação de download configurável.

Não foram inventados clientes, avaliações, resultados ou canais de contato. Missão, visão e valores seguem o conteúdo editorial já documentado. Provedores de IA ficam em detalhes expansíveis. A imagem de Marketing é a imagem editorial gerada anteriormente; sua identificação permanece visível.

## Produção dos filmes

Usados os três filmes locais recentes do Flow: `finxi-app-home`, `finxi-app-reports` e `finxi-app-assistant`. Nenhum download ou nova geração foi realizado nesta adaptação. As capturas do usuário foram recompostas anteriormente nos visores e os exports originais estão em `referência/videos/revisao-2026-10-02/`.

Hero começa em 3,8 s, no enquadramento do app; as demais cenas começam em 0,05 s. O final evita os últimos 0,05 s para manter o seek válido. O progresso usa `useScroll` de Motion e uma busca de vídeo por vez, atualizada após `seeked`. Nenhum `play()`, autoplay ou loop é usado pelo código ativo. A rolagem para trás retrocede o filme e a página parada mantém o frame.

Os palcos ocupam 190svh, 190svh e 185svh. Cada um tem range, percentual e saída para a próxima área. Movimento reduzido, economia de dados ou altura inferior a 640 px selecionam apresentação estática. Em celular, altura inferior a 740 px também utiliza imagens para manter todo o conteúdo acessível.

## Verificação

Build Vite aprovado: aproximadamente 17,68 KB de CSS e 330,72 KB de JS, antes de gzip. Chrome DevTools MCP verificou 24 posições de filme (três filmes, dois sentidos, quatro larguras). Tempos esperados e observados coincidiram dentro da tolerância; todos permaneceram pausados e estacionários com a página parada, sem autoplay. Controles de progresso visíveis em todas as posições.

Desktop 1440 × 1000, tablet 768 × 1024, celular 390 × 844 e tela estreita 320 × 740: sem excesso lateral. Abas por teclado, accordion, menu móvel, Escape, foco, âncoras e aviso Android aprovados. Movimento reduzido: três cenas estáticas e nenhum vídeo. Monitor baixo 1280 × 600: alternativa estática. Imagens carregadas e console sem erros.

Relatórios e capturas: `design/qa/finxi-reference-review.json`, `finxi-reference-reduced.json` e `finxi-reference-*.png`. Verificações adicionais de controle por teclado, Marketing e detalhes de IA ficam em `finxi-reference-interactions.json`. Nenhuma nova métrica Lighthouse foi atribuída a esta versão.

A revisão adicional confirmou o seek pelo teclado até 7,95 s, a imagem de Marketing carregada e as três rotas de modelos de IA. A primeira tentativa do teste usou um clique sintético para selecionar a aba; foi corrigida para a interação real por teclado. O registro inicial permanece em `finxi-reference-initial-interactions.json`. Não foi necessária uma alteração no componente de abas.

## Arquivos e preservação

Código ativo em `src/App.jsx`, `src/finxi/ScrollScene.jsx`, `src/styles.css` e `design/finxi-reference-tokens.css`. Conteúdo em `src/redesign/content.js` e `src/content/company.js`. A reprodução original Targo foi copiada para `archive/targo-reference/`. A versão FinxiIT anterior permanece em `archive/finxiit-before-targo/`. Download Android usa `public/site-config.json`; o campo continua vazio para o usuário definir seu canal oficial posteriormente.
