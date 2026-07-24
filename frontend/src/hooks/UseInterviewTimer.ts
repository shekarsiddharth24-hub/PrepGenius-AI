import { useEffect, useState } from "react";

export function useInterviewTimer() {
  const [elapsedSeconds, setElapsedSeconds] =
    useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    elapsedSeconds,
  };
}