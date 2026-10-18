# Filmes com capturas do aplicativo — 02/10/2026

## Integrados

- Abertura: `finxi-app-home.mp4`, com `inicio.jpg`.
- Financeiro: `finxi-app-reports.mp4`, com `relatorios.jpg`.
- Estratégia: `finxi-app-assistant.mp4`, com `assistente-ia.jpg`.

Os arquivos do Flow são preservados em `referência/videos/revisao-2026-10-02/`. O usuário forneceu as exportações de Relatórios e Assistente depois do bloqueio de download do navegador. As capturas originais foram recompostas nos visores por rastreamento planar para preservar dados, textos, gráfico e botões.

Scripts reproduzíveis: `tooling/composite-home-reference.py` e `tooling/composite-reference-modules.py`. Relatórios: 192 frames, 24 fps, mínimo de 37 pontos de suporte no rastreamento. Assistente: 192 frames, 24 fps, mínimo de 389 pontos. Filmes dos módulos em 1920×1080, H.264, sem áudio, quadros-chave a cada seis frames e faststart.

Os textos sincronizados foram ajustados à tela exibida: entradas, evolução e detalhes em Financeiro; apresentação, sugestões e pergunta em Estratégia. FAQ descreve quais filmes usam capturas do app.

## Verificação

Build Vite concluído. Script `tooling/qa-new-app-films.mjs` verifica explicitamente os nomes novos dos arquivos, avanço a 75%, retorno a 25%, pausa quando não há rolagem e ausência de autoplay. Capturas em desktop 1440×1000 e celular 390×844; relatório em `qa/new-app-film-review.json`.

Folhas de contato e métricas em `qa/finxi-app-reports-*` e `qa/finxi-app-assistant-*`. Os filmes são apresentações com capturas recompostas, não gravações de interações reais.

## Pendente

O arquivo `flow-11-connected-original.mp4` (dois celulares, Início + IA) ainda não foi fornecido. O módulo Marketing permanece com `finxi-planejamento.mp4`. Não foi tentado contornar o bloqueio de segurança do navegador para obtê-lo.
