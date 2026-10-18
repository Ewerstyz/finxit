# Integrações efetivamente usadas

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
