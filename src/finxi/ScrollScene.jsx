import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useScrollVideo } from "./useScrollVideo";

function Film({ file, progress, start, position, label, staticMode, near }) {
  const { videoRef, ready, failed, onError } = useScrollVideo({
    progress,
    start,
    enabled: near && !staticMode,
  });
  return (
    <div className="scene-film" style={{ "--film-position": position }}>
      <img
        src={`/media/${file}-end.jpg`}
        alt={label}
        width="1280"
        height="720"
      />
      {!staticMode && !failed && near && (
        <video
          ref={videoRef}
          src={`/media/${file}.mp4`}
          poster={`/media/${file}-end.jpg`}
          preload="auto"
          muted
          playsInline
          width="1280"
          height="720"
          aria-hidden="true"
          className={ready ? "is-ready" : ""}
          onError={onError}
        />
      )}
    </div>
  );
}
export function SequenceFilm({ progress, index, count, ...props }) {
  // Finish each film before the next chapter takes over, in either direction.
  const localProgress = useTransform(progress, (value) =>
    Math.max(0, Math.min(1, (value * count - index) / 0.95)),
  );
  return <Film {...props} progress={localProgress} />;
}

export function ScrollSequence({ id, chapters, children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [saveData] = useState(() => navigator.connection?.saveData === true);
  const staticMode = Boolean(reduce || saveData);
  const near = useInView(ref, { margin: "500px", once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);
  const select = (index) => {
    setActive(index);
    const url = new URL(location.href);
    if (url.searchParams.get("demo") !== chapters[index].id) {
      url.searchParams.set("demo", chapters[index].id);
      history.replaceState(null, "", url);
    }
  };
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (staticMode) return;
    select(
      Math.min(chapters.length - 1, Math.floor(value * chapters.length + 1e-6)),
    );
  });
  const jump = (index) => {
    if (index < 0 || index >= chapters.length) return;
    if (staticMode) {
      select(index);
      return;
    }
    const e = ref.current;
    window.scrollTo({
      top:
        e.getBoundingClientRect().top +
        scrollY +
        (e.offsetHeight - innerHeight) * (index / chapters.length) +
        (index > 0 ? 1 : 0),
      behavior: "instant",
    });
    select(index);
  };
  useEffect(() => {
    const sync = () => {
      const value = new URLSearchParams(location.search).get("demo");
      const index = chapters.findIndex((chapter) => chapter.id === value);
      if (index >= 0) jump(index);
    };
    const frame = requestAnimationFrame(sync);
    window.addEventListener("popstate", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("popstate", sync);
    };
  }, [staticMode, chapters]);
  return (
    <div
      id={id}
      ref={ref}
      className={`scroll-scene app-demo demo-sequence${staticMode ? " scene-static" : ""}`}
    >
      <div className="demo-sequence-stage">
        {children({
          active,
          jump,
          staticMode,
          near,
          progress: scrollYProgress,
        })}
      </div>
    </div>
  );
}
