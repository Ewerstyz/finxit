# Filme contínuo FinxiIT

Cena completa criada no Google Flow em 03/10/2026:

https://flow.google.com/project/ef4ac005-71fd-4bf1-8877-2e27df10cf8f/scene/8bddfaec-cdf6-4ca6-918a-b76a8d536f42

Nome: **FinxiIT — Filme completo — Marca, app, pessoas e Brasil**.

A linha do tempo do Flow apresenta 26 s: marca/produto (10 s), produto/pessoas (8 s) e expansão pessoas/Brasil (8 s). O segundo clipe começa no frame final do primeiro. O terceiro foi produzido na própria cena usando **Expandir (Veo 3.1 - Lite)**. O prompt exato é o terceiro registro de `design/flow-opening-prompts.json`. A duração do arquivo exportado deve ser medida, pois o Flow pode descontar a sobreposição entre clipes.

Direção preservada: objetos à direita, texto à esquerda, logo original como entrada e Brasil somente no desfecho. A revisão do editor confirmou os três clipes e o Brasil no frame 24:16. Comprovação: `design/qa/flow-complete-opening.png`.

## Movimento no site

O tempo do vídeo continua vinculado à rolagem, incluindo o retorno. As cópias agora desaparecem suavemente antes da troca, saem 14 px para cima e entram com deslocamento de 22 px; os detalhes acompanham com um atraso espacial curto. As curvas suaves dependem da posição da rolagem, sem animação independente que avance o filme. Navegação por capítulos, alternativa para movimento reduzido e mapa inferior permanecem.

## Integração pendente

A cena completa está pronta no Flow, **ainda não instalada no site**. A revisão automática havia rejeitado o download do clipe inicial por repetir uma exportação bloqueada. Não foi tentada a exportação da cena combinada para contornar essa rejeição. O site conserva temporariamente o arquivo local já permitido de pessoas/Brasil, com logo e app estáticos no início.

O usuário precisa exportar manualmente a cena completa por **Transferir cena**, na aba aberta, e informar o caminho do MP4 local. O instalador já aceita um único arquivo, valida duração mínima de 22 s, prepara H.264 com quadros-chave frequentes e pôsteres antes de ativar o novo manifesto:

```powershell
& 'C:/Users/Prisciani/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe' tooling/prepare-flow-opening.py --master 'CAMINHO-LOCAL-DO-FILME-COMPLETO.mp4'
node node_modules/vite/bin/vite.js build
node tooling/qa-brand-opening.mjs
node tooling/qa-brand-opening.mjs --reduced
```

A folha de contato gerada deve ser revisada antes da entrega. O processamento completo não pode ser considerado testado enquanto não existir esse arquivo local. A revisão atual testa o vídeo parcial disponível e a coreografia nova.

Validação desta revisão: build Vite concluído. Chrome DevTools MCP aprovou desktop 1440×1000, tablet 768×1024 e celulares 390×844 e 320×740; a cópia entra e sai com opacidade intermediária e retorna ao mesmo estado ao inverter a rolagem. O vídeo local continua pausado e busca o tempo correto; mapa inferior e demonstração do app conservados. A versão com movimento reduzido e a tela baixa também passaram. Sintaxe do instalador Python validada; sua conversão do filme completo aguarda o MP4. Relatórios: `design/qa/brand-opening.json` e `design/qa/brand-opening-reduced.json`.
