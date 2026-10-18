import { useEffect, useRef, useState } from "react";

const clamp = (value) => Math.max(0, Math.min(1, value));

// Keep the latest scroll target while the decoder finishes its current seek.
export function useScrollVideo({
  progress,
  enabled = true,
  start = 0,
  progressStart = 0,
  endPadding = 0.05,
}) {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled || failed) return;
    let wanted = clamp(progress.get());
    let frame = 0;
    let disposed = false;
    let priming = false;
    setReady(false);
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "");

    const seek = () => {
      frame = 0;
      if (
        disposed ||
        priming ||
        video.readyState < 1 ||
        !Number.isFinite(video.duration) ||
        video.seeking
      )
        return;
      const end = Math.max(0, video.duration - endPadding);
      const from = Math.max(0, Math.min(start, end));
      const local = clamp((wanted - progressStart) / (1 - progressStart));
      const time = from + local * (end - from);
      if (Math.abs(video.currentTime - time) > 0.025) {
        video.currentTime = time;
      } else if (video.readyState >= 2) {
        setReady(true);
      }
    };
    const schedule = () => {
      if (!disposed && !frame) frame = requestAnimationFrame(seek);
    };
    const complete = () => {
      if (video.readyState >= 2) setReady(true);
      schedule();
    };

    // Some mobile browsers defer decoding until a gesture, despite preload.
    // Prime only a visible film that has no frame yet, then pause immediately.
    const unlock = () => {
      if (disposed || priming || video.readyState >= 2) return;
      const box = video.getBoundingClientRect();
      if (
        !box.width ||
        !box.height ||
        box.bottom <= 0 ||
        box.top >= innerHeight
      )
        return;
      priming = true;
      try {
        Promise.resolve(video.play()).then(
          () => {
            video.pause();
            priming = false;
            schedule();
          },
          () => {
            priming = false;
            schedule();
          },
        );
      } catch {
        priming = false;
        schedule();
      }
    };
    const unsubscribe = progress.on("change", (value) => {
      wanted = clamp(value);
      schedule();
    });
    const loadEvents = [
      "loadedmetadata",
      "loadeddata",
      "canplay",
      "durationchange",
    ];
    loadEvents.forEach((event) => video.addEventListener(event, complete));
    video.addEventListener("seeked", complete);
    const gestures = ["touchstart", "pointerdown", "keydown"];
    gestures.forEach((event) =>
      window.addEventListener(event, unlock, { passive: true }),
    );
    if (video.readyState === 0) video.load();
    schedule();
    return () => {
      disposed = true;
      unsubscribe();
      cancelAnimationFrame(frame);
      video.pause();
      loadEvents.forEach((event) => video.removeEventListener(event, complete));
      video.removeEventListener("seeked", complete);
      gestures.forEach((event) => window.removeEventListener(event, unlock));
    };
  }, [progress, enabled, start, progressStart, endPadding, failed]);

  return { videoRef, ready, failed, onError: () => setFailed(true) };
}
