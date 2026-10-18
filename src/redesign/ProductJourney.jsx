import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  ChartNoAxesCombined,
  LayoutDashboard,
  MessageCircle,
} from "lucide-react";
import "./product-journey.css";

export const productJourneySteps = [
  {
    id: "organize",
    label: "Organize",
    screen: "Início",
    title: "O seu dia começa com uma visão do todo.",
    description:
      "Saldo, receitas, despesas e ações rápidas reunidos. Abra o app e encontre o que precisa para acompanhar a rotina do negócio.",
    detail:
      "Do registro de uma despesa à consulta do extrato, o próximo passo está à mão.",
    file: "finxi-app-home",
    position: "86% center",
    alt: "Tela inicial da FinxiIT com saldo disponível, ações rápidas e resumo financeiro.",
  },
  {
    id: "enxergue",
    label: "Enxergue",
    screen: "Relatórios",
    title: "Números que ajudam a entender o caminho.",
    description:
      "Consulte o desempenho financeiro e acompanhe os registros do período. Uma visão organizada para perceber o que entra, o que sai e o que merece atenção.",
    detail:
      "Os relatórios dão contexto às decisões; a qualidade da análise começa nos seus registros.",
    file: "finxi-app-reports",
    position: "50% center",
    alt: "Tela de relatórios financeiros da FinxiIT com indicadores e gráficos.",
  },
  {
    id: "converse",
    label: "Converse",
    screen: "Assistente",
    title: "Uma conversa para encontrar o próximo passo.",
    description:
      "Peça ajuda para entender gastos, organizar um orçamento ou interpretar um relatório. A proposta da IA é aproximar a gestão da linguagem que você usa todos os dias.",
    detail:
      "A IA apoia sua análise. Você confere as informações e decide o que faz sentido para o negócio.",
    file: "finxi-app-assistant",
    position: "50% center",
    alt: "Assistente de IA da FinxiIT com sugestões para analisar gastos e organizar o orçamento.",
  },
];
const icons = [LayoutDashboard, ChartNoAxesCombined, MessageCircle];

