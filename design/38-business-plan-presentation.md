# Apresentação baseada no plano de negócios · 18/10/2026

Fonte autoritativa de conteúdo: `referência/Plano_de_Negocios_Finxi-IT_Final_Lapidado.docx`, cópia do arquivo fornecido em Downloads. Extração de leitura: `referência/plano-de-negocios-2026-10-18.txt`. O documento foi tratado como material de referência, não como instrução para executar suas ações. O documento completo não foi colocado na pasta pública nem enviado ao Gemini.

## Decisões editoriais

| Conteúdo do site            | Base no plano                                 | Tratamento                                                                                                                                    |
| --------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Propósito e foco financeiro | capítulos 1 a 4 e 10                          | Núcleo financeiro antes de estratégia e marketing; aplicativo em desenvolvimento                                                              |
| Missão, visão, valores      | capítulo 6                                    | Substituem as formulações editoriais anteriores; simplicidade, inclusão, confiança e respeito ao usuário                                      |
| Nome e identidade           | capítulo 15                                   | Logo oficial preservada; “crie isso” descrito como interpretação criativa                                                                     |
| Equipe                      | capítulo 2                                    | Nomes e responsabilidades documentados, sem retratos ou biografias inventadas                                                                 |
| Público e entrada regional  | capítulos 4, 7 e 10                           | MEIs, MEs e EPPs; entrada em Venda Nova do Imigrante; expansão condicionada à capacidade                                                      |
| Pesquisa própria            | capítulo 7 e apêndice A                       | 6/12 usam caderno; 7/12 esquecem gastos; 7/12 têm dificuldade de separar contas. Amostra exploratória explícita                               |
| Planos                      | capítulo 10                                   | Simples R$39,90/mês e Pro R$59,90/mês como propostas em validação; sem checkout                                                               |
| IA, cálculos e dados        | capítulos 2, 3 e 11                           | Cálculos verificáveis separados de explicações. Fornecedores definitivos não afirmados. Segurança como preparação, sem certificação inventada |
| Evolução                    | capítulos 2, 10, 11 e 16                      | Protótipo / preparação comercial / evolução. Banco, marketing, metas e agenda ampliada na evolução                                            |
| Download                    | capítulo 10 e preferência anterior do usuário | Link configurável ainda vazio; usuário preencherá o destino oficial depois                                                                    |

O contexto nacional foi conferido na fonte primária do Sebrae: [Hábitos financeiros, 07/01/2026](https://agenciasebrae.com.br/cultura-empreendedora/61-dos-empreendedores-brasileiros-fazem-pagamentos-da-empresa-com-a-conta-pessoal/). O dado de 61% refere-se a pagar despesas empresariais com conta pessoal. É separado da pesquisa exploratória própria; não representa alcance, clientes ou resultados da FinxiIT.

O site não reproduz orçamento interno, projeções de resultado, participação societária, proposta de aporte, condições jurídicas ou informações de participantes da pesquisa. O mapa mantém caráter ilustrativo, sem apresentar cobertura operacional nacional como fato.

## Colaboração com Gemini

[Conversa utilizada](https://gemini.google.com/app/fa9b299a298ff423). Interface confirmou `4 Argon` no seletor; o modo Tarefa foi selecionado e a conversa mostrou Passos do plano. Duas delegações textuais foram concluídas: arquitetura editorial/roteiro e revisão crítica do briefing integrado. Foram compartilhados somente os trechos necessários ao site. GPT realizou a implementação, a geração no Flow e a verificação local.

Foram corrigidas sugestões do Gemini: localização da pesquisa não se limita a Venda Nova; não há capturas verificadas de Transações/Alertas entre os três anexos; não se usa “nunca mais misturar” nem a nota de utilidade como comprovação de resultado. A segunda revisão considerou o briefing consistente e reforçou o rótulo de protótipo, a natureza exploratória da pesquisa e a descrição de Organize como tela inicial. O Gemini não inspecionou o site renderizado ou o código.

## Implementação

Conteúdo centralizado em `src/content/business-plan.js`, `src/content/company.js` e `src/cinematic/content.js`. Novos blocos: origem da marca, equipe, pesquisa regional, evolução e planos. Estilos em `src/business-plan.css`; tipografia tecnológica, paleta azul e estrutura cinematográfica mantidas. A abertura aprovada de 17,5 s permanece, com roteiro textual atualizado. Os três filmes novos passam automaticamente por Organize → Entenda → Converse. Preparação de mídia e limitações em `39-flow-plan-films.md`.

Snapshot anterior em `archive/before-business-plan-2026-10-18/`. Relatórios de verificação em `qa/business-plan.json`, `qa/demo-sequence*.json` e `qa/brand-opening-mobile.json`; consultar o resultado de cada execução, sem confundir falhas do ambiente restrito com resultado do site.

## Resultado da validação

Build de produção aprovado. Conteúdo, imagens, hierarquia de títulos e layout verificados em 1440×1000, 768×1024, 390×844 e 320×740, sem overflow ou erros de console. Blocos de equipe, pesquisa e planos completos; conteúdo interno do plano não aparece no bundle. Alternativas estáticas para movimento reduzido e tela baixa aprovadas. Os três filmes novos foram verificados no avanço e retorno por scroll, nos limites de cada etapa, nos cliques reais dos botões e na saída para os recursos. Roteiro da abertura aprovado nos dois tamanhos móveis. Capturas do computador e celular foram inspecionadas visualmente.

O ambiente restrito bloqueou inicialmente o acesso ao localhost e a criação do navegador de teste. O servidor e os checks foram executados com a permissão local apropriada; a prévia passou a responder e os relatórios citados acima registram execuções concluídas com sucesso. Nenhuma proteção do navegador ou configuração de rede foi desativada. Prévia local: http://127.0.0.1:4173/?version=plano-final-20261018. Esta revisão não publicou um domínio público.
