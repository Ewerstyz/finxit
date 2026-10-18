// Site presentation copy. See design/21-roteiro-apresentacao.md for evidence.
export const siteContent = {
  brand: "FinxiIT",
  hero: {
    eyebrow: "Gestão e inteligência para pequenos negócios",
    title: "Seu negócio pede mais que uma planilha.",
    lines: ["Seu negócio pede", "mais que uma planilha."],
    description:
      "Organize o caixa, transforme dúvidas em um plano e encontre novas formas de divulgar seu trabalho. Tudo parte da realidade do seu negócio.",
    primaryAction: "Conheça a FinxiIT",
    primaryHref: "#aplicativo",
    secondaryAction: "Baixar para Android",
    secondaryHref: "#download",
    scrollLabel: "Role para conhecer",
  },
  proposition: {
    eyebrow: "O aplicativo",
    title: "Do que aconteceu hoje ao que fazer amanhã.",
    text: "Uma venda, uma despesa ou uma dúvida não precisam ficar isoladas. A FinxiIT reúne o que você registra e o que conta sobre o negócio para ajudar a entender, planejar e agir.",
    connections: [
      "Organize os números",
      "Defina uma direção",
      "Dê voz ao seu negócio",
    ],
  },
  modules: [
    {
      id: "financeiro",
      number: "01",
      name: "Financeiro",
      title: "O dia foi cheio. E o caixa?",
      problem:
        "Vender, comprar e pagar contas ocupa a rotina. Com anotações espalhadas, fica difícil saber o que entrou, o que saiu e o que ainda vence.",
      solution:
        "Reúna receitas e despesas, acompanhe o saldo dos registros pagos e consulte os relatórios do período. Comece pelo que aconteceu no seu negócio.",
      example: {
        question: "Quanto recebi neste mês?",
        answer:
          "Consulte as entradas do período e veja como elas se distribuíram ao longo dos dias.",
      },
      result: "Uma visão clara do movimento do seu dinheiro.",
      features: [
        "Receitas e despesas",
        "Pagos e pendentes",
        "Relatórios por período",
      ],
      details: [
        {
          title: "Do registro à visão do período",
          text: "Registre uma movimentação, confira as informações e acompanhe os totais. Voz e leitura de comprovantes ajudam na entrada de dados, conforme os recursos disponíveis na versão do app.",
        },
        {
          title: "Saiba o que está olhando",
          text: "Entradas recebidas mostram recebimentos registrados. O saldo dos registros pagos não representa, por si só, lucro ou saldo bancário sincronizado.",
        },
      ],
      screen: "relatorios",
      screenCaption: "Relatórios do aplicativo · dados fictícios",
    },
    {
      id: "estrategia",
      number: "02",
      name: "Estratégia com IA",
      title: "Uma dúvida pode virar o próximo passo.",
      problem:
        "Quando você cuida de tudo, sobra pouco tempo para analisar os números, investigar um problema ou decidir por onde começar.",
      solution:
        "Converse com o assistente sobre seus desafios. O perfil do negócio e os registros disponíveis dão contexto para explicações, diagnósticos e planos que você pode revisar.",
      example: {
        question: "Minha terça-feira tem pouco movimento. Por onde começo?",
        answer:
          "Investigue uma hipótese, escolha uma ação pequena para testar e acompanhe o resultado antes de mudar toda a rotina.",
      },
      result: "Uma direção para avaliar e colocar em prática.",
      features: [
        "Explicações em linguagem simples",
        "Diagnóstico do negócio",
        "Planos e prioridades",
      ],
      details: [
        {
          title: "A conversa começa com contexto",
          text: "As respostas sobre seu ramo, produtos, região e objetivos compõem o perfil do negócio. A assistência combina esse perfil com as informações disponíveis para a tarefa.",
        },
        {
          title: "Você continua decidindo",
          text: "A IA pode ajudar a organizar prioridades e propor ações. Confira os dados, avalie as hipóteses e adapte o plano ao tempo e aos recursos que você tem.",
        },
      ],
      screen: "assistente-ia",
      screenCaption: "Assistente de IA do aplicativo · tela demonstrativa",
    },
    {
      id: "marketing",
      number: "03",
      name: "Marketing",
      title: "Seu trabalho merece uma boa apresentação.",
      problem:
        "Você conhece seu produto. Mas decidir o que dizer, como apresentar a oferta e para quem divulgar pode deixar a comunicação sempre para depois.",
      solution:
        "Transforme o contexto do negócio em ideias de campanha, textos e criações visuais. Revise o rascunho, ajuste a mensagem e compartilhe quando estiver pronto.",
      example: {
        question:
          "Quero apresentar minhas marmitas a quem trabalha perto daqui.",
        answer:
          "Desenvolva uma mensagem sobre a oferta, confira as informações e escolha uma ação local para testar.",
      },
      result: "Uma mensagem ligada ao que você vende e a quem quer alcançar.",
      features: [
        "Ideias de divulgação",
        "Textos para campanhas",
        "Criações visuais revisáveis",
      ],
      details: [
        {
          title: "Uma oferta com contexto",
          text: "Ramo, produtos e região ajudam a formular ideias. Preço, prazo e condições precisam ser confirmados por você antes de compartilhar a divulgação.",
        },
        {
          title: "Da ideia ao material",
          text: "As funções de marketing e criação de imagens apoiam os rascunhos. O aplicativo permite revisar e exportar materiais; não publica campanhas automaticamente.",
        },
      ],
      screen: null,
      screenCaption: "Exemplo de uso · mensagem ilustrativa",
    },
  ],
  stepsTitle: "Comece pelo seu negócio. Avance no seu ritmo.",
  steps: [
    {
      number: "01",
      title: "Conte o que você faz",
      text: "Apresente seu negócio, seus produtos, sua região e o que precisa resolver.",
    },
    {
      number: "02",
      title: "Registre a rotina",
      text: "Organize entradas, saídas e compromissos conforme eles acontecem.",
    },
    {
      number: "03",
      title: "Peça ajuda com contexto",
      text: "Converse para entender os números, planejar uma ação ou criar uma divulgação.",
    },
    {
      number: "04",
      title: "Revise e coloque em prática",
      text: "Confira as sugestões, faça os ajustes e acompanhe o que funciona para você.",
    },
  ],
  company: {
    eyebrow: "A FinxiIT",
    title: "Tecnologia que entende o tamanho da sua responsabilidade.",
    intro:
      "Quem empreende muitas vezes atende, produz, entrega e administra. A FinxiIT existe para aproximar a inteligência de negócios dessa rotina, com linguagem clara e ferramentas que se conectam.",
    mission:
      "Tornar a gestão e a inteligência de negócios acessíveis, transformando informações do dia a dia em próximos passos simples.",
    vision:
      "Um futuro em que pequenos empreendedores possam planejar, decidir e divulgar com clareza, independentemente da experiência em gestão.",
    values: [
      {
        title: "Clareza",
        text: "Informação compreensível para tomar decisões.",
      },
      {
        title: "Contexto",
        text: "Ajuda que considera a realidade de cada negócio.",
      },
      {
        title: "Autonomia",
        text: "A tecnologia sugere. O empreendedor decide.",
      },
      {
        title: "Transparência",
        text: "Distinguir registros, hipóteses e recomendações.",
      },
    ],
  },
  ai: {
    title: "A inteligência começa no contexto.",
    text: "A FinxiIT conecta seu perfil, os registros disponíveis e a pergunta que você faz. A partir disso, direciona a tarefa para a função de assistência adequada.",
    flow: [
      "Seu negócio e seus registros",
      "Assistente FinxiIT",
      "Explicações, planos e criações",
    ],
    note: "As funções de IA dependem de internet e das integrações disponíveis na versão do app. As respostas precisam da sua revisão.",
    detailsTitle: "Como os modelos de IA são utilizados",
    details:
      "O aplicativo coordena serviços especializados. Groq e NVIDIA atendem funções de texto e planejamento; Gemini é reservado a pesquisas com fontes, com Tavily em buscas e notícias; Cloudflare Workers AI atende à criação de imagens. Essa arquitetura combina modelos externos, sem pressupor um modelo proprietário da FinxiIT. Os serviços ativos podem variar conforme a configuração da versão.",
    privacy:
      "Os registros e o histórico ficam no armazenamento privado do aparelho. As funções de IA enviam aos serviços externos o contexto utilizado na solicitação.",
  },
  faq: [
    {
      question: "Para quem a FinxiIT foi criada?",
      answer:
        "Para micro e pequenos empreendedores, prestadores de serviços e profissionais autônomos que precisam organizar a rotina e ter mais clareza para decidir. Você começa pelo contexto do seu próprio negócio.",
    },
    {
      question: "A IA decide ou faz tudo por mim?",
      answer:
        "A IA ajuda a explicar informações, elaborar planos e criar rascunhos. Você revisa e escolhe o que fazer. O aplicativo não movimenta dinheiro, não substitui contabilidade e não publica campanhas automaticamente.",
    },
    {
      question: "Como faço para baixar no Android?",
      answer:
        "Use o botão no final da página para acessar o canal de download da FinxiIT. Se ele ainda não estiver disponível, você verá um aviso ao clicar.",
    },
  ],
  download: {
    eyebrow: "FinxiIT para Android",
    title: "Seu negócio vai com você. A FinxiIT também.",
    text: "Leve seus números, suas ideias e seus próximos passos para a rotina.",
    action: "Baixar para Android",
    unavailable: "O download estará disponível aqui em breve.",
  },
  mediaNote:
    "Telas reais do aplicativo com dados fictícios. Exemplos de conversa são ilustrativos.",
};

export default siteContent;
