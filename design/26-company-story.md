# Roteiro institucional cinematográfico — FinxiIT

O pedido de 2 de outubro de 2026 muda o foco: a empresa vem antes do aplicativo. A referência “Mostar city” fornece o princípio de profundidade, aproximação e entrada de capítulos; suas imagens, geografia e copy não devem ser copiadas para a FinxiIT.

## Percurso narrativo

1. **Abertura humana:** “Grandes histórias. Pequenos negócios.” A primeira imagem deve mostrar um ambiente de trabalho brasileiro, não um celular gigante. A rolagem aproxima o visitante da história e das pessoas.
2. **Pessoas:** mostrar o trabalho que existe antes dos números: produção, comércio e serviços. Nenhum retrato deve ser apresentado como cliente real ou depoimento.
3. **Desafio:** a aproximação chega à rotina: informações dispersas, pouco tempo para planejar e comunicação adiada. A copy reconhece responsabilidade e trabalho; não trata empreendedores como incompetentes nem atribui todas as dificuldades a uma causa.
4. **Propósito:** FinxiIT aproxima gestão, planejamento e comunicação da realidade de quem empreende. A tecnologia apoia, a pessoa decide.
5. **Empresa:** missão, visão, valores e público com espaço editorial próprio. Não reduzir missão/visão a rótulos decorativos escondidos em um card.
6. **Contexto brasileiro:** problemas de gestão, vendas e atração de clientes relatados em mapeamento nacional. O app contribui para uma parte do desafio, sem promessa de solucionar sozinho problemas estruturais do país.
7. **Aplicativo:** apenas após o propósito, apresentar Financeiro, Estratégia com IA e Marketing. Cada parte tem problema, uso e consequência prática que não equivale a métrica de resultado. Os três filmes Flow existentes podem servir como demonstrações pontuais; não colocar um telefone como centro de cada seção institucional.
8. **Inteligência:** perfil + registros + objetivo da pergunta orientam coordenação de serviços externos. Expor os provedores em detalhes secundários e manter a explicação principal compreensível.
9. **Android:** CTA claro. O destino continua vazio conforme instrução do usuário; ao clicar deve informar a indisponibilidade, sem fingir download nem usar APK debug.

## Fonte primária de contexto brasileiro

[Sebrae / Agência Sebrae de Notícias — Gestão, crescimento das vendas e atração de clientes são as principais dificuldades das MPE do país](https://agenciasebrae.com.br/economia-e-politica/gestao-crescimento-das-vendas-e-atracao-de-clientes-sao-as-principais-dificuldades-das-micro-e-pequenas-empresas-do-pai/), publicado em 11/10/2023, acessado em 02/10/2026. O mapeamento Varejo Inteligente Conecta Brasil, Sebrae e CDL/BH, ouviu 1.334 MPE de todo o país. A apresentação usa somente uma paráfrase qualitativa de gestão, vendas e atração de clientes, explicitamente datada. Não transforma a amostra em censo nem descreve resultados de 2023 como nova pesquisa de 2026. A fonte sustenta o problema; não é prova de eficácia ou parceria da FinxiIT com o Sebrae.

## Base da empresa e do aplicativo

`src/content/company.js`, `src/redesign/content.js` e `design/16-content-evidence.md`, derivados do documento enviado e da inspeção anterior do projeto Android. Missão, visão e valores são formulações editoriais propostas com base no briefing; não houve descoberta de uma declaração institucional oficialmente registrada. Não inventar ano de fundação, equipe, CNPJ, clientes, faturamento, certificados ou impacto social medido.

Saldo pago é diferente de saldo bancário e lucro. Relatórios da referência mostram recebimentos; não afirmar que demonstram rentabilidade. A captura do assistente mostra sugestões de perguntas; os exemplos de resposta no site são ilustrativos. Marketing deve usar uma composição demonstrativa, sem fingir que existe uma captura de tela desse módulo.

A arquitetura usa Groq/NVIDIA para texto e planejamento, Gemini em pesquisa com fontes, Tavily em pesquisa/notícias e Cloudflare Workers AI em imagens. O app coordena serviços especializados, não comprova agentes autônomos independentes ou um modelo FinxiIT proprietário. Configuração, rede e disponibilidade podem variar. Histórico/registros ficam no aparelho, mas pedidos de IA usam provedores externos. Os nomes específicos dos modelos encontrados no código não devem virar garantia comercial de disponibilidade.

## Contrato da copy

`src/cinematic/content.js` exporta `cinematicContent` e o mesmo objeto como default. Campos principais: `brand`, `hero`, `chapters`, `company`, `audience`, `nationalContext`, `app.pillars`, `journey`, `ai`, `download`, `mediaNote`.

Os capítulos institucionais contêm `id`, `number`, `eyebrow`, `title`, `text`, `closing`. Os pilares do app contêm `id`, `number`, `name`, `title`, `problem`, `solution`, `features`, `question`, `example`, `outcome`, `note`, `film` e `screen`. `film` é apenas um descritor opcional, não determina o player nem promete captura de uma funcionalidade. `nationalContext.source` inclui URL e rótulo datado para atribuição na página.
