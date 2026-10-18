# Validação — versão inspirada no Hera

Data: 29/09/2026. Prévia de produção: http://127.0.0.1:4173/.

## Resultado

- Build final aprovado (Vite): JS 447,21 kB, gzip 142,96 kB; CSS 41,77 kB, gzip 12,37 kB.
- Três módulos, três problemas e três soluções; nenhuma âncora quebrada.
- Três vídeos distintos, duração de 8 segundos. Em todos: scroll de 75% → 6 s; retorno a 25% → 2 s; paused=true, autoplay=false e tempo estacionário quando a rolagem para.
- Sem overflow horizontal em 320, 390, 820 e 1440 px.
- Teclado no seletor inicial: ArrowRight seleciona Estratégia e altera o destino para #estrategia.
- Accordion estratégico abre e mostra o conteúdo do diagnóstico.
- Teclado na demonstração conectada: Marketing mostra “Rever a oferta antes de divulgar”.
- Menu móvel abre por Enter; Escape fecha e devolve o foco ao botão.
- Movimento reduzido: zero elementos de vídeo, três cenas estáticas, nove textos de capítulos. Alturas compactas de 858–880 px no viewport testado.
- Console sem erros nos testes.
- Inspeção visual do hero, dos módulos e do player móvel. Segunda captura final após ajustes de texto/tokens.

## Evidências

- `qa/hera-review.json`: primeira bateria via Chrome DevTools MCP.
- `qa/hera-reduced.json`: movimento reduzido.
- `qa/hera-final.json`: controles por teclado e verificação final. Substitui os resultados inconclusivos de cliques sintéticos no menu e na tab de conexão da primeira bateria.
- `qa/hera-final.png`: desktop final, 1440×1240.
- `qa/hera-mobile-final.png`: celular final, 390×844.
- `qa/hera-financeiro.png`, `qa/hera-estrategia.png`, `qa/hera-marketing.png`: problema e solução por módulo.
- `qa/hera-mobile-film.png`: player por scroll no celular; captura anterior ao ajuste final do título do capítulo.

## Revisão de interface

Frontend Design aplicado na direção e na crítica das capturas. Web Design Guidelines consultado na fonte oficial em 29/09/2026. Foram conferidos controles semânticos, foco visível, descrições dos filmes, dimensões de imagens, hierarquia de títulos, movimento reduzido, responsividade e ausência de autoplay. Não há uma nova pontuação Lighthouse nesta revisão.

## Limites

Os exemplos do diagnóstico e marketing são locais e ilustrativos. A captura de comprovante no segundo filme representa a base de dados do planejamento, não a interface do módulo estratégico. A disponibilidade dos recursos previstos no documento não foi confirmada. Magic MCP/21st não estava disponível.
