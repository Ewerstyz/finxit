// Public presentation grounded in the supplied October 2026 business plan.
// Internal budgets, investment terms and revenue projections are not public copy.
export const businessPlan = {
  date: "Outubro de 2026",
  stage: "Protótipo Android em desenvolvimento",
  origin: {
    title: "Uma ideia ganha forma. Um negócio ganha direção.",
    text: "A FinxiIT nasce de uma pergunta próxima de quem empreende: como continuar construindo um negócio quando os registros estão espalhados e o tempo é curto? Nosso ponto de partida é a organização financeira, com tecnologia acessível e orientação compreensível.",
    name: "Finxi vem de fingere, verbo latino ligado a formar, moldar e criar. “Crie isso” é a interpretação criativa da marca. IT também remete à tecnologia da informação. Para nós, criar é o começo; cuidar do que foi criado é a próxima etapa.",
    region: "Venda Nova do Imigrante · Espírito Santo",
  },
  mission:
    "Simplificar a rotina de pequenos empreendedores com tecnologia acessível, organização e orientação para melhores decisões.",
  vision:
    "Tornar a FinxiIT uma referência de gestão acessível, começando pela validação regional e expandindo para outros públicos quando a operação estiver preparada.",
  values: [
    {
      title: "Simplicidade",
      text: "Reduzir etapas, explicar com clareza e aproximar a gestão do cotidiano.",
    },
    {
      title: "Inclusão",
      text: "Considerar quem tem pouca experiência digital ou conhecimento de gestão.",
    },
    {
      title: "Confiança",
      text: "Mostrar de onde vêm as informações e permitir que os números sejam conferidos.",
    },
    {
      title: "Respeito ao usuário",
      text: "Preservar a escolha, a correção dos registros e o controle sobre os dados.",
    },
  ],
  team: [
    {
      initials: "LF",
      name: "Luis Guilherme Lemos Fim",
      role: "Coordenação e comunicação",
      text: "Planejamento, organização, comunicação e parcerias.",
    },
    {
      initials: "ED",
      name: "Erisson Pereira Dordenoni",
      role: "Desenvolvimento e tecnologia",
      text: "Aplicativo, site, proteção dos dados e manutenção.",
    },
    {
      initials: "IR",
      name: "Isaac da Silva Rodrigues",
      role: "Pesquisa e testes",
      text: "Pesquisa regional, participantes e acompanhamento dos testes.",
    },
  ],
  research: {
    title: "Ouvir primeiro. Construir com propósito.",
    text: "Entre 16 de agosto e 12 de setembro de 2026, ouvimos 12 empreendedores da região. As respostas ajudam a escolher o que precisa ser simples desde o primeiro uso.",
    metrics: [
      {
        value: "6 de 12",
        label: "usam caderno para o controle financeiro",
        response: "Um caminho simples para organizar os registros no celular.",
      },
      {
        value: "7 de 12",
        label: "relatam esquecer pequenos gastos",
        response: "Registro rápido e conferência antes de salvar.",
      },
      {
        value: "7 de 12",
        label: "têm dificuldade de separar as contas",
        response: "Uma visão própria para as movimentações do negócio.",
      },
    ],
    note: "Pesquisa exploratória própria com 12 respostas de comércio, alimentação e serviços. Este recorte regional orienta o desenvolvimento; não representa o conjunto dos empreendedores brasileiros.",
  },
  roadmap: [
    {
      label: "Protótipo atual",
      title: "Um protótipo para testar",
      text: "Telas de resumo financeiro, transações, alertas e assistente já compõem o protótipo Android. O produto está em desenvolvimento.",
    },
    {
      label: "Próxima etapa",
      title: "Validar antes de ampliar",
      text: "Concluir armazenamento seguro, cobrança, testes e atendimento. O plano prevê um piloto acompanhado com cerca de 30 negócios.",
    },
    {
      label: "Evolução prevista",
      title: "Crescer com a realidade",
      text: "Metas, agenda ampliada, marketing e integrações bancárias serão avaliados após a consolidação do núcleo financeiro.",
    },
  ],
  plans: [
    {
      name: "Simples",
      price: "39,90",
      purpose: "Organizar o presente.",
      features: [
        "Registros de receitas e despesas",
        "Resumo financeiro e lembretes",
        "Relatórios básicos",
        "Limites de voz e leitura de comprovantes",
      ],
    },
    {
      name: "Pro",
      price: "59,90",
      purpose: "Olhar também para os próximos compromissos.",
      features: [
        "Todos os recursos do Simples",
        "Previsão de caixa pelos compromissos informados",
        "Orientações adicionais e exportação simples",
        "Limites de uso ampliados",
      ],
    },
  ],
  planNote:
    "Preços e escopo propostos no plano de negócios, sujeitos à validação. Os limites serão informados antes da contratação. Cadastro e assinatura ocorrerão no aplicativo, quando a versão comercial estiver disponível.",
};
