# Hero cinematográfico FinxiIT

## Direção antes da implementação

Um único movimento caracteriza a abertura: o celular se revela à medida que a pessoa rola a página. A composição usa o aparelho à direita e texto editorial à esquerda, com a marca e a navegação fornecidas pelo cabeçalho da página.

- Base: azul profundo `#061124`, noite `#020812`, branco `#F7FAFF`, texto secundário `#C4CEDF`, azul FinxiIT `#0649FF` e foco `#A4C2FF`.
- Tipografia: herdar Manrope do site; título grande com peso 600, sem palavra destacada por cor. Texto alinhado à esquerda e largura de leitura controlada.
- Espaçamento: margem lateral fluida de 24 a 104 px, espaço superior reservado ao cabeçalho, rodapé da cena com navegação de progresso discreta.
- A assinatura visual é o produto filmado. Sem cards flutuantes, contadores inventados, depoimentos ou efeitos de entrada repetidos.

```text
┌ marca / navegação externa ─────────────────────────┐
│                                                   │
│ Seu trabalho merece            CELULAR             │
│ ir mais longe.                 FILMADO             │
│ Texto curto                    À DIREITA           │
│ Conhecer o app / A empresa                         │
│                                                   │
│ Etapa atual                    rolar / progresso   │
└───────────────────────────────────────────────────┘
```

Revisão da proposta: o texto mantém a apresentação da empresa, enquanto o filme usa o universo visual do próprio app. A barra representa uma sequência real do filme, portanto as três etapas têm função de navegação, não são decoração.

## Implementação

- Componente isolado: `src/components/CinematicHero.jsx`; estilos: `src/cinematic-hero.css`.
- Importar e renderizar `<CinematicHero />` no início de `main`. A folha de estilos é importada pelo próprio componente.
- Arquivos esperados: `public/media/finxi-cinematic.mp4` e `public/media/finxi-cinematic-end.jpg`.
- Área de rolagem de 210svh com cena fixa de 100svh. O progresso alimenta `video.currentTime`; não há autoplay nem chamadas a `play()`.
- Primeiro instante: 2 s, quando o celular já é identificável. A inspeção visual mostrou que o macro inicial de 0,05 s exibia apenas uma borda e o conector. Último instante: duração menos 0,04 s. Reverter a rolagem reverte o filme.
- Uma única busca de frame fica pendente por vez. `seeked` aplica o alvo mais recente, evitando filas quando a pessoa rola rapidamente.
- Poster visível antes de o primeiro frame estar pronto. Falhas do vídeo, economia de dados e preferência por movimento reduzido usam imagem e uma apresentação compacta.
- Controle range com nome acessível e texto de progresso; link para pular diretamente ao app; navegação por teclado com foco visível.
- No celular, a imagem prioriza a direita e recebe uma camada escura sob o texto. Em telas baixas, a composição perde a fixação para preservar leitura e acesso aos links.

## Verificação prevista

Após o arquivo final do Flow ser adicionado, verificar no navegador: início/meio/fim, reversão, pausa sem rolagem, poster, falha de carregamento, preferência por movimento reduzido, teclado e larguras de 320, 390 e 1440 px.

## Verificação visual realizada em 2 de outubro de 2026

- Chrome DevTools MCP real em produção local: 1440×1000, 1440×675, 390×844 e 320×675.
- Após a revisão, o filme começa em 2 s. Com 75% da rolagem, atinge 6,47 s; ao retornar a 25%, volta a 3,49 s. Sem rolagem, o instante se mantém; `paused` permanece verdadeiro e `autoplay` falso.
- Sem transbordamento horizontal nos tamanhos medidos. Texto, ações e controle de progresso não se sobrepõem. Tipografia e espaçamento do desktop com pouca altura foram ajustados após a primeira captura.
- Nenhum erro de console registrado na sessão.
- Evidências: `design/qa/scrolltide-hero-qa.json` e capturas com prefixo `scrolltide-hero-`. Esta sessão específica verificou a composição e o mecanismo de rolagem; o teste de movimento reduzido fica na revisão integrada do site.