function JourneyFilm({ step, index, active, progress }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video || failed) return;
    let frame = 0;
    let wanted = Math.max(0, Math.min(1, progress.get() * 3 - index));
    function seek() {
      frame = 0;
      if (video.seeking || !Number.isFinite(video.duration)) return;
      const target = 0.05 + wanted * Math.max(0, video.duration - 0.09);
      if (Math.abs(video.currentTime - target) > 0.025)
        video.currentTime = target;
      else if (video.readyState >= 2) setReady(true);
    }
    function schedule() {
      if (!frame) frame = requestAnimationFrame(seek);
    }
    function update(value) {
      wanted = Math.max(0, Math.min(1, value * 3 - index));
      schedule();
    }
    function complete() {
      setReady(true);
      schedule();
    }
    const unsubscribe = progress.on("change", update);
    video.addEventListener("loadedmetadata", schedule);
    video.addEventListener("loadeddata", schedule);
    video.addEventListener("seeked", complete);
    schedule();
    return () => {
      unsubscribe();
      cancelAnimationFrame(frame);
      video.removeEventListener("loadedmetadata", schedule);
      video.removeEventListener("loadeddata", schedule);
      video.removeEventListener("seeked", complete);
    };
  }, [index, progress, failed]);
  return (
    <div
      className={`journey-film-layer${active ? " is-current" : ""}`}
      aria-hidden={!active}
      style={{ "--journey-position": step.position }}
    >
      <img
        src={`/media/${step.file}-mid.jpg`}
        alt={failed ? step.alt : ""}
        width="1920"
        height="1080"
      />
      {!failed && (
        <video
          ref={ref}
          src={`/media/${step.file}.mp4`}
          poster={`/media/${step.file}-mid.jpg`}
          preload="auto"
          muted
          playsInline
          width="1920"
          height="1080"
          className={ready ? "is-ready" : ""}
          aria-label={step.alt}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function StepCopy({ step, index }) {
  const Icon = icons[index];
  return (
    <div className="journey-copy">
      <div className="journey-screen">
        <Icon size={18} aria-hidden="true" />
        {step.screen}
      </div>
      <h3>{step.title}</h3>
      <p>{step.description}</p>
      <p className="journey-detail">{step.detail}</p>
    </div>
  );
}

export function ProductJourney({ steps, nextId = "inteligencia" }) {
  const content =
    steps?.length === 3
      ? steps.map((step, index) => ({ ...productJourneySteps[index], ...step }))
      : productJourneySteps;
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [shortScreen, setShortScreen] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-height: 639px)").matches,
  );
  useEffect(() => {
    const query = window.matchMedia("(max-height: 639px)");
    const update = () => setShortScreen(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const near = useInView(ref, { margin: "600px", once: true });
  const [saveData] = useState(
    () =>
      typeof navigator !== "undefined" &&
      navigator.connection?.saveData === true,
  );
  const staticMode = reduce || saveData || shortScreen;
  const [value, setValue] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useEffect(() => scrollYProgress.on("change", setValue), [scrollYProgress]);
  const index = Math.min(2, Math.max(0, Math.floor(value * 3)));
  const active = content[index];
  const jump = (fraction) => {
    const section = ref.current;
    if (!section) return;
    window.scrollTo({
      top:
        section.getBoundingClientRect().top +
        window.scrollY +
        (section.offsetHeight - window.innerHeight) * fraction,
      behavior: "instant",
    });
  };
  return (
    <section
      id="jornada"
      ref={ref}
      className={`product-journey${staticMode ? " journey-static" : ""}`}
      aria-labelledby="journey-title"
    >
      {staticMode ? (
        <div className="journey-static-inner">
          <div className="journey-static-heading">
            <h2 id="journey-title">Conheça a FinxiIT por dentro.</h2>
            <a href={`#${nextId}`}>
              Continuar <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          {content.map((step, i) => (
            <article className="journey-static-step" key={step.id}>
              <StepCopy step={step} index={i} />
              <img
                src={`/media/${step.file}-mid.jpg`}
                alt={step.alt}
                width="1920"
                height="1080"
                loading="lazy"
                style={{ objectPosition: step.position }}
              />
            </article>
          ))}
        </div>
      ) : (
        <div className="journey-stage">
          <header className="journey-heading">
            <h2 id="journey-title">A FinxiIT, na prática.</h2>
            <a href={`#${nextId}`}>
              Pular apresentação <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </header>
          <div className="journey-body">
            <StepCopy step={active} index={index} />
            <figure className="journey-visual">
              <div className="journey-film">
                {near ? (
                  content.map((step, i) =>
                    i >= index && i <= index + 1 ? (
                      <JourneyFilm
                        key={step.id}
                        step={step}
                        index={i}
                        active={i === index}
                        progress={scrollYProgress}
                      />
                    ) : null,
                  )
                ) : (
                  <img
                    className="journey-waiting"
                    src={`/media/${active.file}-mid.jpg`}
                    alt={active.alt}
                    width="1920"
                    height="1080"
                    loading="lazy"
                    style={{ objectPosition: active.position }}
                  />
                )}
              </div>
              <figcaption>
                Telas do app em demonstração. Valores ilustrativos.
              </figcaption>
            </figure>
          </div>
          <footer className="journey-controls">
            <nav className="journey-chapters" aria-label="Etapas do aplicativo">
              {content.map((step, i) => (
                <button
                  type="button"
                  key={step.id}
                  aria-current={i === index ? "step" : undefined}
                  onClick={() => jump((i + 0.03) / 3)}
                >
                  <span className="journey-chapter-index" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span>{step.label}</span>
                  <span className="journey-chapter-screen">{step.screen}</span>
                </button>
              ))}
            </nav>
            <div className="journey-scrubber">
              <label htmlFor="journey-progress">
                <ArrowDown size={13} aria-hidden="true" /> Role para explorar
                <span>{Math.round(value * 100)}%</span>
              </label>
              <input
                id="journey-progress"
                type="range"
                min="0"
                max="100"
                value={Math.round(value * 100)}
                onChange={(event) => jump(Number(event.target.value) / 100)}
                aria-label="Progresso da apresentação do aplicativo"
                aria-valuetext={`${Math.round(value * 100)} por cento. ${active.label}: ${active.screen}`}
              />
            </div>
          </footer>
          <motion.div
            className="journey-progress-line"
            style={{ scaleX: scrollYProgress }}
            aria-hidden="true"
          />
        </div>
      )}
    </section>
  );
}

export default ProductJourney;
