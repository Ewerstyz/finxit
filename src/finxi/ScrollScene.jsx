import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

function Film({ file, progress, start, position, label, staticMode, near }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video || staticMode || failed) return;
    let wanted = progress.get();
    let frame = 0;
    const seek = () => {
      frame = 0;
      if (!Number.isFinite(video.duration) || video.seeking) return;
      const from = Math.min(start, video.duration - 0.05);
      const time = from + wanted * Math.max(0, video.duration - from - 0.05);
      if (Math.abs(video.currentTime - time) > 0.025) video.currentTime = time;
      else if (video.readyState >= 2) setReady(true);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(seek);
    };
    const complete = () => {
      setReady(true);
      schedule();
    };
    const unsubscribe = progress.on("change", (value) => {
      wanted = Math.max(0, Math.min(1, value));
      schedule();
    });
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
  }, [progress, start, staticMode, failed, near]);
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
          ref={ref}
          src={`/media/${file}.mp4`}
          poster={`/media/${file}-end.jpg`}
          preload="auto"
          muted
          playsInline
          width="1280"
          height="720"
          aria-hidden="true"
          className={ready ? "is-ready" : ""}
          onError={() => setFailed(true)}
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
  const [short, setShort] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(
        "(max-height:639px), (max-width:700px) and (max-height:739px)",
      ).matches,
  );
  useEffect(() => {
    const query = matchMedia(
      "(max-height:639px), (max-width:700px) and (max-height:739px)",
    );
    const update = () => setShort(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const [saveData] = useState(() => navigator.connection?.saveData === true);
  const staticMode = Boolean(reduce || short || saveData);
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
