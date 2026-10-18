# Redesign integral — FinxiIT

## Decisões

O site se apresenta primeiro pela realidade do app. A abertura tem tipografia ampla, fundo branco e uma captura autêntica do Início. O azul original conecta as interfaces ao sistema visual. A jornada concentra os três filmes em um único palco para reduzir a repetição. Textos e telas explicam o Financeiro e a Estratégia; uma imagem editorial situa a divulgação no contexto de um pequeno negócio.

O visitante conhece o produto, explora três áreas, entende a assistência, vê os passos de uso e depois encontra a apresentação da empresa. Missão e visão usam uma composição editorial; os valores têm uma faixa de quatro colunas. O fechamento azul identifica o Android e oferece a ação de download.

Os detalhes técnicos e as limitações ficam em itens expansíveis. A seção de IA tem três exemplos com abas acessíveis: entender o caixa, planejar uma ação e criar uma mensagem. São exemplos escritos para a apresentação, identificados como ilustrativos.

## Imagem produzida

- Ferramenta: Image Generation nativo, sem CLI ou chave API.
- Uso: imagem editorial da seção Marketing.
- Original: `referência/imagens/empreendedora-editorial.png`.
- Final: `public/assets/empreendedora-editorial.jpg`, 1536 × 1024 px, JPEG otimizado, aproximadamente 299 KB.
- Revisão: cena natural, paleta com azul, telefone sem UI inventada, ausência de logo e textos. Não é uma cliente real.

Prompt enviado:

> Use case: photorealistic-natural. Asset type: wide editorial photography for FinxiIT, an Android financial and AI assistant for Brazilian small businesses. Primary request: candid professional photograph of a Brazilian woman entrepreneur in her small independent ceramics and homeware shop, calmly reviewing a notebook and holding an Android phone after serving a customer. She is the business owner, not a corporate executive. Scene: contemporary modest shop, shelves of handcrafted ceramic cups, afternoon daylight, cobalt blue apron, blue accents and white natural materials. Composition: landscape 3:2, medium-wide environmental portrait, subject slightly right of center, authentic real textures, natural gesture, editorial magazine photography, calm confident mood. Phone screen angled away, no visible interface. No words, logos, watermark, fake statistics or stock-photo thumbs-up. Avoid exaggerated smile, financial holograms, floating UI and luxury office.

## Mídias e preservação

A apresentação usa os três exports recentes do Flow já disponíveis no projeto: Início, Relatórios e Assistente. Cada trecho corresponde a um terço do progresso da jornada de 340svh. Nenhuma nova geração ou download do Flow foi realizado nesta rodada de redesign. Os arquivos mantêm as telas fornecidas pelo usuário, recompostas anteriormente no visor. Não reutilizamos filmes anteriores de marketing como se fossem novas telas.

Versão anterior preservada em `archive/site-before-redesign/`. Materiais originais continuam em `referência/`. A distribuição Android é configurada em `public/site-config.json`; nenhum APK de desenvolvimento foi publicado.

## Verificação

Build de produção com Vite. Chrome DevTools MCP executa verificação das larguras 1440, 768, 390 e 320 px, âncoras, imagens, console e progressão dos três filmes nos dois sentidos. Os filmes devem continuar pausados, sem autoplay e sem alteração de tempo com a página parada. Abas por teclado, detalhes expansíveis, menu com Escape e aviso de download são verificados separadamente. Uma execução com preferência de movimento reduzido confirma três etapas estáticas e nenhum vídeo. A alternativa para telas baixas é verificada em 844 × 390 px.

Os relatórios `redesign-review.json`, `redesign-interactions.json` e `redesign-reduced.json` registram os resultados efetivos. Uma falha inicial na asserção do accordion foi uma leitura antes de o React aplicar a atualização; o teste foi corrigido para aguardar a renderização. Não atribuímos métricas Lighthouse a esta entrega.

Resultado final: build aprovado; scroll dos três filmes nos dois sentidos aprovado nas quatro larguras; tempo estacionário e ausência de autoplay confirmados; âncoras existentes; 11 imagens sem falha; abas por teclado, accordion, Android e menu Escape aprovados; alternativa estática em movimento reduzido e tela baixa aprovada; console sem mensagens de erro. A captura inicial e seu teste com leitura prematura permanecem em `redesign-initial-review.json` para rastreabilidade.
