> Histórico da versão anterior. A direção e a validação atuais estão em 09-redesign-scroll.md e 10-validacao-redesign.md.

# Validação final

Ferramenta: Chrome DevTools MCP 1.10.1, cliente MCP oficial por stdio, Chrome em perfil temporário. Resultados brutos em design/qa/.

## Confirmado

- Hero: controle de pausa retornou paused=true e rótulo Reproduzir vídeo de fundo.
- Abas: ArrowRight selecionou Estratégia; conversa exibiu o exemplo correspondente.
- FAQ: expansão com aria-expanded=true.
- Menu mobile: abriu com true e fechou com Escape retornando false.
- Filme escuro: 1,2 s → 6 s → 2,8 s, com duração 8 s e readyState 4.
- Movimento reduzido: preferência emulada, zero vídeos e seção estática ativa.
- Viewports reais: 320, 390, 820 e 1440 px; sem transbordamento horizontal após a correção final.
- Fontes e imagens carregadas; nenhum erro de console capturado.
- Lighthouse local: acessibilidade 100, boas práticas 100, SEO 100 e agentic browsing 100. Total: 59 auditorias aprovadas, zero reprovadas na execução registrada.

## Revisão visual

Capturas desktop, mobile e narrativa abertas e inspecionadas. Ajustados o respiro, a fonte local, os títulos, o posicionamento do telefone, o recorte do filme e o contraste do texto sobre o vídeo.

Web Design Guidelines aplicada aos arquivos src/App.jsx, src/components/HeroFilm.jsx, src/components/ScrollStory.jsx e estilos. Correções: ícones decorativos ocultos, pausa explícita para loop, carregamento adiado abaixo da dobra, foco visível, dimensões de imagem e respeito a movimento reduzido.

## Limites

Lighthouse é uma auditoria automática local, sem garantia de acessibilidade total. Não houve teste em iPhone físico, navegador Safari, servidor público ou rede móvel real. Nenhuma nota de performance foi obtida: o comando lighthouse_audit deste MCP não mede essa categoria. Os relatórios de primeiras passagens são históricos; responsive-final.json registra a correção posterior de tablet.

