import { useState, useEffect } from "react";

/**
 * Reusable hook to simulate initial data fetching with a skeleton state.
 * Encapsulates the timer lifecycle to ensure uniform behavior across
 * mobile screens in a modular monolithic structure.
 *
 * @param durationMs Duration in ms to display skeleton (default: 700ms)
 * @returns boolean indicating whether the screen is currently loading
 */
export function useMobileScreenLoading(durationMs: number = 700): boolean {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs]);

  return isLoading;
}
