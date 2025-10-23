"use client";

import React, { memo, useMemo } from "react";
import { useBackgroundEffect } from "../hooks/useBackgroundEffect";
import backgroundStyles from "../ProfileBackground.module.css";

interface OptimizedProfileBackgroundProps {
  variant?: "minimal" | "default" | "intense";
  className?: string;
  enablePerformanceMode?: boolean;
}

const OptimizedProfileBackground: React.FC<OptimizedProfileBackgroundProps> =
  memo(
    ({ variant = "default", className = "", enablePerformanceMode = true }) => {
      const backgroundConfig = useMemo(
        () => ({
          intensity:
            variant === "minimal"
              ? ("low" as const)
              : variant === "intense"
                ? ("high" as const)
                : ("medium" as const),
          enableParticles: variant === "intense",
          animationSpeed:
            variant === "minimal" ? ("slow" as const) : ("normal" as const),
        }),
        [variant],
      );

      const {
        isVisible,
        performance,
        showParticles,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        intensityClass,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        toggleVisibility,
      } = useBackgroundEffect(backgroundConfig);

      const backgroundClasses = useMemo(() => {
        const classes = [backgroundStyles.backgroundWrapper];

        if (className) classes.push(className);
        if (!isVisible) classes.push(backgroundStyles.hidden);
        if (performance === "low")
          classes.push(backgroundStyles.lowPerformance);

        return classes.join(" ");
      }, [className, isVisible, performance]);

      // Don't render if performance mode is enabled and device is low-end
      if (
        enablePerformanceMode &&
        performance === "low" &&
        variant === "intense"
      ) {
        return null;
      }

      return (
        <>
          {/* Main background effect */}
          {isVisible && (
            <div
              className={backgroundClasses}
              style={
                {
                  "--animation-duration": `${backgroundConfig.animationSpeed === "slow" ? 30 : 20}s`,
                } as React.CSSProperties
              }
            />
          )}

          {/* Gradient overlay */}
          <div className={backgroundStyles.gradientOverlay} />

          {/* Floating particles for high-end devices */}
          {showParticles && (
            <div className={backgroundStyles.floatingParticles} />
          )}

          {/* Remove debug button completely - this was causing the purple element */}
          {/* ... deleted code ... (removed debug button that was appearing in top-left corner) */}
        </>
      );
    },
  );

OptimizedProfileBackground.displayName = "OptimizedProfileBackground";

export default OptimizedProfileBackground;
