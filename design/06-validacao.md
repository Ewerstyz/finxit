# Validação da primeira versão

Data: 28/09/2026.

- Instalação concluída com pnpm 11.19.0; permissão de script limitada ao esbuild em `pnpm-workspace.yaml`.
- `pnpm run build`: concluído, 1988 módulos processados. Artefatos em `dist/`.
- JavaScript principal: aproximadamente 405 kB, 130 kB gzip. CSS: aproximadamente 22 kB, 6 kB gzip.
- Navegador integrado: página renderizada; nenhuma mensagem de console de nível error na inspeção realizada.
- Layout inspecionado em viewport desktop de 1440×1000 e mobile de 390×844. Transbordamento decorativo corrigido; largura do documento não excedeu a viewport após o ajuste.
- Imagens da página carregadas e com dimensões naturais válidas.
- Aba Estratégia, resposta demonstrativa, menu mobile por teclado, fechamento por Escape e expansão do FAQ verificados.
- Rolagem alterou o telefone de −9° / 55 px para +9° / −35 px e avançou o destaque da primeira à terceira etapa.
- Capturas reais salvas em `referência/inspirações/03-site-implementado-desktop.png` e `04-site-implementado-mobile.png`. Não confundir com as duas imagens geradas.

Limites: não houve ensaio em dispositivo físico, teste completo de leitor de tela, auditoria Lighthouse ou medição de vídeo. A preferência de movimento reduzido está implementada, mas não foi emulada durante esta verificação. O vídeo final, a autenticação 21st MCP e a conexão Chrome DevTools MCP continuam pendentes conforme os demais documentos.
