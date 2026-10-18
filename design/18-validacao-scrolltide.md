# Validação da apresentação FinxiIT

Página integrada com abertura cinematográfica, empresa, missão, visão, valores, jornada do aplicativo, três módulos apresentados por problema e solução, arquitetura de IA, FAQ e Android configurável. Direção atual: `15-scrolltide-direction.md`.

## Evidências

- Build Vite concluído com sucesso.
- Chrome DevTools MCP: `qa/scrolltide-review.json`, `qa/scrolltide-reduced.json` e `qa/scrolltide-hero-qa.json`.
- Financeiro, Estratégia e Marketing: scroll de 75% produz cerca de 6 s; retorno a 25% produz cerca de 2 s. Vídeos pausados, sem autoplay e sem progresso na ausência de rolagem.
- Abertura: início em 2 s para identificar o celular; 75% chega a 6,47 s e 25% retorna a 3,49 s.
- Nenhuma âncora interna quebrada ou erro de console encontrado na execução verificada.
- Sem overflow horizontal nas larguras de 320, 390, 820 e 1440 px; abertura também verificada com altura de 675 px.
- Abas da IA operáveis por teclado; Android apresenta aviso quando a URL está vazia.
- Movimento reduzido: nenhum elemento de vídeo, três apresentações estáticas com nove textos de capítulos e abertura compacta.
- Solução de cada módulo também disponível abaixo do filme no celular, evitando perda de conteúdo no palco compacto.

Capturas reais do navegador em `qa/scrolltide-*.png`. Não foi executada nova pontuação Lighthouse. Estes testes não substituem validação em aparelhos físicos ou na hospedagem final.

## Conteúdo e mídia

Quatro filmes distintos gerados pelo Google Flow, incluindo duas novas cenas de produto e estratégia. Cena financeira com composição da captura original. Demais cenas explicitamente conceituais. Fontes de conteúdo e distinções entre proposta e implementação: `16-content-evidence.md`.

Missão, visão e valores são propostas editoriais com base nas referências. O endereço Android fica vazio conforme decisão do usuário; configure `public/site-config.json`. Nenhum APK local foi distribuído e nenhum domínio foi publicado.
