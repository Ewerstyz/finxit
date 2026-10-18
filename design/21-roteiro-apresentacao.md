# Roteiro da apresentação FinxiIT

Conteúdo: `src/redesign/content.js`. Três capacidades ligadas por uma ideia: o que acontece no negócio vira contexto para entender, planejar e agir.

## Ordem da narrativa

1. **Promessa de abertura:** “Seu negócio pede mais que uma planilha.” Complemento imediatamente concreto: caixa, plano e divulgação. CTAs para conhecer o app e chegar ao download Android.
2. **Proposta:** “Do que aconteceu hoje ao que fazer amanhã.” Explicar a conexão dos dados, evitando uma coleção de funcionalidades sem propósito.
3. **Financeiro:** problema de registros espalhados → receitas, despesas e relatórios → exemplo de consulta das entradas do mês → resultado qualitativo de clareza. Tela real Relatórios como evidência visual; Início apoia a entrada e organização.
4. **Estratégia com IA:** problema da falta de tempo para analisar → conversa com contexto → exemplo de pouco movimento na terça-feira → ação pequena para revisar e testar. Tela real Assistente; não simular uma resposta efetivamente produzida pelo aplicativo.
5. **Marketing:** dificuldade de comunicar uma boa oferta → ideias, textos e criações → exemplo de marmitas para trabalhadores próximos → mensagem para revisar. Não existe screenshot de marketing entre os três fornecidos; usar mensagem ilustrativa identificada ou filme contextual, nunca renomear a tela Relatórios como Marketing.
6. **Como começar:** quatro passos curtos, com foco em comportamento: contar, registrar, conversar, revisar e agir.
7. **Modelo da IA:** diagrama simples contexto → assistente → explicações/planos/criações. Detalhes técnicos expansíveis para quem quer saber mais; sem poluir a narrativa principal.
8. **Empresa:** propósito, missão, visão e valores. Relacionar a empresa à rotina de quem empreende, sem inventar história, números ou credenciais de mercado.
9. **Perguntas essenciais:** público, autonomia da IA e download Android.
10. **Encerramento:** convite para levar o app à rotina. Download é uma configuração externa; ausência de link deve ser informada honestamente.

## Orientação visual e de ritmo

- Cada módulo tem uma pergunta/problema, solução curta, produto em destaque e desfecho. Os detalhes podem ficar em um acordeão ou bloco secundário.
- Evitar mostrar toda a copy ao mesmo tempo em um painel fixo: título, um parágrafo e uma demonstração são suficientes por momento de rolagem.
- O screenshot Início é a apresentação geral do produto. Relatórios prova leitura de um período. Assistente mostra como começar a perguntar.
- Scroll deve controlar a progressão das demonstrações existentes; texto estático continua acessível com movimento reduzido.
- A frase “dados fictícios” deve acompanhar as telas em local legível. Não é necessário repetir avisos longos em cada componente.
- Exemplos de conversa são autoria editorial para demonstrar um caso de uso, não logs de respostas do app.

## Evidência das três telas revisadas

Arquivos em `referência/telas-app-2026-10-02/`:

- `inicio.jpg`: FinxiIT, saudação “Olá, Ana”, identificação “DEMO · dados fictícios”; saldo R$ 7.620,00; ações Registrar, Agenda, Metas, Planilhas e Análises; navegação Início/Financeiro/IA/Relatórios/Perfil.
- `relatorios.jpg`: entradas recebidas R$ 13.250,00 nos últimos 30 dias; evolução diária das entradas; botão Ver detalhes. A tela não prova lucro, rentabilidade ou faturamento real da FinxiIT.
- `assistente-ia.jpg`: perguntas sugeridas sobre gastos, orçamento semanal, economia e relatório; campo de pergunta, anexo e microfone. A imagem não contém resposta gerada e não prova uma consulta de API concluída.

## Base factual e limites

As evidências de implementação e arquitetura estão em `design/16-content-evidence.md`: documentação e código do Android inspecionados, sem executar APIs ou ler credenciais. As capacidades de marketing e planejamento vêm dessa documentação e do orquestrador; não apenas das imagens.

Missão, visão e valores mantêm a formulação editorial baseada no plano fornecido. São proposta de posicionamento, não citação de uma declaração corporativa formal previamente aprovada.

Modelo de IA significa coordenação de modelos e serviços externos conforme a função. Não afirmar modelo proprietário, agentes autônomos independentes, sincronização entre aparelhos ou nuvem própria FinxiIT. Os nomes de serviços ficam em detalhe opcional; não são selos de parceria.

O usuário fornecerá o endereço de download depois. A interface consulta `public/site-config.json`; não deve distribuir o APK debug existente nem inventar uma URL de loja.

Sem estatísticas de aumento de vendas, economia de tempo, número de clientes, avaliações, certificações ou garantia de retorno. Os resultados nos módulos são qualitativos e descrevem a utilidade da função.
