import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const behavior = prefersReducedMotion ? "auto" : "smooth";

    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return undefined;
    }

    const targetId = decodeURIComponent(hash.slice(1));
    let frameId;
    let correctionFrameId;
    let timeoutId;
    let observer;
    let resizeObserver;

    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (!target) return false;

      target.scrollIntoView({ behavior, block: "start" });
      return true;
    };

    const keepTargetAligned = () => {
      window.cancelAnimationFrame(correctionFrameId);
      correctionFrameId = window.requestAnimationFrame(scrollToTarget);
    };

    const stopObserving = () => {
      observer?.disconnect();
      resizeObserver?.disconnect();
    };

    frameId = window.requestAnimationFrame(() => {
      scrollToTarget();
      observer = new MutationObserver(() => {
        keepTargetAligned();
      });
      observer.observe(document.body, { childList: true, subtree: true });

      resizeObserver = new ResizeObserver(keepTargetAligned);
      resizeObserver.observe(document.body);

      timeoutId = window.setTimeout(stopObserving, 5000);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(correctionFrameId);
      window.clearTimeout(timeoutId);
      stopObserving();
    };
  }, [hash, pathname]);

  return null;
}
