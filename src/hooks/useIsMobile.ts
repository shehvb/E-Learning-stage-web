import { useEffect, useState } from "react";

/**
 * Hook to detect whether the user is on a mobile viewport (max-width: 767px).
 *
 * Uses matchMedia('(max-width: 767px)') rather than window resize listeners.
 * Returns `boolean | undefined` — initially `undefined` until the first client measurement
 * to avoid layout flash on load.
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(max-width: 767px)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");

    const onChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    // Keep state in sync
    setIsMobile(mql.matches);

    // Subscribe to breakpoint transitions
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    } else {
      // Fallback for older browsers
      mql.addListener(onChange);
      return () => mql.removeListener(onChange);
    }
  }, []);

  return isMobile;
}
