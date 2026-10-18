import fs from "node:fs/promises";
const docs = {
  "README.md": `# Site FinxiIT

Site de apresentação finalizado localmente, baseado no documento, na tela do app e nas marcas fornecidas. Inclui dois vídeos originais gerados no Google Flow pelo navegador, layout responsivo, Motion, componentes oficiais shadcn/ui e revisão pelo Chrome DevTools MCP.

## Executar

Requer Node.js 20.19+ ou 22.12+ e pnpm.

\x60\x60\x60sh
pnpm install
pnpm run dev
pnpm run build
pnpm run preview
\x60\x60\x60

O desenvolvimento normalmente abre em http://localhost:5173. O pacote publicável está em dist/. Não é necessário configurar chave de API ou arquivo de ambiente. Fontes, vídeos e imagens são locais.

## Entrega

- referência/: quatro originais preservados, texto do Word, duas imagens de inspiração e originais dos filmes.
- public/media/: dois vídeos H.264 de 8 segundos e posters estáticos.
- design/: especificações de cores, espaços, layout, movimento, ferramentas e validação.
- design/qa/: capturas, resultados do MCP e relatórios Lighthouse.
- src/: aplicação React; componentes de mídia separados dos componentes de interface.
- tooling/skills/: cópias locais de Frontend Design e Web Design Guidelines usadas nesta entrega.
- tooling/review-site.mjs: verificação via Chrome DevTools MCP, em perfil isolado.

## Funcionalidades

Vídeo claro com reprodução silenciosa, pausa e interrupção fora da viewport; filme escuro com avanço e retorno por rolagem; barra acessível para controlar a experiência; alternativas estáticas quando há movimento reduzido ou economia de dados; abas shadcn/Radix com teclado; FAQ shadcn; menu mobile; demonstração de conversa com respostas locais.

## Validação

Compilação de produção concluída. Layout verificado em 320, 390, 820 e 1440 px. Busca no vídeo confirmada em 1,2 s → 6 s → 2,8 s. Lighthouse local via Chrome DevTools MCP: 100 em acessibilidade, boas práticas e SEO. Não é medição de performance em produção nem certificação completa de acessibilidade.

## Integrações e limites

Motion e shadcn estão em uso. Frontend Design e Web Design Guidelines foram lidas e aplicadas; cópias ficam no projeto, sem instalação global. Chrome DevTools MCP foi executado de verdade, pelo cliente MCP em tooling/, em Chrome isolado.

Magic/21st MCP não foi usado: não há conexão autenticada disponível. OpenAI Developers e Plugin Creator não foram necessários à landing page; não foi criada uma IA real nem um plugin customizado só para satisfazer uma lista de ferramentas.

O site está pronto para apresentação local e publicação do front-end. Não houve deploy, registro de domínio ou integração de backend. Os recursos futuros do app permanecem identificados como previstos, sem inventar links de download, contatos, preços ou disponibilidade comercial.
`,
  "design/03-movimento-efeitos.md": `# Movimento e vídeos

## Vídeos reais

Os dois clipes foram gerados no Google Flow pelo navegador, em 720p, 16:9 e 8 segundos. Originais em referência/videos/; versões otimizadas e posters em public/media/. Não dependem de variável de ambiente, URLs externas temporárias ou API.

- HeroFilm.jsx: filme claro, silencioso e em loop, com botão de pausa/reprodução. Interrompe fora de vista ou com a aba oculta.
- ScrollStory.jsx: filme azul-marinho, sem autoplay. O progresso da seção controla currentTime. Busca sincronizada com requestAnimationFrame e evento seeked para não perder o último destino ao rolar rapidamente.

O vídeo escuro avança quando a página desce e retorna quando sobe. A faixa com rótulo Progresso da experiência fornece alternativa de teclado. O mesmo progresso controla o telefone, a etapa em destaque e a linha inferior via Motion para React.

## Acessibilidade e falhas

Com prefers-reduced-motion, nenhum elemento video é montado. Posters preservam a apresentação e todas as etapas ficam legíveis. Economia de dados também seleciona imagens estáticas. Se a mídia falhar, o poster permanece. Texto, marca e ações são HTML e não dependem dos filmes.

Em telas baixas ou muito estreitas, a narrativa deixa de ficar fixada e prioriza a leitura. Não há áudio, scroll hijacking ou listeners que bloqueiem toque e roda do mouse.

## Codificação

H.264, yuv420p, faststart, áudio removido, keyframes a cada 12 frames. Os clipes têm aproximadamente 0,98 MB (claro) e 1,24 MB (escuro), em bytes decimais. O escuro é carregado apenas quando a seção se aproxima da viewport.

## Testes

Chrome DevTools MCP confirmou: 15% → 1,2 s; 75% → 6 s; retorno a 35% → 2,8 s. Duração: 8 s; readyState: 4. A preferência por movimento reduzido foi emulada e confirmou zero vídeos no DOM.

Fonte técnica: https://motion.dev/docs/react-use-scroll
`,
  "design/04-integracoes.md": `# Integrações efetivamente usadas

| Ferramenta | Situação final | Evidência |
| --- | --- | --- |
| Google Flow pelo navegador | Dois filmes gerados, salvos e integrados | referência/videos/ e public/media/ |
| shadcn/ui | Tabs e Accordion importados pela CLI oficial, adaptados à marca | src/components/ui/; radix-ui no lockfile |
| Motion / Framer Motion | Em uso | HeroFilm, ScrollStory e App |
| Frontend Design Skill | Baixada da fonte oficial, lida e aplicada | tooling/skills/frontend-design/ |
| Web Design Guidelines | Baixada, lida e aplicada com diretrizes atuais | tooling/skills/web-design-guidelines/ |
| Chrome DevTools MCP | Executado com cliente MCP stdio e Chrome headless isolado | tooling/review-site.mjs e design/qa/ |
| Magic / 21st MCP | Não conectado nem utilizado | Sem autenticação disponível; nenhuma chave solicitada pelo chat |

A CLI shadcn importou Tabs e Accordion do registry. Foi corrigida a referência à função cn para apontar para src/lib/utils.js e substituídas transições genéricas por transições de cor. O Button continua uma adaptação local da composição shadcn/Radix/CVA da primeira versão.

As skills estão armazenadas no projeto e foram aplicadas nesta sessão. Não foram registradas globalmente no Codex. O MCP de Chrome é iniciado pelos scripts do projeto, sem acessar o perfil pessoal do navegador; não foi adicionado a uma configuração global. Estatísticas de uso e consulta CrUX foram desativadas no servidor de teste.

Plugin Management foi usado para pesquisar os conectores pedidos. A busca não encontrou Chrome DevTools ou Magic/21st como plugins instaláveis no catálogo consultado; o Chrome DevTools foi resolvido pelo pacote oficial. MagicPath é outro produto e não foi apresentado como substituto da 21st.dev.

OpenAI Developers e Plugin Creator foram considerados, mas não foi necessário adicionar chamadas OpenAI, provisionar credenciais ou criar um plugin customizado para concluir este front-end. Isso evita afirmar uso de ferramentas que não participaram da implementação.

## Fontes

- https://ui.shadcn.com/docs/installation/vite
- https://motion.dev/docs/react-use-scroll
- https://github.com/ChromeDevTools/chrome-devtools-mcp
- https://github.com/anthropics/skills/tree/main/skills/frontend-design
- https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines
- https://github.com/vercel-labs/web-interface-guidelines
- https://github.com/21st-dev/magic-mcp

O antigo Magic MCP passou ao 21st MCP. Para uso futuro, configurar a conexão pelo fluxo oficial em https://21st.dev/mcp. Não colocar chaves no repositório ou no bundle do navegador.
`,
  "design/08-validacao-final.md": `# Validação final

Ferramenta: Chrome DevTools MCP 1.10.1, cliente MCP oficial por stdio, Chrome em perfil temporário. Resultados brutos em design/qa/.

## Confirmado

- Hero: controle de pausa retornou paused=true e rótulo Reproduzir vídeo de fundo.
- Abas: ArrowRight selecionou Estratégia; conversa exibiu o exemplo correspondente.
- FAQ: expansão com aria-expanded=true.
- Menu mobile: abriu com true e fechou com Escape retornando false.
- Filme escuro: 1,2 s → 6 s → 2,8 s, com duração 8 s e readyState 4.
- Movimento reduzido: preferência emulada, zero vídeos e seção estática ativa.
- Viewports reais: 320, 390, 820 e 1440 px; sem transbordamento horizontal após a correção final.
- Fontes e imagens carregadas; nenhum erro de console capturado.
- Lighthouse local: acessibilidade 100, boas práticas 100, SEO 100 e agentic browsing 100. Total: 59 auditorias aprovadas, zero reprovadas na execução registrada.

## Revisão visual

Capturas desktop, mobile e narrativa abertas e inspecionadas. Ajustados o respiro, a fonte local, os títulos, o posicionamento do telefone, o recorte do filme e o contraste do texto sobre o vídeo.

Web Design Guidelines aplicada aos arquivos src/App.jsx, src/components/HeroFilm.jsx, src/components/ScrollStory.jsx e estilos. Correções: ícones decorativos ocultos, pausa explícita para loop, carregamento adiado abaixo da dobra, foco visível, dimensões de imagem e respeito a movimento reduzido.

## Limites

Lighthouse é uma auditoria automática local, sem garantia de acessibilidade total. Não houve teste em iPhone físico, navegador Safari, servidor público ou rede móvel real. Nenhuma nota de performance foi obtida: o comando lighthouse_audit deste MCP não mede essa categoria. Os relatórios de primeiras passagens são históricos; responsive-final.json registra a correção posterior de tablet.
`,
};
for (const [file, text] of Object.entries(docs)) await fs.writeFile(file, text);
