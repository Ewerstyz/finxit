import { businessPlan as plan } from "../content/business-plan";

export const cinematicContent = {
  brand: "FinxiIT",
  company: {
    intro:
      "A FinxiIT desenvolve um aplicativo para aproximar a gestão da rotina dos pequenos negócios. Começamos pela organização financeira: transformar registros do cotidiano em informações compreensíveis para apoiar decisões.",
    mission: { text: plan.mission },
    vision: { text: plan.vision },
    values: plan.values,
  },
  audience: {
    text: "Para MEIs, microempresas e empresas de pequeno porte. O primeiro foco é quem acompanha pessoalmente vendas e gastos, usa Android e ainda depende de caderno, memória ou planilha para administrar o negócio.",
    groups: [
      {
        title: "MEIs e profissionais autônomos",
        text: "Apoio para acompanhar recebimentos, gastos e compromissos da atividade.",
      },
      {
        title: "Micro e pequenas empresas",
        text: "Uma base organizada para compreender o movimento financeiro do período.",
      },
      {
        title: "Comércio e serviços",
        text: "O piloto previsto atende diferentes segmentos, com acompanhamento próximo de quem usa.",
      },
    ],
  },
  nationalContext: {
    text: "A pesquisa de hábitos financeiros do Sebrae, divulgada em janeiro de 2026, informa que 61% dos empreendedores pagam despesas da empresa com a conta pessoal. A FinxiIT parte desse desafio de organização, com uma proposta que será validada primeiro na região.",
    closing:
      "Começamos por Venda Nova do Imigrante, no Espírito Santo. A expansão para outros municípios dependerá do uso, dos resultados dos testes e da capacidade de atendimento.",
    source: {
      label: "Fonte: Sebrae · hábitos financeiros · janeiro de 2026",
      url: "https://agenciasebrae.com.br/cultura-empreendedora/61-dos-empreendedores-brasileiros-fazem-pagamentos-da-empresa-com-a-conta-pessoal/",
    },
  },
  app: {
    text: "Registre o que acontece, confira os números e encontre uma explicação clara. O núcleo financeiro é a prioridade do lançamento; as telas abaixo apresentam o protótipo Android com dados demonstrativos.",
  },
};
