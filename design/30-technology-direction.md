# FinxiIT: direção tecnológica, 3 de outubro de 2026

## Pedido e escopo

Mantida a estrutura aprovada: abertura em zoom, empresa, missão/visão, valores, público, app, recursos, IA, etapas e Android. Alterados fonte de destaque, imagens, alinhamento das transições e remoção das barras de progresso. Os filmes existentes do Flow continuam no palco do app. Nenhum novo filme foi gerado.

Título em Space Grotesk 600 e parágrafos em Manrope. Fonte de destaque salva localmente, origem Google Fonts: design/space-grotesk-source.css. Sem dependência externa para renderizar a tipografia da página. A fonte Ogg da revisão anterior permanece no histórico, sem uso ativo.

## Imagens finais

Ferramenta nativa ImageGen: primeira cena gerada; segunda e terceira derivadas da primeira como edições, com referência local inspecionada. Mesmo país/rede/núcleo, paleta e materiais. Sem varejos ou pessoas.

- public/assets/finxi-tech-network.webp
- public/assets/finxi-tech-intelligence.webp
- public/assets/finxi-tech-core.webp

Originais: referência/imagens/technology/. Conversão WebP qualidade 90, sem edição de conteúdo por Python. Script tooling/optimize-technology.py.

## Prompts finais

### finxi-tech-network

Use case: stylized-concept. Asset type: FinxiIT cinematic technology website fullbleed hero background, first of three connected camera views. Generate a premium 3D technology artwork, widescreen 16:9: a recognizably accurate silhouette of BRAZIL formed by tiny luminous cobalt blue and restrained cyan points and fine interconnecting digital lines, on a floating flat dark glass substrate, with a subtle triangular circuit-grid floor fading into deep midnight navy. No people, no stores, no cities, no buildings. Brazil upright north at top as on a conventional map, viewed almost front on with just slight perspective, positioned at x=70 percent width and y=52 percent height, occupying approximately 36 percent of the full width and 65 percent height. A circular luminous AI connection hub sits within the Southeast part of Brazil around x=73 percent y=66 percent of full frame; thin arcs radiate to five regional blue points. Hub is a small perfectly round nested concentric glass/circuit lens, visually crisp, ideal destination for a subsequent camera zoom. Keep entire left 45 percent very dark and clean for large white website typography. Cinematic polished glass, precise light trails and optical details, highly refined restrained sci-tech design, credible network visualization, no rainbow, no purple, no stock corporate people. No readable labels, letters, numbers, logos, no interface cards, no phone, no text, no watermark. This is conceptual representation, not customer coverage. Strong coherent cobalt/cyan/navy material language that later views can continue by moving into the circular hub.

### finxi-tech-intelligence

Edit target: the supplied Brazil digital network artwork. Produce the SECOND camera view in the SAME EXACT cinematic technology environment. Change only the framing/detail: smoothly zoom 2.2x towards the circular concentric AI hub currently at x=79 percent and y=55 percent of the source image. The same circular hub MUST remain centered at x=79 percent width and y=55 percent height in the new full 16:9 frame; it now occupies approximately 22 percent of frame width. Its same concentric blue/cyan rings, central white-blue optical core, and the same network arcs and Brazil mesh keep their original geometry and perspective. Brazil country edges are now mostly cropped beyond right and top edges naturally due to zoom. Refine the glass microcircuits and optical connections as the camera gets closer. Keep the entire left 45 percent very dark navy and uncluttered for website typography. Palette, lighting, materials and scene exactly match source. Do NOT introduce unrelated visuals, processor chips, phone, people, retail, globe, cyberpunk props or a different hub. No text, logos, numbers, labels or watermarks. This is a closer frame of one continuous camera move, not a new scene. Wide landscape 16:9.

### finxi-tech-core

Edit target: the supplied Brazil digital network artwork. Produce the THIRD very close camera view in the SAME EXACT cinematic technology environment. Change only the framing/detail: camera moves 4.2x towards the very same circular concentric AI connection hub visible at x=79 percent width y=55 percent height of source. Keep that same hub anchored at x=79 percent width y=55 percent height in final 16:9 frame; hub now occupies approximately 43 percent width, extends toward right edge, rings glow very gently with precise fine cyan/cobalt microcircuits and translucent layered glass. The central luminous optical core remains a soft white-blue circular light, no emblem. Continue EXACT source ring geometry, source network strands radiating outward and color/material/lighting. The country shape itself is outside frame now because we are INSIDE its network node. No new environment, no camera tilt, no different style. Left 40 percent still nearly empty deep navy for white webpage type. Crisp refined closeup hardware optics and connection patterns, not bright blown-out glow or cartoon. Absolutely no words, letters, numbers, logos, UIcards, smartphones, shops, buildings, people or watermarks. Wide landscape 16:9.

## Continuidade de movimento

As três imagens utilizam o mesmo destino da câmera. O ponto circular foi medido e alinhado por posições e origens específicas de cada imagem: rede (79,36%,54,94%), inteligência (77,45%,44,63%), núcleo (74,16%,48,04%). O enquadramento do palco coloca o destino em 79%/55% no desktop. No celular, o grafismo permanece inteiro na parte superior, sem recortar o mapa como se fosse uma fotografia de loja.

Interpolação smoothstep evita mudanças bruscas de velocidade. O quadro seguinte inicia sem zoom adicional enquanto ocorre a fusão; só então a câmera continua avançando. As posições não dependem de animações de opacidade do compositor. Os controles de capítulo permanecem acessíveis por teclado; todas as barras, ranges e porcentagens foram removidos. Filmes podem ser revistos por botão e avançam com a rolagem.

## Mapa das regiões

BrazilNetwork.jsx substitui a fotografia da seção de público por uma ilustração vetorial. Contorno oficial: https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=image/svg%2Bxml&qualidade=minima . Documentação: https://servicodados.ibge.gov.br/api/docs/malhas?versao=3 . Original preservado em referência/mapas/brasil-ibge.svg, paths usados em src/cinematic/brasil-outline.json.

Conexões e pontos são ilustrativos. A legenda e descrição acessível explicam que representam o propósito, sem alegar clientes, base instalada ou cobertura comprovada. Os rótulos indicam as cinco regiões. Nenhum serviço externo é chamado para mostrar o mapa no navegador.

## Histórico

Versão anterior preservada em archive/finxi-cinematic-before-tech/. Fotografias anteriores permanecem arquivadas/referenciadas como histórico; não aparecem na página atual.

## Verificação concluída

Build aprovado: CSS 27,85 kB; JavaScript 350,37 kB, 114,30 kB gzip. Chrome DevTools MCP conferiu 1440×1000, 768×1024, 390×844 e 320×740, ausência de ranges/barras e fotografias de varejo, fonte Space Grotesk, cinco regiões no mapa, leitura dos capítulos, filmes pausados e vinculados à rolagem, troca de abas, captura ampliada, menu e movimento reduzido. Nenhum erro de console.

A conferência adicional de transições verificou seis posições (0; 0,44; 0,53; 0,82; 0,93; 0,15) em desktop e celular, incluindo voltar ao primeiro quadro. Os três pontos focais permanecem alinhados ao mesmo destino com tolerância máxima de 2 px. Bordas suavizadas no celular e rótulos das regiões dentro do mapa. Scripts: tooling/qa-technology.mjs e tooling/qa-tech-transitions.mjs. Relatórios e imagens: design/qa/technology-*.
