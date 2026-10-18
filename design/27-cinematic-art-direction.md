# FinxiIT: direção da apresentação cinematográfica

## Intenção

A pessoa entra no universo de quem empreende antes de ver uma interface. A cena memorável é uma aproximação: bairro brasileiro → pessoa por trás do negócio → mesa onde as decisões acontecem. A rolagem aproxima a câmera e muda o foco da narrativa. Depois disso, a página volta a uma leitura editorial calma. A FinxiIT aparece como empresa que aproxima tecnologia e pequenos negócios; o aplicativo entra como expressão prática dessa missão.

O prompt Mostar fornece a coreografia de profundidade e de aproximação. As paisagens, textos, números e a marca da referência não devem aparecer no resultado FinxiIT. Imagens geradas representam situações ilustrativas, não clientes ou instalações reais da empresa.

## Tokens sugeridos

| Token | Valor | Uso |
|---|---|---|
| Azul FinxiIT | `#0755ED` | Marca, controles e seção de síntese |
| Azul profundo | `#09234A` | Fundo da cena e contraste fotográfico |
| Papel | `#FFFFFF` | Superfície editorial principal |
| Nevoeiro | `#EEF3FA` | Trechos de leitura secundária |
| Tinta | `#17202B` | Texto principal |
| Texto discreto | `#566574` | Parágrafos e detalhes |

Não usar lavanda e gradientes em todas as seções; reservar o azul para decisões visuais claras. A fotografia já fornece variedade de cor.

**Tipografia:** Instrument Serif regular para títulos grandes e humanos; Manrope 400/500/650 para conteúdo e navegação. A marca mantém sua grafia e seu símbolo atuais. O título principal pode usar uma serif contemporânea sem imitar o nome gigante de Mostar. Entre 76 e 112 px no desktop; entre 46 e 62 px no celular. Texto entre 17 e 20 px, entrelinha 1,55–1,7, limite aproximado de 60 caracteres.

**Espaçamento:** unidade 8 px; seções de leitura com 88–128 px no desktop e 56–80 px no celular. Margem lateral `clamp(20px, 5vw, 80px)`. Conteúdo com largura máxima 1280 px. Raios pequenos em controles; o arredondamento do app pertence ao aparelho, não a todos os blocos da página.

## Estrutura e alinhamento

```text
┌────────────────── Cinema: bairro → pessoa → rotina ──────────────────┐
│ marca                              Empresa  Aplicativo  Android      │
│                                                                    │
│  Tecnologia próxima                                                │
│  de quem empreende.                  [bairro e ponto de chegada]    │
│                                                                    │
│  [rolagem: cenário aproxima, título abre espaço para o propósito]   │
└────────────────────────────────────────────────────────────────────┘
┌──────────────── Empresa: origem e propósito ────────────────────────┐
│ Por que existimos             texto concreto sobre rotina, tempo    │
│                              e decisões de pequenos negócios       │
│ Missão                       Visão                                 │
│ texto                        texto                                 │
│ Valores: quatro linhas amplas, com título e explicação              │
└────────────────────────────────────────────────────────────────────┘
┌──────────────────── Para quem a tecnologia existe ──────────────────┐
│ [fotografia de rotina]          autônomos, comércio, serviços        │
│                                problema comum e ajuda possível      │
└────────────────────────────────────────────────────────────────────┘
┌──────────────────── O aplicativo em ação ───────────────────────────┐
│ Financeiro        Planejamento com IA        Relatórios             │
│                                                                    │
│ problema → solução             [um palco de vídeo ligado ao scroll] │
│ explicação prática             [troca de filme por controle]        │
└────────────────────────────────────────────────────────────────────┘
┌──────────────────── Como a IA ajuda ────────────────────────────────┐
│ Contexto do negócio → assistência especializada → decisão da pessoa │
│ explicação direta + detalhes técnicos em conteúdo expansível        │
└────────────────────────────────────────────────────────────────────┘
┌────────────────────────── Android ──────────────────────────────────┐
│ Comece pela próxima decisão.       [Baixar para Android / destino]   │
└────────────────────────────────────────────────────────────────────┘
```

Títulos e texto seguem alinhamento à esquerda. Centralização é reservada à marca ou ao aparelho dentro do palco. Na abertura, manter o alvo da aproximação no lado oposto ao texto; nunca esconder o rosto com um título. Não adicionar numeração a missão/visão/valores: são dimensões da empresa, não etapas.

