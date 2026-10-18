# Validação do redesign

A revisão foi feita pelo Chrome DevTools MCP 1.10.1, com Chrome isolado e sem usar o perfil pessoal.

- Rolagem de 5%, 50% e 95% → filme em 0,4s, 4s e 7,6s.
- Retorno para 25% → filme em 2s. Após 1,2s sem rolar, permanece em 2s.
- Vídeo pausado, autoplay false e posição CSS static.
- Sem transbordamento horizontal em 320, 390, 820 e 1440px.
- Tabs shadcn navegáveis pelas setas; conversa local, FAQ e menu verificados.
- Movimento reduzido: zero elementos video, alternativa estática e três capítulos visíveis.
- Lighthouse: acessibilidade 100, boas práticas 100, SEO 100. Não foi medida pontuação de performance.
- Sem erros no console na execução verificada.

Evidências: `qa/redesign-review.json`, `qa/redesign-reduced.json`, capturas `qa/redesign-*.png`, `qa/lighthouse-redesign/`.

A avaliação automatizada não substitui revisão visual nem testes em aparelhos físicos. A composição de produto é um estudo visual baseado no filme do Flow; a imagem original do aplicativo é preservada separadamente.
