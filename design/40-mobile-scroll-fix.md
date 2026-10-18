# Rolagem dos vídeos no celular

O defeito foi reproduzido no Chrome DevTools MCP com viewport móvel, toque e tela de 320 × 568: a abertura e as demonstrações entravam em modo estático. A condição de altura também atingia celulares de 360 × 640 e 375 × 667 e dispositivos em paisagem.

A abertura e Organize → Entenda → Converse agora conservam o controle dos vídeos pela rolagem independentemente da altura. As preferências explícitas de movimento reduzido e economia de dados continuam respeitadas. Altura mínima, tipografia, margens e controles foram ajustados para manter o conteúdo dentro do palco em telas pequenas e em paisagem.

As duas apresentações compartilham `src/finxi/useScrollVideo.js`. O controle espera os metadados, atualiza o tempo ao terminar a busca anterior e revela o filme depois de ter um quadro disponível. Se o navegador adiar a decodificação, um gesto sobre a página pode iniciar e pausar imediatamente o vídeo visível para liberar seus quadros. Os filmes ficam sem áudio, inline e pausados; não ganham reprodução contínua ou loop.

Política de mídia consultada: [WebKit: New video policies for iOS](https://webkit.org/blog/6784/new-video-policies-for-ios/) e [Apple: Delivering video content for Safari](https://developer.apple.com/documentation/webkit/delivering-video-content-for-safari). A emulação do Chrome não equivale a testar um iPhone físico ou o Safari real.

## Validação

`node tooling/qa-mobile-scroll.mjs` verifica abertura e as três demonstrações em 320 × 568, 360 × 640, 375 × 667, 390 × 844, 844 × 390, 1280 × 600 e 1440 × 1000. Nas telas de celular, a emulação inclui modo móvel e toque. Confere tempo, pausa, quadros realmente decodificados, avanço, retorno, capítulos, ausência de cortes nos controles e continuidade para Recursos.

`node tooling/qa-mobile-scroll.mjs --reduced` verifica que a preferência de movimento reduzido continua oferecendo a apresentação estática. Os testes anteriores foram atualizados para não exigir o comportamento incorreto em telas baixas. A compilação de produção usa `pnpm build`.

Os relatórios, a reprodução da falha anterior e as capturas ficam em `design/qa/`, ignorada pelo Git. Não há mudança nos vídeos, nas imagens do aplicativo ou no conteúdo institucional.
