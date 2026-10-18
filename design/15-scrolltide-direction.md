# FinxiIT — direção cinematográfica inspirada em Scrolltide

Direção de design: 02/10/2026. A tarefa é um site institucional de apresentação da FinxiIT e do seu aplicativo para pequenos empreendedores, com três filmes controlados pelo scroll e fechamento para Android. Não é uma ferramenta de geração de prompts.

## Referências verificadas

As páginas públicas foram consultadas pelo navegador web de pesquisa. Esta análise se baseia nas descrições públicas dos templates; não houve acesso a código, prompt pago ou área privada. A implementação deve ser original.

- [Marlin](https://www.scrolltide.co/templates/marlin): a descrição apresenta dois clipes coordenados pelo scroll e uma passagem entre eles com enquadramento comum. Referência para continuidade entre capítulos e para o movimento responder ao leitor. Não copiar imagens, texto ou identidade náutica.
- [Cold Club](https://www.scrolltide.co/templates/cold-club): a descrição combina um filme controlado pelo scroll e uma folha de manifesto que entra sobre a cena. Referência para aproximar apresentação da empresa e demonstração visual sem uma parede de cartões.
- [Vesper](https://www.scrolltide.co/templates/vesper): a descrição mantém um objeto central enquanto a página avança, alterando sua pose e depois encaixando-o em outra seção. Referência complementar para a permanência do celular como protagonista, sem necessariamente introduzir WebGL.
- [AeroForce](https://www.scrolltide.co/templates/aeroforce): a descrição reúne sequência de quadros e um objeto 3D. Não adotar a complexidade apenas pelo efeito: o vídeo já existente atende à demonstração FinxiIT com menor custo.

## Crítica objetiva da versão Hera

A captura `design/qa/hera-final.png` mostra um hero branco com alças de seleção e uma barra de pergunta. Esses elementos são coerentes com um editor de animações, mas fazem a FinxiIT parecer uma ferramenta de prompts. O aplicativo real aparece pequeno no rodapé do primeiro quadro. Os três cartões, com cores e ilustrações diferentes, separam módulos antes de explicar a empresa. A nova direção deve estabelecer primeiro o vínculo entre empreendedor, produto e propósito.

Manter o que funciona: linguagem direta, contraste azul, tela verdadeira do financeiro, problemas concretos e a honestidade sobre funções previstas. Retirar alças de seleção, campo decorativo e repetição de pequenas legendas. Consolidar os textos para que cada bloco tenha uma função.

## Conceito: do balcão ao próximo passo

A FinxiIT organiza a passagem entre a rotina física de quem empreende e uma visão clara do negócio. O elemento marcante será um filme de produto acompanhado por uma narrativa editorial. A fotografia e os filmes devem mostrar trabalho real: recibo, embalagem, produção, planejamento e celular. Evitar moedas voando, hologramas, cérebros digitais e painéis de bolsa de valores.

Hero sugerido: **“Seu trabalho merece ir mais longe.”**

Apoio sugerido: “A FinxiIT aproxima gestão e inteligência artificial da rotina de quem empreende. Para entender o caixa, organizar decisões e dar mais direção à divulgação.” Ajustar o tempo verbal conforme os recursos efetivamente disponíveis.

## Paleta e tipografia

| Token | Cor | Função |
|---|---|---|
| Azul Finxi | `#0649FF` | Ação principal, seleção e uma seção de assinatura |
| Azul profundo | `#071B42` | Hero e palco dos filmes; vínculo com a marca |
| Papel | `#F7F9FC` | Seções institucionais e explicações |
| Branco | `#FFFFFF` | Texto sobre azul e superfícies do aplicativo |
| Tinta | `#17253C` | Corpo e títulos nas áreas claras |
| Cinza legível | `#56657A` | Texto secundário; usar branco 75% em áreas escuras |

Usar Manrope Variable, já empacotada no projeto. Títulos 88–104 px desktop, 44–50 px mobile, peso 550–650, tracking entre -0.045em e -0.055em, entrelinha 0.98–1.06. Corpo 18 px/1.65, texto secundário 15–16 px/1.6. Não alternar famílias para fabricar sofisticação. Títulos em caixa normal, sem palavra colorida isolada. Números grandes somente para etapas reais da jornada, nunca estatísticas inventadas.

## Composição

Grade de 12 colunas, máximo 1440 px; gutters 64 px desktop, 24 px mobile. Ritmo 8 px. Respiro de seções 112–144 px desktop e 72 px mobile. Raios 0 em planos cinematográficos; 16–24 px em componentes interativos; celulares mantêm seu recorte físico. Não aplicar sombra em todas as caixas.

```
NAV   [marca]        A FinxiIT    O aplicativo    Inteligência artificial    [Android]
┌──────────────────────────────────────────────────────────────────────────────────┐
│ HERO AZUL PROFUNDO                                                               │
│ Seu trabalho                            celular + material de trabalho           │
│ merece ir                               em imagem/filme de grande escala         │
│ mais longe.                             (sem autoplay)                          │
│ [Conheça o aplicativo]                                                           │
│ Finanças, estratégia e marketing         role para acompanhar a história         │
└──────────────────────────────────────────────────────────────────────────────────┘
MANIFESTO CLARO  “Tecnologia que cabe na realidade de quem empreende.”
                  Missão e visão em duas colunas, valores em linhas legíveis.

CAPÍTULO FINANCEIRO   [problema → solução]     [filme do app, grande]
                     texto muda em 3 etapas; o filme progride com a rolagem
DETALHES             saldo / formas de registro / significado dos dados

CAPÍTULO ESTRATÉGIA   [filme de rotina/plano]   [problema → solução]
DETALHES             contexto do negócio / prioridades / acompanhamento

CAPÍTULO MARKETING   [problema → solução]     [filme produto → divulgação]
DETALHES             público / conteúdo / coerência com custos

IA                   Falar, fotografar, digitar → contexto → sugestão → revisão
                     Exemplo concreto de uma despesa alimentando decisões.
FAQ                  respostas curtas, expansão acessível
ANDROID AZUL         [celular]  “Seu próximo passo começa aqui.” [Baixar para Android]
FOOTER               marca grande, navegação e informações reais da empresa
```

O hero deve mostrar produto e universo de trabalho dentro da primeira tela. Uma grande imagem central ou lateral é preferível a três miniaturas. A seção da empresa entra cedo e deve explicar por que o produto existe, sem interromper a história com excesso de texto.

## Roteiro dos três capítulos

### Financeiro: saber o que ficou

Problema: vender e pagar contas sem uma visão organizada do caixa. Solução: reunir registros, saldo, receitas e despesas. Exibir o filme com a tela real e valores claramente ilustrativos. Em sequência, explicar voz, foto e teclado quando confirmados como recursos do projeto. Não chamar o saldo de lucro nem sugerir conexão bancária sem comprovação.

### Estratégia: transformar urgência em direção

Problema: a operação toma todo o dia e o próximo passo fica indefinido. Solução prevista: conversa inicial para entender segmento, região, rotina e dificuldade, seguida de prioridades e plano. O filme ideal mostra um empreendedor saindo de anotações soltas para um plano visual no celular. Gerar no Google Flow sem texto de interface legível e aplicar rótulos reais em HTML para evitar letras artificiais. Caso se reutilize o filme de comprovantes, apresentá-lo como entrada de dados compartilhados, nunca como demonstração de estratégia pronta.

### Marketing: divulgar com contexto

Problema: bom produto, pouca clareza sobre o que dizer e para quem. Solução prevista: ideias de público, roteiros e legendas a partir do produto e do negócio. O filme de produto fotografado e organizado em proposta de campanha é apropriado. Não prometer vendas ou afirmar publicação automática.

Cada capítulo contém uma dor, uma mudança observável e um exemplo. Complementos técnicos ficam em acordeões. Dar de 220 a 280 svh por filme, com botão para pular, para não obrigar o usuário a atravessar uma apresentação excessivamente longa.

## Empresa, IA e Android

Missão, visão e valores precisam ser fundamentados no documento de projeto. Se não houver formulação institucional aprovada, apresentar como proposta editorial, sem inventar história, sede, fundadores, clientes ou resultados. Valores adequados ao material: simplicidade, acessibilidade, autonomia e decisões informadas, sempre explicados por ações concretas do produto.

A área de IA deve responder “o que ela recebe, como usa o contexto e o que devolve”. Modelo/provedor só deve ser nomeado se houver evidência no projeto. Na ausência, explicar a arquitetura proposta: entrada por texto/voz/imagem, contexto compartilhado entre módulos, processamento de linguagem e sugestões revisáveis. O empreendedor confirma registros e decisões. Nenhuma demonstração local deve fingir chamada a um modelo real.

O botão final de Android deve apontar para uma URL de Play Store comprovada ou APK realmente existente e identificado. Se não houver distribuição disponível, a seção pode existir com informação clara de indisponibilidade; nunca simular um download ou dirigir para uma busca genérica.

## Movimento, acessibilidade e acabamento

- Scroll controla `currentTime`, sem autoplay e sem loop de fundo. Ao parar de rolar, o filme para; ao voltar, retrocede.
- Se texto ocupar área próxima ao filme, mantê-lo em uma coluna dedicada. Não esconder a demonstração atrás de frases gigantes.
- Transição editorial entre azul e papel; uma única coreografia principal. Sem fade-up repetido em todas as seções.
- Mobile: texto e filme empilhados, objeto principal não cortado. Controles com no mínimo 44 px, navegação por teclado, foco visível.
- Movimento reduzido: quadros estáticos e todos os textos em fluxo normal, sem rolagem artificialmente longa.
- Validar no navegador 390 px e 1440 px; três filmes em avanço e reversão, ausência de overflow, menu, links e download verdadeiro.

## Revisão contra o risco de aparência genérica

A primeira proposta poderia ser apenas um site escuro com tipografia grande. Foi refinada para trazer materiais e decisões da rotina do pequeno empreendedor: uma despesa, um plano e um produto divulgado. O azul escuro não é decoração; deriva da marca. A narrativa não depende de cartões de benefícios ou de frases abstratas. O acabamento profissional virá da continuidade, da escala dos filmes, de enquadramentos consistentes e da clareza sobre o que a FinxiIT entrega.
