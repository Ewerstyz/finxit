# Filmes do Flow para o plano de negócios

Projeto criado sem alterar projetos anteriores: [FinxiIT — Plano de negócios · Outubro 2026](https://flow.google.com/project/e684319d-2f43-4904-9395-3869bb451e83).

Configuração observada: vídeo, ingredientes, 16:9, 720p, 8 segundos, uma saída, Omni 1.1 Flash. A interface indicava 12 créditos por geração. Quatro comandos foram enviados, sem repetir gerações, comprar créditos ou usar Veo Quality.

| Filme    | Referência aplicada | Resultado do Flow                                                                                                           | Arquivo web                          |
| -------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Organize | app-inicio.jpg      | [resultado](https://flow.google.com/project/e684319d-2f43-4904-9395-3869bb451e83/edit/8f1e0de7-cd1d-41e9-86f2-d4716a6640b0) | public/media/finxi-plan-organize.mp4 |
| Entenda  | app-relatorios.jpg  | [resultado](https://flow.google.com/project/e684319d-2f43-4904-9395-3869bb451e83/edit/e4988ef4-d7e2-4f7a-a19e-0b1f52614a6e) | public/media/finxi-plan-entenda.mp4  |
| Converse | app-assistente.jpg  | [resultado](https://flow.google.com/project/e684319d-2f43-4904-9395-3869bb451e83/edit/d31541bb-5b83-4fba-b2ff-54c7ee414370) | public/media/finxi-plan-converse.mp4 |

Direção comum dos prompts: um aparelho Android genérico e sem marca, frontal desde o primeiro frame, fundo tecnológico cinza claro, luz azul discreta, aproximação axial lenta e repouso final. Proibições explícitas: giros, interfaces ou valores inventados, respostas digitadas, bancos, lucro, textos flutuantes, lojas, cortes, flashes, fala e música. O arquivo real da tela foi selecionado como Ingrediente antes de cada um dos três envios, e a interface mostrou a miniatura anexada. Os prompts completos permanecem nos resultados do projeto Flow.

A primeira tentativa foi um filme de marca. A imagem havia sido carregada no projeto, mas, por erro de configuração, não estava aplicada como ingrediente no envio. O resultado alterou o símbolo e foi rejeitado na revisão visual. Não foi instalado no site, não foi baixado nem gerado novamente. A abertura completa anteriormente aprovada pelo usuário foi preservada. O usuário foi informado do descarte durante o trabalho.

## Download e preparação

Os três resultados novos foram baixados pelo menu oficial Transferir conteúdo multimédia → 720p Tamanho original. O Flow confirmou “O seu vídeo foi transferido!”. Nenhum endpoint privado, URL de tráfego, cookie ou token foi usado. Não se trata de nova tentativa de exportar a mídia bloqueada numa tarefa anterior; são resultados novos do projeto desta revisão.

Originais preservados em `referência/videos/plano-2026-10-18/`. Cada um possui 192 frames, 1280×720, 24 fps e 8 s. Hashes e saídas em `qa/plan-films.json`.

Como a geração de vídeo pode alterar letras pequenas mesmo com a referência correta, a preparação local recompôs cada captura original sobre a área da tela do aparelho já existente. A moldura física e a câmera foram preservadas, com pequena área neutra no topo para acomodar o recorte da câmera. Nenhuma interface nova ou ação de uso foi criada. O movimento do estúdio continua vindo do Flow. O acompanhamento da moldura foi verificado nos 192 frames; falhas de detecção interrompem o processamento. Contatos antes/depois em `qa/plan-film-*.jpg`. Não houve remoção de marca-d'água.

Script reproduzível: `tooling/prepare-plan-films.py --install`. Saídas H.264 com keyframes a cada seis frames e faststart, sem áudio na cópia web para rolagem. Os originais permanecem intactos. O usuário pode ampliar as capturas reais pela interface do site. Os filmes são identificados como apresentação de protótipo, com dados demonstrativos, e não como gravação de uso real.
