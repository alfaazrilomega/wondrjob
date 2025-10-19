"use client";

import { useState, useEffect } from "react";

// A simple function to read a cookie. In a real app, you might use a library like js-cookie.
const getCookie = (name: string): string | undefined => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return decodeURIComponent(parts.pop()?.split(";").shift() || "");
};

const SimulationBanner = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedUserName, setSimulatedUserName] = useState("");

  useEffect(() => {
    const simulationCookie = getCookie("simulation_mode");
    const nameCookie = getCookie("simulated_user_name");
    if (simulationCookie === "true" && nameCookie) {
      setIsSimulating(true);
      setSimulatedUserName(nameCookie);
    }
  }, []);

  const handleExit = async () => {
    const response = await fetch("/api/auth/simulate/exit", {
      method: "POST",
    });

    if (response.ok) {
      window.location.href = "/admin"; // Redirect to admin dashboard after exiting
    } else {
      alert("Failed to exit simulation.");
    }
  };

  if (!isSimulating) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-4 py-2 bg-yellow-500/80 backdrop-blur-md border-b border-yellow-600 shadow-lg"
      style={{ color: "#000" }}
    >
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-3"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-bold">
          You are in Simulation Mode as {simulatedUserName}.
        </span>
      </div>
      <button
        onClick={handleExit}
        className="px-4 py-1.5 font-semibold text-sm bg-black/20 text-white rounded-md hover:bg-black/40 transition-colors"
      >
        Exit Simulation
      </button>
    </div>
  );
};

export default SimulationBanner;
