# Movimento — versão atual

A apresentação é um filme de produto em primeiro plano. O elemento video faz parte do layout, sem posição absoluta, camada de texto sobre o visor, autoplay ou loop.

A seção tem 420svh no desktop e 360svh no celular. O palco ocupa 100svh e fica sticky. Motion useScroll converte a posição da seção para progresso entre 0 e 1; esse progresso define currentTime de um vídeo de 8 segundos. Ao parar a página o tempo não avança; ao subir, recua. O mecanismo aguarda seeked e aplica o último alvo para evitar perder movimentos rápidos.

O arquivo H.264 tem quadros-chave a cada 6 frames, 24fps e faststart. Só é carregado perto da seção. Movimento reduzido, economia de dados ou falha da mídia exibem imagem estática e os três capítulos sem prolongar a página.

Controles: barra acessível por teclado, botões Caixa / Rotina / Visão completa e link Pular apresentação. A rolagem nativa não é interceptada. Legenda descreve o filme como estudo visual; a interface original aparece também em seção própria.

O material é gerado no Google Flow e recebe composição da tela original na pós-produção. Os filmes abstratos da versão anterior não participam do site atual.
