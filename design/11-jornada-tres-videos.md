# Três filmes e conteúdo aprofundado

A página tem três arquivos de vídeo distintos, cada um com 8 segundos e controle independente por rolagem. Os arquivos não são repetições ou recortes do mesmo filme.

| Capítulo | Filme no site | Conteúdo |
|---|---|---|
| 01 — Entenda o caixa | `public/media/finxi-product.mp4` | Interface original em uma tomada de produto, com saldo, ações rápidas e visão geral. |
| 02 — Traga o dia a dia para o app | `public/media/finxi-registros.mp4` | Simulação de enquadramento de um comprovante, leitura e conferência de dados. |
| 03 — Conecte planejamento e divulgação | `public/media/finxi-planejamento.mp4` | Simulação de preparação de conteúdo de produto, revisão de um rascunho e organização da ação. |

Os três foram gerados no Google Flow. O primeiro recebeu composição local da interface original. Os outros dois mostram fluxos conceituais de recursos previstos, e essa condição aparece nas legendas e no FAQ.

## Conteúdo novo

- Diagnóstico por conversa: negócio, catálogo, região, processo de trabalho e desafio atual.
- Registro por voz, leitura de comprovantes e teclado, com exemplo de despesa de R$ 50 em embalagens.
- Diferença entre saldo de registros pagos, resultado do negócio e projeção de caixa.
- Módulo financeiro: entradas e saídas, histórico, vencimentos e alertas planejados.
- Módulo estratégico: objetivos, plano de negócios, viabilidade e posicionamento; orientação tributária apenas como escopo previsto, sem regras ou limites legais específicos.
- Módulo de mercado: hipóteses de público local, campanhas, roteiros e legendas; revisão humana e sem publicação automática.
- Exemplo de integração: uma compra de embalagens contextualiza financeiro, plano e divulgação.
- Diretrizes do app: linguagem acessível, leitura em ambientes de trabalho e foco em aparelhos de entrada.

Fonte editorial: `referência/projeto-texto.txt`, extraído do documento fornecido. O documento descreve um plano de desenvolvimento, não uma comprovação de funcionalidades disponíveis.

## Implementação

`src/episodes.js` define cada filme e seus três estágios explicativos. `ScrollStory.jsx` recebe um episódio e sincroniza o tempo com a rolagem. `AppGuide.jsx` reúne o conteúdo aprofundado. `App.jsx` mantém as abas e o FAQ shadcn/ui.

O índice inicial mostra miniaturas diferentes e leva diretamente a cada capítulo. Cada filme permite pular a apresentação. Movimento reduzido, economia de dados ou falha da mídia produzem uma versão estática com todos os textos do capítulo.
