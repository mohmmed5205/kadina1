import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";

const MODAL_EVENT = "kadina:modal-state";

export default function SmoothScroll() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasEnoughMemory =
      !navigator.deviceMemory || navigator.deviceMemory >= 4;

    if (!hasFinePointer || !hasEnoughMemory) return undefined;

    let disposed = false;
    let lenis;

    const handleModalState = (event) => {
      if (!lenis) return;
      if (event.detail?.open) lenis.stop();
      else lenis.start();
    };

    window.addEventListener(MODAL_EVENT, handleModalState);

    import("lenis").then(({ default: Lenis }) => {
      if (disposed) return;

      lenis = new Lenis({
        autoRaf: true,
        duration: 0.82,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 0.82,
      });

      if (document.body.dataset.modalOpen === "true") lenis.stop();
    });

    return () => {
      disposed = true;
      window.removeEventListener(MODAL_EVENT, handleModalState);
      lenis?.destroy();
    };
  }, [shouldReduceMotion]);

  return null;
}

export { MODAL_EVENT };
