# Demonstrações em sequência pela rolagem

Solicitação: percorrer Organize → Entenda → Converse e então continuar a página, sem precisar trocar de aba manualmente.

A seção agora tem um único palco fixo com três intervalos de rolagem. Cada intervalo controla apenas o progresso local do filme correspondente. Nos últimos 5% do intervalo, o filme mantém seu frame final antes da troca de etapa. A rolagem reversa retorna pelas mesmas etapas, sem autoplay, loops ou avanço por relógio. Os arquivos de vídeo e os enquadramentos existentes permanecem.

Os botões shadcn/Radix refletem a etapa corrente e saltam para seu início. Rever filme retorna ao início da etapa atual; o controle seguinte leva à próxima etapa, e Converse oferece Continuar para os recursos. Os três filmes permanecem montados perto da seção, evitando descarregar a mídia na troca. Painéis inativos ficam ocultos. A URL acompanha a etapa pelo parâmetro demo.

Altura do percurso: 340svh no computador e 280svh no celular, incluindo a altura do palco. Movimento reduzido, economia de dados e telas baixas mantêm a alternativa estática com botões. A abertura cinematográfica e o conteúdo institucional não foram alterados.

Implementação: src/finxi/ScrollScene.jsx (ScrollSequence e SequenceFilm), src/App.jsx (AppDemo), src/styles.css. Revisão por Chrome DevTools MCP: tooling/qa-demo-sequence.mjs; relatórios e capturas em design/qa/demo-sequence*. A verificação da abertura foi atualizada para considerar o novo intervalo da primeira demonstração.

Build aprovado. Revisão aprovada em 1440×1000, 390×844 e 320×740: finais dos três filmes, troca automática de etapas, retorno pela rolagem, cliques reais nos botões, controle seguinte, saída para os recursos e acesso direto por URL. Alternativas estáticas aprovadas para movimento reduzido e tela de 1280×600. Não foram encontrados erros de console ou overflow. Os enquadramentos do computador e do celular também foram inspecionados visualmente.
