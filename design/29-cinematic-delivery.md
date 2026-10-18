# Entrega: FinxiIT, empresa primeiro

## Resultado

Nova abertura cinematográfica inspirada na coreografia do prompt Mostar, adaptada à FinxiIT. A rolagem aproxima o bairro, abre os planos laterais, revela a empreendedora e chega à mesa. Segue a empresa: propósito, missão, visão, valores, público e desafio brasileiro. O aplicativo entra depois, em um único palco com três filmes selecionáveis; os recursos Financeiro, Estratégia e Marketing mostram problema, apoio oferecido, exemplos e limites. A arquitetura de IA e o Android fecham a apresentação.

A versão anterior está preservada em archive/finxi-before-cinematic/. Não houve publicação externa ou nova geração no Flow nesta revisão.

## Design e implementação

Subagentes trabalharam no roteiro, na direção de arte e no componente de zoom. Frontend Design orientou o plano e a autocrítica; Web Design Guidelines foi revisado na fonte oficial https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md. Motion controla o progresso e a preferência de movimento; shadcn/ui fornece abas, botões e acordeões. O zoom final usa estilos nativos derivados do progresso, depois de uma falha de opacidade encontrada na revisão do compositor. A solução elimina texto residual e mantém os enquadramentos determinísticos.

Tokens em design/finxi-cinematic-tokens.css. Fonte Ogg da referência salva localmente em public/fonts/ogg-medium.woff2; Manrope disponível pelo pacote local. Duas imagens novas de ImageGen, otimizadas e documentadas em design/28-cinematic-media.md.

## Verificação

- Build Vite concluído: CSS 27,73 kB e JavaScript 341,32 kB (109,38 kB gzip).
- Chrome DevTools MCP executado contra a prévia compilada em 127.0.0.1:4173.
- Viewports 1440×1000, 768×1024, 390×844 e 320×740: imagens carregadas, fontes disponíveis e sem excesso horizontal.
- Os capítulos intermediário e final têm opacidade 1; textos anteriores têm opacidade 0 e visibilidade hidden. Posição de texto e enquadramentos conferidos visualmente.
- Vídeos pausados e sem autoplay; tempo sincronizado com rolagem. Abas trocam vídeo, cartaz, texto e parâmetro demo. Avanço e retorno verificados nos filmes Relatórios e Assistente.
- Filme e legenda ficam separados dos controles, inclusive no celular.
- Abas por teclado; abertura e fechamento do menu com Escape e restauração do foco; controle de zoom por End; acordeões e aviso de download conferidos.
- Ampliação da captura original: diálogo nativo, Escape fecha e devolve foco ao botão.
- Movimento reduzido: três imagens em sequência normal, nenhuma tag video. Altura 600 px: história e palco estáticos.
- Nenhum erro de console encontrado nos relatórios finais.

Relatórios: design/qa/cinematic-review.json e cinematic-reduced.json. Capturas cinematic-*.png. Script tooling/qa-cinematic.mjs.

## Limites e configuração

As cenas de comércio são ilustrativas e não representam instalações ou clientes reais. Os filmes existentes são apresentações de telas recompostas, não gravações de execução. A documentação do Android fundamenta os recursos; não houve teste atual das APIs ou do APK. Missão, visão e valores são formulações editoriais baseadas no projeto. O site relaciona a proposta ao problema nacional, sem afirmar que a empresa já resolveu esse problema ou inventar indicadores.

O link Android permanece vazio por escolha do usuário: editar androidDownloadUrl em public/site-config.json. Sem link, o botão exibe um aviso claro. Magic MCP/21st não estava disponível. Não foram criados plugins, contas ou integrações sem relação com a apresentação.
