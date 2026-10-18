import { useRef, useState } from "react";
import {
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { openingChapters as chapters } from "./opening-story";
import media from "./opening-media.json";
import { useScrollVideo } from "../finxi/useScrollVideo";
import "./zoom-journey.css";

function smooth(value) {
  const p = Math.max(0, Math.min(1, value));
  return p * p * (3 - 2 * p);
}
function copyMotion(progress, chapter, index) {
  const enter = index === 0 ? 1 : smooth((progress - chapter.start) / 0.035);
  const leave =
    index === chapters.length - 1
      ? 0
      : smooth((progress - chapters[index + 1].start + 0.04) / 0.04);
  return {
    opacity: enter * (1 - leave),
    transform: `translate3d(0, ${(1 - enter) * 22 - leave * 14}px, 0)`,
    "--copy-detail-y": `${(1 - smooth((progress - chapter.start - 0.008) / 0.027)) * (index === 0 ? 0 : 10)}px`,
  };
}
function Poster({ chapter, index, style }) {
  return (
    <div
      className={`journey-art journey-art-${index}${chapter.brandIcon ? " journey-brand-icon" : ""}${chapter.flatScreen ? " journey-app-screen" : ""}`}
      style={style}
    >
      <img
        src={chapter.image}
        alt={chapter.alt}
        width={chapter.flatScreen ? 575 : media.width || 1920}
        height={chapter.flatScreen ? 1280 : media.height || 1080}
        loading={index === 0 ? "eager" : "lazy"}
        fetchPriority={index === 0 ? "high" : "auto"}
      />
    </div>
  );
}
function ChapterText({ index, next, active = true }) {
  const chapter = chapters[index];
  const Heading = index === 0 ? "h1" : "h2";
  return (
    <>
      <Heading id={`journey-heading-${index}`}>{chapter.title}</Heading>
      <p>{chapter.text}</p>
      {index === chapters.length - 1 && (
        <a
          className="journey-purpose-link"
          href={next}
          tabIndex={active ? 0 : -1}
          aria-hidden={!active}
        >
          Conheça a FinxiIT <span aria-hidden="true">↓</span>
        </a>
      )}
    </>
  );
}
// Seeking follows scroll in both directions. The film always remains paused.
function OpeningFilm({ progress, currentProgress }) {
  const { videoRef, ready, failed, onError } = useScrollVideo({
    progress,
    enabled: Boolean(media.file),
    progressStart: media.progressStart || 0,
    endPadding: 0.04,
  });
  if (!media.file || failed) return null;
  return (
    <video
      ref={videoRef}
      src={`/media/${media.file}.mp4`}
      poster={`/media/${media.file}.jpg`}
      preload="auto"
      muted
      playsInline
      width={media.width || 1920}
      height={media.height || 1080}
      aria-hidden="true"
      className={`journey-film${ready ? " is-ready" : ""}`}
      style={{
        opacity: ready && currentProgress >= (media.progressStart || 0) ? 1 : 0,
      }}
      onError={onError}
    />
  );
}
export function ZoomJourney({ next = "#empresa" }) {
  const rig = useRef(null);
  const reduced = useReducedMotion();
  const [saveData] = useState(() => navigator.connection?.saveData === true);
  const staticMode = Boolean(reduced || saveData);
  const near = useInView(rig, { margin: "500px", once: true });
  const { scrollYProgress } = useScroll({
    target: rig,
    offset: ["start start", "end end"],
  });
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) =>
    setProgress(Math.max(0, Math.min(1, value))),
  );
  const active = chapters.reduce(
    (found, chapter, index) => (progress >= chapter.start ? index : found),
    0,
  );
  const jump = (value) => {
    const element = rig.current;
    if (!element) return;
    window.scrollTo({
      top:
        element.getBoundingClientRect().top +
        scrollY +
        Math.max(0, element.offsetHeight - innerHeight) * value,
      behavior: "instant",
    });
  };
  return (
    <section
      id="inicio"
      ref={rig}
      className={`zoom-journey${staticMode ? " zoom-journey-static" : ""}`}
      aria-label="FinxiIT: da nossa marca às pessoas e suas conexões"
    >
      {staticMode ? (
        chapters.map((chapter, index) => (
          <article
            key={chapter.name}
            className={`journey-static-panel journey-static-panel-${index}`}
            aria-labelledby={`journey-heading-${index}`}
          >
            <Poster chapter={chapter} index={index} />
            <div className="journey-photo-shade" />
            <div className="journey-static-copy">
              <ChapterText index={index} next={next} />
            </div>
          </article>
        ))
      ) : (
        <div className="journey-stage">
          <div className="journey-images" aria-hidden="true">
            {chapters.map((chapter, index) => {
              const from =
                index === 0
                  ? 1
                  : smooth((progress - chapter.start + 0.035) / 0.07);
              const to =
                index === chapters.length - 1
                  ? 1
                  : 1 -
                    smooth(
                      (progress - chapters[index + 1].start + 0.035) / 0.07,
                    );
              return (
                <Poster
                  key={chapter.name}
                  chapter={chapter}
                  index={index}
                  style={{
                    opacity: Math.min(from, to),
                    transform: `scale(${1 + Math.max(0, progress - chapter.start) * 0.14})`,
                  }}
                />
              );
            })}
            {near && (
              <OpeningFilm
                progress={scrollYProgress}
                currentProgress={progress}
              />
            )}
            <div className="journey-photo-shade" />
          </div>
          {chapters.map((chapter, index) => (
            <div
              key={chapter.name}
              className={`journey-copy journey-copy-${index}`}
              aria-hidden={active !== index}
              style={{
                ...copyMotion(progress, chapter, index),
                ...(active !== index ? { opacity: 0 } : {}),
              }}
            >
              <ChapterText
                index={index}
                next={next}
                active={active === index}
              />
            </div>
          ))}
          <div className="journey-navigation">
            <div
              className="journey-chapters"
              aria-label="Momentos da apresentação"
            >
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.name}
                  type="button"
                  aria-current={active === index ? "step" : undefined}
                  onClick={() => jump(chapter.jump)}
                >
                  {chapter.name}
                </button>
              ))}
            </div>
            <p className="journey-scroll-hint">
              Role para explorar <span aria-hidden="true">↓</span>
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
