import { useEffect } from "react";

/**
 * Prevents default zoom behavior (zooming the entire page,
 *  including nav- and toolbar) when using the mouse wheel
 */
export default function usePreventZoom() {
  useEffect(() => {
    function preventZoom(e: WheelEvent) {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    }

    window.addEventListener("wheel", preventZoom, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventZoom);
    };
  }, []);
}