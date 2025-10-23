"use client";

import { useEffect, useState } from "react";

interface BackgroundEffectOptions {
  intensity?: "low" | "medium" | "high";
  enableParticles?: boolean;
  animationSpeed?: "slow" | "normal" | "fast";
}

export const useBackgroundEffect = (options: BackgroundEffectOptions = {}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [performance, setPerformance] = useState<"high" | "medium" | "low">(
    "high",
  );

  useEffect(() => {
    // Check device performance
    const checkPerformance = () => {
      const canvas = document.createElement("canvas");
      const gl = (canvas.getContext("webgl") ||
        canvas.getContext(
          "experimental-webgl",
        )) as WebGLRenderingContext | null;

      if (!gl) {
        setPerformance("low");
        return;
      }

      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        if (renderer.includes("Intel") || renderer.includes("Software")) {
          setPerformance("medium");
        }
      }
    };

    checkPerformance();

    // Handle visibility change
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Handle reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleReducedMotion = (e: MediaQueryListEvent) => {
      setIsVisible(!e.matches);
    };

    mediaQuery.addEventListener("change", handleReducedMotion);
    if (mediaQuery.matches) {
      setIsVisible(false);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mediaQuery.removeEventListener("change", handleReducedMotion);
    };
  }, []);

  const getAnimationDuration = () => {
    const { animationSpeed = "normal" } = options;
    const baseSpeed = {
      slow: 30,
      normal: 20,
      fast: 15,
    };

    return performance === "low"
      ? baseSpeed[animationSpeed] * 1.5
      : baseSpeed[animationSpeed];
  };

  const shouldShowParticles = () => {
    return options.enableParticles && performance === "high" && isVisible;
  };

  const getIntensityClass = () => {
    const { intensity = "medium" } = options;
    if (performance === "low") return "low";
    return intensity;
  };

  return {
    isVisible,
    performance,
    animationDuration: getAnimationDuration(),
    showParticles: shouldShowParticles(),
    intensityClass: getIntensityClass(),
    toggleVisibility: () => setIsVisible(!isVisible),
  };
};
