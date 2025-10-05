"use client";
import React, { useEffect, useMemo, useCallback } from "react";

import dynamic from "next/dynamic";
import AOS from "aos";
import "aos/dist/aos.css";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="robot-3d" />,
});

export default function Page() {
  // Memoize AOS configuration to prevent recreation on every render
  const aosConfig = useMemo(
    () => ({
      // Global settings:
      disable: false,
      startEvent: "DOMContentLoaded" as const,
      initClassName: "aos-init",
      animatedClassName: "aos-animate",
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,

      // Settings that can be overridden per element:
      offset: 120,
      delay: 0,
      duration: 400,
      easing: "ease" as const,
      once: true, // Changed to true to prevent repeated animations and reduce memory usage
      mirror: false,
      anchorPlacement: "top-bottom" as const,
    }),
    [],
  );

  // Memoize common AOS attributes to prevent object recreation
  const commonAosProps = useMemo(
    () => ({
      "data-aos": "fade-zoom-in",
      "data-aos-easing": "ease-in-back",
      "data-aos-delay": "300",
      "data-aos-offset": "0",
    }),
    [],
  );

  // Cleanup function for AOS
  const cleanupAOS = useCallback(() => {
    if (typeof window !== "undefined" && AOS) {
      AOS.refresh();
    }
  }, []);

  useEffect(() => {
    document.title = "WondrJob";
    AOS.init(aosConfig);

    // Cleanup function
    return () => {
      cleanupAOS();
    };
  }, [aosConfig, cleanupAOS]);

  // Memoize video props to prevent recreation
  const videoProps = useMemo(
    () => ({
      className: "back-vid",
      autoPlay: true,
      muted: true,
      playsInline: true,
      loop: true,
      preload: "metadata" as const, // Optimize video loading
    }),
    [],
  );

  return (
    <div className="container">
      <div className="body">
        <video {...videoProps}>
          <source src="/galaxy.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="blackhole-box">
          <video autoPlay muted loop>
            <source src="/blackhole.mp4" type="video/mp4" />
          </video>
        </div>

        <main className="main-content">
          <div className="content">
            <div
              {...commonAosProps}
              data-aos-duration="1500"
              className="tag-box"
            >
              <div className="tag">INTRODUCING</div>
              <h1
                {...commonAosProps}
                data-aos-duration="2000"
                className="text-bold-h1"
              >
                <br />
                <br />
                EMAIL <br /> YOUR JOBS
              </h1>
              <p
                {...commonAosProps}
                data-aos-duration="2500"
                className="description"
              >
                WondrJob links job seekers with employers for easy hiring.
              </p>
              <div
                {...commonAosProps}
                data-aos-duration="3000"
                className="btns"
              >
                <a href="/stat-chart" className="btn-get-started">
                  Documentation
                </a>
                <a href="/sign-in" className="btn-signing-main">
                  Start
                </a>
              </div>
            </div>
          </div>
        </main>
        <Spline
          {...commonAosProps}
          data-aos-duration="3000"
          className="robot-3d"
          scene="https://prod.spline.design/Bu5fDnoYxikxjlDm/scene.splinecode"
        />
      </div>
    </div>
  );
}
