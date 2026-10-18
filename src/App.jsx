import { useEffect, useRef, useState } from "react";
import { MotionConfig } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Menu,
  X,
  Check,
  Smartphone,
} from "lucide-react";
import { ZoomJourney } from "./cinematic/ZoomJourney";
import { BrazilNetwork } from "./cinematic/BrazilNetwork";
import { ScrollSequence, SequenceFilm } from "./finxi/ScrollScene";
import { company } from "./content/company";
import { businessPlan as plan } from "./content/business-plan";
import { cinematicContent as story } from "./cinematic/content";
import { Button } from "./components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/ui/accordion";

function Brand() {
  return (
    <a
      className="brand"
      href="#inicio"
      aria-label="FinxiIT, início"
      translate="no"
    >
      <img src="/assets/finxi_brand.webp" width="38" height="38" alt="" />
      <span>
        Finxi<span className="brand-it">IT</span>
      </span>
    </a>
  );
}
function Header() {
  const [open, setOpen] = useState(false);
  const button = useRef(null);
  useEffect(() => {
    if (!open) return;
    const key = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [open]);
  const links = [
    ["#empresa", "A empresa"],
    ["#para-quem", "Para quem"],
    ["#aplicativo", "O aplicativo"],
    ["#inteligencia", "A inteligência"],
  ];
  return (
    <header className="site-header">
      <Brand />
      <nav className="desktop-nav" aria-label="Navegação principal">
        {links.map(([href, text]) => (
          <a href={href} key={href}>
            {text}
          </a>
        ))}
      </nav>
      <a href="#download" className="header-download">
        Android <ArrowDown size={15} aria-hidden="true" />
      </a>
      <button
        ref={button}
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        aria-controls={open ? "mobile-navigation" : undefined}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="Navegação no celular"
        >
          {links.map(([href, text]) => (
            <a href={href} key={href} onClick={() => setOpen(false)}>
              {text}
            </a>
          ))}
          <a href="#download" onClick={() => setOpen(false)}>
            Baixar para Android
          </a>
        </nav>
      )}
    </header>
  );
}
function Company() {
  return (
    <>
      <section
        className="section company-section"
        id="empresa"
        aria-labelledby="company-title"
      >
        <div className="section-kicker">
          A empresa · tecnologia com propósito
        </div>
        <div className="company-intro">
          <h2 id="company-title">Cuidar do negócio também pode ser simples.</h2>
          <div>
            <p className="lead">{story.company.intro}</p>
            <p>
              Somos um projeto em desenvolvimento, com origem em Venda Nova do
              Imigrante, no Espírito Santo. Escutamos a realidade de quem
              empreende para construir uma ferramenta que caiba na rotina.
            </p>
            <a className="text-link" href="#para-quem">
              Conheça quem queremos ajudar{" "}
              <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="brand-origin">
          <div className="origin-symbol">
            <img
              src="/assets/finxi_brand_light.jpg"
              alt="Símbolo oficial da FinxiIT"
              width="640"
              height="640"
              loading="lazy"
            />
          </div>
          <div>
            <p className="section-kicker">O que o nosso nome carrega</p>
            <h3>{plan.origin.title}</h3>
            <p>{plan.origin.name}</p>
          </div>
        </div>
        <div className="mission-vision">
          <article>
            <h3>Nossa missão</h3>
            <p>{story.company.mission.text}</p>
          </article>
          <article>
            <h3>Nossa visão</h3>
            <p>{story.company.vision.text}</p>
          </article>
        </div>
      </section>
      <section
        className="section team-section"
        id="equipe"
        aria-labelledby="team-title"
      >
        <div className="team-heading">
          <p className="section-kicker">Quem dá forma à FinxiIT</p>
          <h2 id="team-title">
            Três frentes.
            <br />
            Um propósito em comum.
          </h2>
          <p>
            Coordenação, desenvolvimento e pesquisa conectam a ideia às
            necessidades de quem empreende.
          </p>
        </div>
        <div className="team-grid">
          {plan.team.map((person) => (
            <article key={person.name}>
              <span className="team-initials" aria-hidden="true">
                {person.initials}
              </span>
              <p className="team-role">{person.role}</p>
              <h3>{person.name}</h3>
              <p>{person.text}</p>
            </article>
          ))}
        </div>
        <p className="team-origin">{plan.origin.region}</p>
      </section>
      <section
        className="values-section section"
        aria-labelledby="values-title"
      >
        <div className="values-heading">
          <p>O que orienta nossas escolhas</p>
          <h2 id="values-title">
            Tecnologia com propósito.
            <br />
            Princípios na prática.
          </h2>
        </div>
        <div className="values-list">
          {story.company.values.map((v) => (
            <article key={v.title}>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
function Context() {
  const context = story.nationalContext;
  return (
    <section
      className="section context-section"
      id="para-quem"
      aria-labelledby="audience-title"
    >
      <div className="context-intro">
        <div>
          <p className="section-kicker">
            Um desafio brasileiro. Um começo regional.
          </p>
          <h2 id="audience-title">Mais clareza para quem cuida de tudo.</h2>
        </div>
        <div>
          <p className="lead">{story.audience.text}</p>
          <p>{context.text}</p>
          <a
            className="source-link"
            href={context.source.url}
            target="_blank"
            rel="noreferrer"
          >
            {context.source.label} <ArrowUpRight size={13} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="research-block" aria-labelledby="research-title">
        <div className="research-heading">
          <div>
            <p className="section-kicker">Escuta que orienta o produto</p>
            <h3 id="research-title">{plan.research.title}</h3>
          </div>
          <p>{plan.research.text}</p>
        </div>
        <div className="research-grid">
          {plan.research.metrics.map((metric) => (
            <article key={metric.label}>
              <strong>{metric.value}</strong>
              <h4>{metric.label}</h4>
              <p>{metric.response}</p>
            </article>
          ))}
        </div>
        <p className="research-note">{plan.research.note}</p>
      </div>
      <div className="audience-layout">
        <figure>
          <BrazilNetwork />
          <figcaption>
            Conexões ilustrativas de uma visão de futuro; não representam
            clientes ou cobertura atual. Mapa:{" "}
            <a
              href="https://servicodados.ibge.gov.br/api/docs/malhas?versao=3"
              target="_blank"
              rel="noreferrer"
            >
              IBGE
            </a>
            .
          </figcaption>
        </figure>
        <div className="audience-groups">
          {story.audience.groups.map((g) => (
            <article key={g.title}>
              <h3>{g.title}</h3>
              <p>{g.text}</p>
            </article>
          ))}
          <p className="audience-promise">{context.closing}</p>
        </div>
      </div>
    </section>
  );
}
const demos = [
  {
    id: "organizar",
    name: "Organize",
    file: "finxi-plan-organize",
    start: 0.05,
    title: "Cada movimento merece um lugar.",
    text: "A tela inicial do protótipo aproxima saldo, ações rápidas e resumo financeiro. O núcleo do lançamento será organizar receitas, despesas e compromissos.",
    caption: "Início: visão do negócio e ações rápidas.",
    position: "center",
  },
  {
    id: "entender",
    name: "Entenda",
    file: "finxi-plan-entenda",
    start: 0.05,
    title: "Os números contam uma história.",
    text: "A tela de Relatórios apresenta entradas recebidas e sua evolução no período. Os números precisam de registros corretos e de regras de cálculo que possam ser conferidas.",
    caption: "Relatórios: entradas recebidas e evolução por período.",
    position: "center",
  },
  {
    id: "conversar",
    name: "Converse",
    file: "finxi-plan-converse",
    start: 0.05,
    title: "A IA explica. Você escolhe.",
    text: "O assistente é um copiloto para explicar as informações e apoiar a avaliação de opções. As sugestões passam pela sua revisão; a decisão permanece com você.",
    caption: "Assistente de IA: sugestões de perguntas e conversa.",
    position: "center",
  },
];
function ScreenPreview({ id, title }) {
  const dialog = useRef(null);
  const screens = {
    organizar: "/assets/app-inicio.jpg",
    entender: "/assets/app-relatorios.jpg",
    conversar: "/assets/app-assistente.jpg",
  };
  return (
    <>
      <button
        className="screen-preview-button"
        onClick={() => dialog.current.showModal()}
        aria-haspopup="dialog"
      >
        Ampliar tela do app <ArrowUpRight size={13} aria-hidden="true" />
      </button>
      <dialog
        ref={dialog}
        className="screen-dialog"
        aria-label={`Tela original: ${title}`}
      >
        <button
          className="screen-dialog-close"
          onClick={() => dialog.current.close()}
          aria-label="Fechar tela ampliada"
        >
          <X aria-hidden="true" />
        </button>
        <p>{title}</p>
        <img
          src={screens[id]}
          width="626"
          height="1280"
          alt={`Captura original do aplicativo FinxiIT: ${title}`}
        />
        <span>Captura do app com dados demonstrativos.</span>
      </dialog>
    </>
  );
}
function AppDemo() {
  return (
    <section
      id="aplicativo"
      className="app-section"
      aria-labelledby="app-title"
    >
      <div className="section app-intro">
        <p className="section-kicker">O propósito ganha forma no aplicativo</p>
        <h2 id="app-title">
          O seu negócio.
          <br />
          Mais fácil de acompanhar.
        </h2>
        <p className="lead">{story.app.text}</p>
        <p className="product-stage">
          {plan.stage} · demonstrações ilustrativas
        </p>
      </div>
      <ScrollSequence id="demo-sequence" chapters={demos}>
        {({ active, jump, staticMode, near, progress }) => (
          <Tabs
            value={demos[active].id}
            onValueChange={(value) =>
              jump(demos.findIndex((d) => d.id === value))
            }
            className="demo-tabs"
          >
            <div className="demo-selector">
              <span>Explore o aplicativo</span>
              <TabsList aria-label="Demonstrações do aplicativo">
                {demos.map((d) => (
                  <TabsTrigger value={d.id} key={d.id}>
                    {d.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {demos.map((d, index) => (
              <TabsContent value={d.id} key={d.id} forceMount>
                <article
                  id={`demo-${d.id}`}
                  className="scene-stage"
                  aria-labelledby={`demo-title-${d.id}`}
                >
                  <div className="demo-copy">
                    <p className="section-kicker">{d.name} com a FinxiIT</p>
                    <h3 id={`demo-title-${d.id}`}>{d.title}</h3>
                    <p>{d.text}</p>
                    <a className="text-link" href="#recursos">
                      Veja os recursos{" "}
                      <ArrowDown size={16} aria-hidden="true" />
                    </a>
                  </div>
                  <figure className="scene-media">
                    <SequenceFilm
                      file={d.file}
                      progress={progress}
                      index={index}
                      count={demos.length}
                      start={d.start}
                      position={d.position}
                      label={d.caption}
                      staticMode={staticMode}
                      near={near}
                    />
                    <figcaption>
                      <span>{d.caption} Dados demonstrativos.</span>
                      <ScreenPreview id={d.id} title={d.name} />
                    </figcaption>
                  </figure>
                  {!staticMode && (
                    <div className="scene-controls">
                      <span>Role para explorar</span>
                      <button type="button" onClick={() => jump(index)}>
                        Rever filme
                      </button>
                      {index < demos.length - 1 ? (
                        <button type="button" onClick={() => jump(index + 1)}>
                          {demos[index + 1].name}{" "}
                          <span aria-hidden="true">↓</span>
                        </button>
                      ) : (
                        <a href="#recursos">
                          Continuar <span aria-hidden="true">↓</span>
                        </a>
                      )}
                    </div>
                  )}
                  {staticMode && (
                    <p className="static-note">
                      Imagem estática da demonstração.
                    </p>
                  )}
                </article>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </ScrollSequence>
      <div className="demo-footnote">
        Organize, Entenda e Converse: role para percorrer os três filmes e volte
        para rever. Apresentações baseadas nas telas do app, com dados
        demonstrativos.
      </div>
    </section>
  );
}
function Features() {
  return (
    <section
      className="section features-section"
      id="recursos"
      aria-labelledby="features-title"
    >
      <div className="features-heading">
        <p className="section-kicker">Onde a FinxiIT ajuda</p>
        <h2 id="features-title">
          Registre. Entenda.
          <br />
          Decida com mais clareza.
        </h2>
      </div>
      <div className="feature-rows">
        {company.pillars.map((p) => (
          <article key={p.id} className="feature-row">
            <div className="feature-name">
              <h3>{p.name}</h3>
              <p>{p.headline}</p>
            </div>
            <div className="feature-content">
              <h4>{p.problem}</h4>
              <p>{p.problemText}</p>
              <p className="feature-solution">{p.solution}</p>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>
                    <Check size={16} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <Accordion type="single" collapsible>
                <AccordionItem value={`exemplo-${p.id}`}>
                  <AccordionTrigger>
                    Como isso aparece na rotina
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>{p.example}</p>
                    <p className="note">{p.note}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function Intelligence() {
  return (
    <section
      className="section intelligence-section"
      id="inteligencia"
      aria-labelledby="ai-title"
    >
      <div className="ai-heading">
        <p className="section-kicker">A inteligência da FinxiIT</p>
        <h2 id="ai-title">
          A resposta começa
          <br />
          nos seus registros.
        </h2>
        <p className="lead">{company.ai.introduction}</p>
      </div>
      <div className="context-flow" aria-label="Como a assistência funciona">
        <article className="flow-input">
          <span>Você traz a realidade</span>
          <h3>Seu negócio</h3>
          <ul>
            {company.ai.contextItems.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </article>
        <div className="flow-connector" aria-hidden="true">
          →
        </div>
        <article className="flow-center">
          <img src="/assets/finxi_brand.webp" width="48" height="48" alt="" />
          <h3>Assistente FinxiIT</h3>
          <p>Explica as informações e oferece opções para você avaliar.</p>
        </article>
        <div className="flow-connector" aria-hidden="true">
          →
        </div>
        <article className="flow-output">
          <span>Você revisa e decide</span>
          <h3>Próximos passos</h3>
          <ul>
            <li>Uma explicação dos números</li>
            <li>Uma visão dos compromissos</li>
            <li>Uma opção para avaliar</li>
          </ul>
        </article>
      </div>
      <Accordion type="single" collapsible className="ai-details">
        <AccordionItem value="modelos">
          <AccordionTrigger>
            Como separam os cálculos e a inteligência artificial?
          </AccordionTrigger>
          <AccordionContent>
            <p>{company.ai.technologyText}</p>
            <div className="provider-grid">
              {company.ai.providers.map((p) => (
                <article key={p.task}>
                  <h4>{p.task}</h4>
                  <strong>{p.provider}</strong>
                  <p>{p.detail}</p>
                </article>
              ))}
            </div>
            <p className="note">{company.ai.availability}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="dados">
          <AccordionTrigger>
            Como ficam os dados e as decisões?
          </AccordionTrigger>
          <AccordionContent>
            <p>{company.ai.data}</p>
            <p>{company.ai.autonomy}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
function Journey() {
  return (
    <section className="section start-section" aria-labelledby="start-title">
      <div>
        <p className="section-kicker">O fluxo previsto para o aplicativo</p>
        <h2 id="start-title">
          Comece com
          <br />a sua realidade.
        </h2>
      </div>
      <ol>
        {company.journey.map((j) => (
          <li key={j.number}>
            <span>{j.number}</span>
            <h3>{j.title}</h3>
            <p>{j.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
function ProductDevelopment() {
  return (
    <section
      className="section development-section"
      id="evolucao"
      aria-labelledby="development-title"
    >
      <div className="development-heading">
        <p className="section-kicker">O produto e o caminho até o lançamento</p>
        <h2 id="development-title">
          Construir bem.
          <br />
          Validar de perto.
        </h2>
        <p className="lead">
          O plano começa pelo núcleo financeiro. A evolução acompanha o uso, a
          qualidade do serviço e a capacidade de atender.
        </p>
      </div>
      <div className="development-grid">
        {plan.roadmap.map((step, index) => (
          <article key={step.label}>
            <span className="development-number" aria-hidden="true">
              0{index + 1}
            </span>
            <p className="section-kicker">{step.label}</p>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
function Plans() {
  return (
    <section
      className="section plans-section"
      id="planos"
      aria-labelledby="plans-title"
    >
      <div className="plans-heading">
        <p className="section-kicker">Proposta comercial em validação</p>
        <h2 id="plans-title">
          Duas formas de
          <br />
          acompanhar o seu negócio.
        </h2>
        <p>
          Assinaturas mensais previstas, com preço e limites apresentados antes
          da contratação.
        </p>
      </div>
      <div className="plans-grid">
        {plan.plans.map((item, index) => (
          <article
            className={`plan-card${index ? " plan-pro" : ""}`}
            key={item.name}
          >
            <p className="plan-label">Plano proposto</p>
            <h3>{item.name}</h3>
            <p className="plan-purpose">{item.purpose}</p>
            <p className="plan-price">
              <span>R$</span> {item.price}
              <small>/mês</small>
            </p>
            <ul>
              {item.features.map((feature) => (
                <li key={feature}>
                  <Check size={17} aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
            <a className="text-link" href="#download">
              Acompanhe a disponibilidade{" "}
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
      <p className="plans-note">{plan.planNote}</p>
    </section>
  );
}
function Download() {
  const [url, setUrl] = useState("");
  const [notice, setNotice] = useState(false);
  useEffect(() => {
    const c = new AbortController();
    fetch("/site-config.json", { signal: c.signal })
      .then((r) => r.json())
      .then((c) => {
        try {
          const u = new URL(c.androidDownloadUrl);
          if (["https:", "http:"].includes(u.protocol)) setUrl(u.href);
        } catch {}
      })
      .catch(() => {});
    return () => c.abort();
  }, []);
  return (
    <section
      className="section download-section"
      id="download"
      aria-labelledby="download-title"
    >
      <div>
        <p className="section-kicker">FinxiIT para Android</p>
        <h2 id="download-title">
          O seu negócio
          <br />
          tem um próximo passo.
        </h2>
        <p>{company.download.text}</p>
        {url ? (
          <Button asChild className="download-button">
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Smartphone size={19} aria-hidden="true" />
              Baixar para Android
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
          </Button>
        ) : (
          <Button className="download-button" onClick={() => setNotice(true)}>
            <Smartphone size={19} aria-hidden="true" />
            Baixar para Android
            <ArrowUpRight size={19} aria-hidden="true" />
          </Button>
        )}
        <p role="status" className="download-status">
          {notice
            ? "O link oficial de download será disponibilizado aqui em breve."
            : company.download.status}
        </p>
      </div>
      <img
        className="download-mark"
        src="/assets/finxi_brand.webp"
        width="310"
        height="310"
        alt=""
        loading="lazy"
      />
    </section>
  );
}
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#empresa">
        Pular a abertura e conhecer a empresa
      </a>
      <Header />
      <main>
        <ZoomJourney />
        <Company />
        <Context />
        <AppDemo />
        <Features />
        <Intelligence />
        <Journey />
        <ProductDevelopment />
        <Plans />
        <Download />
      </main>
      <footer className="site-footer">
        <Brand />
        <p>
          Gestão simples. Decisões mais claras.
          <br />
          <span className="footer-stage">
            Projeto em desenvolvimento · {plan.date}
          </span>
        </p>
        <a href="#inicio">Voltar ao início ↑</a>
      </footer>
    </MotionConfig>
  );
}
