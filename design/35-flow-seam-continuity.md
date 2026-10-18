# Continuidade entre cenas no Google Flow

Pedido de 03/10/2026: editar o vídeo aberto usando Omni, corrigindo somente as junções; não acrescentar conteúdo. Veo Quality está proibido por preferência explícita do usuário.

Montagem: https://flow.google.com/project/ef4ac005-71fd-4bf1-8877-2e27df10cf8f/scene/8bddfaec-cdf6-4ca6-918a-b76a8d536f42

Estado observado no início: três clipes, duração total de 18 s e 12 frames; transições da tela do app para pessoas e de pessoas para Brasil. A composição da câmera muda nas junções.

Referências salvas dentro do próprio projeto, sem exportar os vídeos:

- `FinxiIT — referência junção pessoas para Brasil — 10s09`, recurso `178e5b97-16ff-4876-85d6-9962685eb397`.
- `FinxiIT — referência junção app para pessoas — 5s05`, recurso `a3b1336c-840a-4c51-9192-2801acc260e6`.

Primeira correção submetida ao Omni 1.1 Flash no terceiro clipe com o frame das pessoas anexado. Prompt: `flow-seam-people-brazil-omni.txt`. A alteração se limita ao início do clipe; exige preservar o restante, o mapa, a duração e o final, sem novos efeitos, objetos, textos ou áudio.

Essa primeira tentativa retornou uma imagem estática e não foi adotada. A versão anterior continuou na montagem.

A segunda tentativa editou diretamente o vídeo, sem ingrediente de imagem adicional: `flow-seam-people-brazil-omni-video.txt`. O resultado mantém oito segundos, o Brasil e a sequência original; o início passou a um plano mais próximo das pessoas. Ainda houve diferenças entre os frames imediatamente antes e depois da junção.

Correção complementar enviada para o clipe intermediário: `flow-seam-app-people-omni-video.txt`. O pedido restringe alterações aos primeiros e últimos 0,6 segundos e exige preservar conteúdo e duração. Seu começo precisa combinar com o aparelho do clipe anterior; seu final, com o enquadramento das mesmas pessoas na versão corrigida do terceiro clipe.

O resultado intermediário foi concluído e manteve a duração total de 18,5 segundos e as três cenas. O início reduziu o aparecimento imediato das linhas no fundo, mas manteve pequena diferença de escala no celular.

Uma tentativa fina de escala (`flow-seam-app-people-omni-fine.txt`) deslocou o celular para o centro. Ela foi rejeitada visualmente; o histórico foi usado para restaurar a revisão anterior, que mantém o celular à direita.

Último ajuste do terceiro clipe: `flow-seam-people-brazil-omni-fine.txt`, limitado ao enquadramento dos primeiros 0,8 segundos e exigindo manter todo o restante. A renderização permaneceu em 99% e depois indicou `Falhou`. A revisão anterior válida permaneceu na montagem.

Conferência final após reabrir a cena: três clipes presentes, 18,5 segundos, cena do Brasil utilizável. O clipe intermediário usa a revisão de continuidade, mantendo o celular à direita; a tentativa fina que o centralizou não está ativa. O terceiro clipe mantém a revisão válida que aproxima as pessoas. A aba ficou aberta em 10 s e 13 frames, na junção das pessoas com o Brasil. Evidência: `qa/flow-seam-continuity-final.png`.

Limitação: a continuidade melhorou, mas ainda há diferença residual de escala/posição nas junções. Não considerar as emendas imperceptíveis nem a revisão final perfeita. O último ajuste mais preciso foi bloqueado pela falha de renderização do Flow.

Nenhum download foi solicitado e nenhum arquivo de vídeo do site foi alterado neste pedido. Todas as operações de geração deste pedido usaram Omni 1.1 Flash; Veo Quality não foi usado.
