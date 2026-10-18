> Histórico da versão anterior. A direção e a validação atuais estão em 09-redesign-scroll.md e 10-validacao-redesign.md.

# Movimento e vídeos

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

