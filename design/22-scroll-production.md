# Jornada do aplicativo

## Direção de design

Um único palco claro apresenta três tarefas conectadas: organizar a rotina, interpretar números e conversar com o assistente. A tipografia fica à esquerda, o filme do produto à direita e uma linha de capítulos orienta a progressão. A tela real do app é o elemento principal; sem cards flutuantes ou métricas inventadas.

Paleta: papel `#F7F9FC`, tinta `#152337`, azul FinxiIT `#0649FF`, texto secundário `#56657A`, linha `#CFD8E5`. Tipografia herdada do site, título de 32–52 px e texto de 15 px. Margens fluidas de 24–88 px. No celular o texto antecede o filme, com controles abaixo.

```text
Conheça o aplicativo                         Pular
┌ texto sobre a tarefa ─────┬ filme do app ──────────┐
│ Título e explicação      │                        │
│ Contexto adicional       │ Tela real no celular   │
└─────────────────────────┴────────────────────────┘
01 Organize   02 Enxergue   03 Converse     progresso
```

## Interface

Importar `{ ProductJourney }` de `src/redesign/ProductJourney.jsx`. CSS importado internamente. `<ProductJourney />` traz conteúdo completo. Props opcionais: `steps` com exatamente três objetos e `nextId` (padrão `inteligencia`, sem `#`). Cada objeto pode sobrescrever `id`, `label`, `screen`, `title`, `description`, `detail`, `file`, `position` e `alt`. `file` é o nome do arquivo sem extensão em `/media/`. A âncora da seção é `#jornada`.

## Movimento e mídia

- Uma seção de 340svh e palco fixo de 100svh.
- Cada terço controla um filme local diferente: `finxi-app-home`, `finxi-app-reports`, `finxi-app-assistant`.
- Todos os vídeos usam somente `currentTime`, nunca `play()` ou autoplay. O movimento é reversível.
- Apenas o vídeo ativo e o próximo são montados, após aproximação de 600 px. Ao voltar a um capítulo anterior, seu vídeo é remontado com poster durante a preparação.
- Progresso local de 0,05 s até a duração menos 0,04 s. Uma busca pendente por vez, atualizada após `seeked`.
- As capturas `-mid.jpg` são posters e fallback de falha de mídia.
- Preferência por movimento reduzido, economia de dados ou altura inferior a 640 px remove a seção longa e mostra os três blocos com imagem e conteúdo.
- Os capítulos são botões nativos; range tem descrição do progresso; link de saída pula diretamente para a seção seguinte.

As mídias já existentes no projeto foram usadas sem downloads ou acesso ao Flow. Os valores nas telas são ilustrativos. A interface não executa consultas de IA; apresenta as funções do aplicativo.
