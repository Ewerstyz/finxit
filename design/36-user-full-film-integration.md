# Filme completo fornecido: integração na abertura

Fonte enviada pelo usuário: `C:\Users\Prisciani\Downloads\FinxiIT_—_Filme_completo_—_20261003021816.mp4`. O original foi copiado, sem alterações, para `referência/videos/filme-completo-2026-10-03/finxi-flow-original.mp4`.

O arquivo efetivamente exportado contém 420 frames em 1280×720, cerca de 17,5 segundos. Sua sequência é logo → tela do app → pessoas → Brasil. Ele substitui a composição local anterior somente na abertura; o conteúdo institucional, o mapa interativo e os três vídeos de demonstração do aplicativo permanecem.

Correção local autorizada: dois blends curtos com easing, sobrepondo exclusivamente frames das cenas já existentes. Janelas: 4,917–5,583 s e 10,292–10,792 s. Na primeira passagem, a escala e o centro do celular da cena seguinte são alinhados ao enquadramento anterior, retornando suavemente à posição original no fim do blend. Isso reduz os contornos duplicados durante a sobreposição. Fora dessas janelas, os frames originais decodificados seguem para o encoder sem transformação. Não foram criados objetos, logotipos, interfaces ou novas cenas.

Distribuição: `public/media/finxi-flow-full-film-v1.mp4`, H.264, 24 fps, keyframe a cada seis frames, faststart, sem faixa de áudio para o uso por scroll. Mantém 420 frames e 17,5 segundos. O original com áudio continua na pasta de referências. A cópia web pesa aproximadamente 6,56 MB.

Nos dois pontos de corte, a maior diferença média de pixels entre frames caiu em 47,5% e 76,5%, respectivamente. Essa medida verifica redução do salto, sem afirmar que todas as diferenças de enquadramento desaparecem. Relatório: `qa/user-full-film-installed.json`. Revisão visual: `qa/user-full-film-edited-contact.jpg`.

Estado ativo: `src/cinematic/opening-media.json`. O componente `ZoomJourney` continua controlando `currentTime` nos dois sentidos da rolagem, com o vídeo pausado e os textos em Motion. Pôsteres novos foram extraídos do filme; a referência original da tela do app continua disponível na alternativa estática.

Reprodução da preparação: `tooling/inspect-user-film.py` e `tooling/install-user-film.py`. Esta etapa usou exclusivamente o MP4 local fornecido pelo usuário; nenhum download automatizado do Flow e nenhuma nova geração de IA foram necessários.

Build de produção aprovado. Chrome DevTools MCP verificou quatro tamanhos de tela, a busca do filme nos dois sentidos, duração e resolução da mídia ativa, alternativas estáticas para movimento reduzido e telas baixas, ausência de overflow e erros de console, mapa e demonstrações existentes. Após o alinhamento final do celular, a revisão móvel foi repetida em 390×844 e 320×740 e aprovada. Os enquadramentos do app, das pessoas e do Brasil também foram inspecionados visualmente. Relatórios: `qa/brand-opening.json`, `qa/brand-opening-reduced.json` e `qa/brand-opening-mobile.json`.
