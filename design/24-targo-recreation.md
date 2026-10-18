# Targo — recriação das duas seções

Solicitação aplicada literalmente a partir de `referência/prompt-targo.txt`: Targo, texto em inglês, Hero e About, sem outras seções ou rodapé. A versão anterior FinxiIT está preservada em `archive/finxiit-before-targo/`.

## Direção

Quantico Google Fonts, pesos 400 e 700. Fundo `#F2F1F0`, título `#2B3033`, corpo `#6B6F72`, links `#3A3A3A`, destaque `#15BCDF`, hover `#3FD0EF` e borda `#0FA3C2`. Títulos uppercase, tracking 0.01em e linha 0.98. Logo construído em CSS e favicon em SVG com as formas exatas fornecidas.

Hero: seis linhas em escada, últimas três recuadas, Business em ciano. Vídeo de fundo em sua proporção original, posicionado com width 99% e right -20% no desktop; width 119% e left -12% no móvel. Scrim de 70% apenas no desktop. Tamanho do título limitado por vh para manter o CTA visível em monitores baixos. Botões usam os polígonos chanfrados do prompt.

About: duas colunas flexíveis, recuo da palavra Business e do texto, sem padding à direita. O segundo filme fica encostado na borda da tela. A camada de hue cobre somente as dimensões do filme. Em telas de até 359 px, o padding esquerdo é 20 px para acomodar a coluna mínima de 300 px dentro de uma largura total de 320 px. Essa é a única adaptação de medida para corrigir excesso lateral.

## Vídeos

Os dois URLs fornecidos são incorporados diretamente em `src/App.jsx`; não foram baixados, reeditados ou gerados novamente. O Hero possui vídeo 1920 × 1080 e o About 1440 × 1440, conforme metadados lidos no navegador. Reprodução automática, loop, ausência de áudio, inline e preload foram confirmados.

O componente tenta reproduzir ao montar, a cada segundo e no primeiro clique ou toque. Define `muted` antes de `play()` e trata a rejeição. Eventos e intervalo são removidos no cleanup. Os filmes são decorativos e ignorados pelas tecnologias assistivas.

## Navegação

HOME aponta para `#home`, ABOUT e GET STARTED para `#about`. CONTACT US e LEARN MORE apontam para `#contact`, dentro da coluna textual About. Não há backend de contato, email ou outro destino no prompt. O menu móvel possui três links, estado acessível e retorno de foco ao botão ao pressionar Escape.

## Evidência de conclusão

- Build Vite aprovado: CSS aproximadamente 5,58 KB e JS aproximadamente 226,76 KB antes de gzip.
- Chrome DevTools MCP: seis larguras/alturas, incluindo ambos os lados do breakpoint de 700 px.
- Exatamente duas seções, dois vídeos e seis linhas no h1; nenhum footer.
- Quantico carregada e filmes com `readyState=4`, `paused=false`, tempo avançando e sem erro de mídia.
- Nenhuma rolagem horizontal na revisão final.
- CTA preservado dentro da primeira tela em 1280 × 600 px.
- About com vídeo à direita e camada de hue alinhada.
- Menu, Escape, foco e âncoras aprovados.
- Console sem mensagens de erro.

Relatório final: `design/qa/targo-review.json`. Capturas: `design/qa/targo-hero-*` e `targo-about-*`. A revisão inicial que identificou excesso de 9 px em 320 px permanece em `targo-initial-review.json`. Fontes e vídeos dependem de acesso às URLs externas fornecidas.
