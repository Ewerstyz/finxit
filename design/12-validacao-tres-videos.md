# Validação — três filmes

Build Vite concluído. Chrome DevTools MCP confirmou três seções com arquivos distintos e três miniaturas no índice.

Para cada filme de 8 segundos: 75% da rolagem corresponde a 6s; retornar a 25% corresponde a 2s. Todos permanecem pausados quando a página para, com autoplay desativado. Os arquivos têm hashes SHA-256 distintos.

Sem transbordamento horizontal em 1440, 820, 390 e 320px. O enquadramento mobile dos dois filmes novos foi ajustado após revisão visual. Captura final: qa/three-films-mobile-scroll-final.png.

Abas shadcn: navegação por setas e conteúdo detalhado do módulo Estratégia confirmados. FAQ sobre o status dos vídeos abre corretamente. Movimento reduzido: zero elementos de vídeo, três cenas estáticas e nove etapas explicativas visíveis, sem seções de rolagem prolongada.

A revisão final em produção não encontrou erros de console. Evidências: qa/three-films-review.json, qa/three-films-reduced.json e qa/three-films-final.json.

A tentativa adicional de Lighthouse desta ampliação excedeu o tempo da ferramenta; não há nova pontuação Lighthouse. Pontuações em documentos anteriores são históricas e não devem ser atribuídas a esta revisão.

Revisão editorial baseada em referência/projeto-texto.txt. Recursos planejados estão identificados; os filmes 02 e 03 são simulações conceituais, não gravações do app implementado. O site local permanece sem backend de IA, cadastro ou publicação automática.
