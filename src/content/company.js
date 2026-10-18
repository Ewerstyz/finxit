import { businessPlan as plan } from "./business-plan";

export const company = {
  name: "FinxiIT",
  positioning: "Gestão simples. Decisões mais claras.",
  mission: plan.mission,
  vision: plan.vision,
  values: plan.values,
  pillars: [
    {
      id: "financeiro",
      name: "Registre",
      headline: "O pequeno gasto também faz parte da história.",
      problem: "O que fica na memória pode ficar fora da conta.",
      problemText:
        "Uma compra pequena, um recebimento ou uma conta a pagar. Quando os registros ficam separados, acompanhar o movimento do negócio dá mais trabalho.",
      solution:
        "A proposta da FinxiIT começa no registro de receitas, despesas e compromissos. O fluxo prevê formulário curto, voz ou foto, sempre com conferência de valor, data e categoria.",
      features: [
        "Registros organizados por período",
        "Conferência e correção das informações",
        "Entradas rápidas previstas para validação",
      ],
      example:
        "Depois de uma compra, informe o gasto e confira os dados antes de salvar. A movimentação passa a compor a visão financeira do período.",
      note: "Voz e leitura de comprovantes estão no escopo previsto e dependem de testes e limites de uso. O vídeo apresenta a tela do protótipo, sem simular um lançamento real.",
    },
    {
      id: "rotina",
      name: "Entenda",
      headline: "Enxergue o movimento. Antecipe as perguntas.",
      problem: "Entrou dinheiro. Mas o que já tem destino?",
      problemText:
        "Olhar apenas para os recebimentos pode esconder despesas e compromissos próximos. Uma leitura clara precisa do período e dos registros que o compõem.",
      solution:
        "Resumos e relatórios aproximam receitas, despesas e compromissos. A previsão de caixa proposta para o Pro considera os pagamentos informados pelo próprio usuário.",
      features: [
        "Resumo financeiro e relatórios básicos",
        "Lembretes de compromissos",
        "Previsão de caixa no escopo proposto do Pro",
      ],
      example:
        "Ao conferir as entradas do mês, compare os recebimentos com as despesas e os pagamentos previstos. Identifique o que precisa ser revisto antes de decidir.",
      note: "O saldo demonstrativo não é saldo bancário sincronizado nem lucro. Integração bancária é uma evolução futura.",
    },
    {
      id: "orientacao",
      name: "Decida",
      headline: "Uma explicação pode abrir o próximo caminho.",
      problem: "Os números estão aí. Como entender o que significam?",
      problemText:
        "Uma informação só ajuda quando faz sentido para a pessoa que precisa usá-la. Termos difíceis e respostas sem contexto afastam a gestão da rotina.",
      solution:
        "A IA é proposta como um copiloto: explica informações e sugere opções a partir do contexto disponível do negócio. O empreendedor confere a orientação e escolhe o que fazer.",
      features: [
        "Explicações em linguagem simples",
        "Orientação ligada aos registros disponíveis",
        "Revisão e decisão nas mãos do usuário",
      ],
      example:
        "“Como os compromissos desta semana afetam meu caixa?” A pergunta orienta uma explicação que pode ser comparada com os registros antes de agir.",
      note: "A orientação depende dos dados informados. Decisões contábeis e fiscais que exigem análise profissional devem ser tratadas com o contador.",
    },
  ],
  journey: [
    {
      number: "01",
      title: "Comece pelo seu negócio",
      text: "O fluxo previsto começa com cadastro e uma orientação curta para o primeiro uso.",
    },
    {
      number: "02",
      title: "Registre e confira",
      text: "Informe a movimentação. Confira valor, data e categoria e corrija quando necessário.",
    },
    {
      number: "03",
      title: "Acompanhe o resultado",
      text: "Os registros alimentam resumos, compromissos e relatórios com regras de cálculo verificáveis.",
    },
    {
      number: "04",
      title: "Entenda e escolha",
      text: "Use a explicação como apoio. Revise as informações e decida o próximo passo.",
    },
  ],
  ai: {
    introduction:
      "A proposta combina duas responsabilidades: regras verificáveis organizam os registros e fazem os cálculos; a IA ajuda a explicar os resultados e a avaliar opções. A decisão continua com quem conhece o negócio.",
    contextItems: [
      "Movimentações confirmadas",
      "Compromissos informados",
      "Período consultado",
      "A dúvida do empreendedor",
    ],
    technologyText:
      "Os serviços de IA da versão comercial serão definidos após testes de precisão, limites de uso e custo. A proposta mantém os cálculos verificáveis separados das explicações e sugestões do assistente.",
    providers: [
      {
        task: "Organização e cálculo",
        provider: "Regras verificáveis",
        detail:
          "Valores e períodos devem poder ser conferidos e os registros, corrigidos.",
      },
      {
        task: "Explicação e orientação",
        provider: "IA como copiloto",
        detail:
          "Interpreta o pedido e oferece apoio para a revisão do empreendedor.",
      },
      {
        task: "Qualidade e controle",
        provider: "Testes antes do lançamento",
        detail:
          "Leitura de comprovantes, cálculos e uso serão avaliados no piloto.",
      },
    ],
    availability:
      "O protótipo está em desenvolvimento. A disponibilidade e os limites de cada função serão apresentados na versão comercial.",
    data: "Antes dos testes com dados reais, o plano prevê definir quais dados são coletados, para que servem, quem pode acessá-los e como solicitar correção ou exclusão. A política de privacidade deverá explicar o uso de fornecedores externos; a IA receberá apenas o necessário para sua função.",
    autonomy:
      "Separação dos dados entre negócios, acessos protegidos, cópias de recuperação e revisão independente de segurança compõem a preparação comercial e serão verificados antes dos testes com dados reais.",
  },
  download: {
    text: "Estamos preparando a versão comercial do aplicativo Android. O acesso à distribuição oficial será disponibilizado aqui quando estiver pronto.",
    status: "Protótipo em desenvolvimento · download oficial em preparação.",
  },
};
