import { useEffect, useRef } from "react";

export function AutoplayVideo({ src, className }) {
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const retry = () => {
      video.muted = true;
      video.play()?.catch(() => {});
    };
    retry();
    const interval = window.setInterval(retry, 1000);
    document.addEventListener("click", retry, { once: true });
    document.addEventListener("touchstart", retry, {
      once: true,
      passive: true,
    });
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("click", retry);
      document.removeEventListener("touchstart", retry);
    };
  }, [src]);
  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
