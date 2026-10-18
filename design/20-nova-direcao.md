# FinxiIT — direção editorial e cinema de produto

## Decisão de design

Uma página clara, precisa e ligada ao aplicativo real. A primeira tela deve apresentar a FinxiIT como produto de gestão, não como uma experiência audiovisual abstrata. Um título grande e um celular de grande escala estabelecem o assunto. Os filmes entram como demonstrações que respondem à rolagem. A empresa, a IA e o Android completam a história sem repetir o mesmo conteúdo.

Leitura aplicada: `tooling/skills/frontend-design/SKILL.md`. Referências públicas consultadas em 02/10/2026: [Cold Club](https://www.scrolltide.co/templates/cold-club), [Marlin](https://www.scrolltide.co/templates/marlin) e [Vesper](https://www.scrolltide.co/templates/vesper). As páginas descrevem, respectivamente, um filme com manifesto integrado, continuidade entre dois clipes dirigidos pelo scroll e um objeto de produto que permanece central durante a narrativa. Usar esses princípios, sem copiar ativos, identidade, código ou prompts premium. Esta pesquisa inspecionou as descrições públicas, não o conteúdo comprado dos templates.

## O que precisa mudar

A primeira direção Hera usava alças de editor e uma pergunta semelhante a um prompt, aproximando a identidade de outra categoria de produto. A versão posterior ganhou presença cinematográfica, mas acumulou introdução longa, apresentação institucional, três blocos completos de problemas e três palcos extensos de vídeo. Esse ritmo faz a página parecer uma sucessão de apresentações.

A captura `design/qa/scrolltide-empresa.png` confirma outro problema de densidade: título, explicação, subtítulo da missão, explicação da missão, subtítulo da visão e explicação da visão repetem uma mensagem próxima. Reduzir títulos intermediários e adotar uma única composição editorial. O novo site deve gastar sua ousadia na escala do produto e na continuidade da demonstração, preservando áreas calmas para leitura.

## Tokens

| Token | Valor | Aplicação |
|---|---|---|
| Azul original | `#0649FF` | CTA, seleção ativa, assinatura visual |
| Branco | `#FFFFFF` | Canvas principal e fundo das telas |
| Papel frio | `#F4F7FC` | Institucional, mudanças suaves de seção |
| Tinta | `#10203B` | Títulos e textos principais |
| Texto secundário | `#53627A` | Parágrafos e legendas |
| Linha | `#DCE4F0` | Separações com função estrutural |

Uma família: Manrope Variable, já local. Hero 104–120 px desktop, 48–56 px mobile; títulos de seção 48–60 px; corpo 17–18 px; auxiliares 13–14 px. Peso 550–650 nos títulos, entrelinha 1.0–1.08, tracking -0.04em. Não colocar uma palavra colorida isolada nos títulos. Linha de texto de 45–70 caracteres. Interface em caixa normal.

Container de 1280 px, margens 64 px desktop / 20 px mobile, grade de 12 colunas e gap de 32–48 px. Espaçamento de seções de 88–104 px, sem acrescentar áreas vazias apenas para fazer o scroll durar. Botões com 52 px de altura e raio 8 px. Filme principal pode ter raio 20 px; os demais blocos não precisam virar cartões.

## Estrutura compacta

```
marca                  O app   A FinxiIT   Como a IA funciona       Android

Seu negócio,                           [celular real em grande escala]
com mais direção.                      [app legível, sombra controlada]
Gestão, planejamento e divulgação.
[Conhecer o aplicativo]                 [material da rotina, poucos objetos]

                    Da rotina a uma decisão melhor.
┌──────────────────────────────────────────────────────────────────────┐
│  Registrar          FILME 1 / FILME 2 / FILME 3                       │
│  Planejar           Um palco, uma jornada                            │
│  Divulgar           App real e contexto de trabalho                   │
│                     Texto curto muda em cada capítulo                │
└──────────────────────────────────────────────────────────────────────┘
     Financeiro                 Estratégia                 Marketing
  problema → solução        problema → solução         problema → solução
  (um parágrafo cada; detalhes sob demanda)

Inteligência para quem            Missão + texto direto
faz o negócio acontecer.          Visão + texto direto
apresentação da FinxiIT
  clareza        autonomia        contexto        transparência

Uma conversa. O contexto inteiro. [diagrama IA e explicação interativa]

Dúvidas práticas                  [accordion de 4 itens]

Seu próximo passo começa no Android.           [celular] [Baixar]
rodapé limpo
```

Evitar quatro telas consecutivas de abertura antes do app. A apresentação institucional deve vir depois de uma demonstração, quando o visitante já sabe o que a empresa oferece.

## Roteiro de mídia

Três filmes distintos, unidos pelo mesmo universo visual: luz natural, azul FinxiIT, aparelho Android, objetos reais de pequeno negócio. Financeiro: informação espalhada se torna registro e resumo do caixa. Estratégia: uma dificuldade informada se transforma em contexto e plano revisável. Marketing: um produto se transforma em mensagem e proposta de divulgação. Preservar os materiais originais e a imagem autêntica do aplicativo; usar Flow para câmera, ambiente e movimentos, não para inventar letras ou dados de interface.

A progressão deve ficar vinculada à posição da página, com pausa quando a rolagem para e reversão quando o visitante sobe. Não reutilizar o filme como vídeo ambiente. Um palco integrado, com seletor de capítulos e saltos acessíveis, é preferível a três experiências de 340 svh. Se a implementação mantiver três palcos, cada um deve ser bem mais curto e não repetir título, introdução e texto explicativo antes e depois.

## Conteúdo e evidência

Usar `src/content/company.js`, apoiado no documento e no código Android. Missão, visão e quatro valores devem manter a formulação já revisada. Explicar o uso da IA como coordenação de contexto e serviços especializados; não sugerir que a FinxiIT treinou um modelo proprietário. Os provedores podem ficar em detalhes expansíveis. Não usar percentuais de ganho, número de clientes ou avaliações sem fonte. Android precisa de um destino real configurado; na ausência, o botão exibe a indisponibilidade de forma clara.

## Revisão de singularidade

O site poderia cair em outra landing page de software se mantivesse três cartões de benefícios e uma nuvem de ícones. A versão refinada usa a tela real como evidência, o ambiente do empreendedor como matéria visual e uma jornada que conecta as três especialidades. A seção institucional não terá animação própria nem uma grade de cartões; sua personalidade vem da hierarquia tipográfica e do contraste de escalas. Isso deixa o cinema ser o momento principal.

## Implementação desta etapa

`src/redesign/Institution.jsx` e `src/redesign/institution.css`: composição institucional independente, com manifesto à esquerda, missão e visão à direita e quatro valores na base. Não altera App ou CSS global. Importar `Institution` e inserir uma única vez. A seção já importa seu CSS, tem id `empresa`, sem dependência de JavaScript de movimento e com layout fluido até 320 px.