## Roteiro de movimento

1. **Bairro:** plano aberto, profundidade, FinxiIT e promessa legível. O movimento começa apenas quando a pessoa rola. Não adicionar balanço contínuo ao cenário.
2. **Empreendedora:** aproximação por escala e recorte, com transição suave para uma imagem de maior detalhe. A legenda conecta a economia do bairro à pessoa que registra, atende, compra e decide.
3. **Mesa:** aproximação final para a rotina real, com caderno, pedidos e trabalho. Entram a razão de existir e a passagem para a seção da empresa. O aplicativo ainda não ocupa a cena.

Tempo recomendado: rig entre 280 e 340 svh no desktop, entre 220 e 260 svh no celular. Cada quadro permanece legível por uma faixa de rolagem. Usar sobreposição curta, com textos sequenciais sem empilhamento. Uma imagem precisa durar mais que a própria transição; ampliar por ampliar não cria narrativa.

Se forem geradas três imagens, preservar pessoa, loja, câmera e paleta para que o deslocamento seja coerente. Cada origem de imagem deve focar o mesmo ponto de chegada. Uma fusão entre quadros evita fingir profundidade que não existe. Camadas transparentes são opcionais; uma foto única recortada repetidamente não deve se apresentar como uma cidade tridimensional completa.

O palco do app recebe os três filmes locais. Mostrar um filme por vez, com o tempo determinado pela rolagem. O nome do recurso, sua utilidade e o seletor permanecem disponíveis. Trocar o recurso deve atualizar filme, cartaz e texto juntos. Não fazer cada filme consumir mais uma tela cinematográfica extensa. Um controle explícito permite rever o progresso sem precisar percorrer a página inteira.

## Conteúdo que precisa ficar claro

- O problema tem escala brasileira, mas a ajuda começa no negócio individual. Não sugerir que a empresa já resolveu um problema nacional.
- A missão é tornar gestão e inteligência acessíveis. A visão é um futuro desejado, não uma posição de mercado conquistada.
- Clareza, autonomia, contexto e transparência podem aparecer como valores propostos no texto institucional. Não inventar anos de fundação, pessoas da equipe, endereços ou resultados.
- O saldo e as entradas são dados fictícios da demonstração. Entradas recebidas não equivalem a lucro.
- A IA usa o contexto do negócio e serviços especializados. O usuário decide. Não alegar modelo proprietário ou processamento totalmente local.
- O download Android fica preparado para o link que o usuário optou por inserir depois. O botão não deve disparar destino inexistente.

## Revisão do plano antes da implementação

Uma primeira solução de "empresa de tecnologia" poderia cair no padrão de três aparelhos sobre gradientes, cartões iguais e números grandes. O plano foi corrigido para abrir com o ambiente econômico e humano em que a empresa atua. A fotografia do bairro e o avanço até a mesa são específicos deste propósito; a interface aparece apenas depois que a razão da empresa fica compreensível.

O risco oposto é transformar a apresentação numa campanha de turismo ou numa história longa demais. Por isso, o movimento se concentra na abertura, a página passa a superfícies claras para o conteúdo institucional e os três filmes são agrupados num único lugar. Cortar efeitos repetidos entre seções.

## Verificação visual e de uso

- Testar 1440×1000, 768×1024, 390×844 e 320×740. Sem corte horizontal nem título sobre o rosto.
- Verificar começo, meio e fim de cada faixa; nenhuma legenda deve cair fora da viewport.
- Em movimento reduzido, mostrar as imagens e seus textos em sequência normal, sem sticky prolongado, zoom ou parallax. A narrativa precisa continuar completa.
- Em telas baixas, evitar conteúdo preso numa altura fixa maior que a viewport.
- Navegação com teclado, foco visível e rótulos claros nos controles. A cena visual não pode substituir o texto acessível.
- Vídeos pausados, sem autoplay e sem trilha inesperada. A posição temporal responde ao usuário.
- Medir contraste sobre as imagens nos três enquadramentos; usar sombra localizada atrás do texto, sem escurecer toda a fotografia inutilmente.
- Conferir imagens finais no navegador: o acerto do roteiro depende de recortes consistentes, não só de animações corretas.
