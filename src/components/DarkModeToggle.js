import React, { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import "./Darkmode.css";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleDarkMode = (checked) => {
    setIsDarkMode(checked);
    document.body.classList.toggle("dark-mode", checked);
    document.body.classList.toggle("light-mode", !checked);
  };

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="modern-dark-toggle" title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
      <DarkModeSwitch
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={28}
        sunColor="#facc15"
        moonColor="#0f172a"
      />
    </div>
  );
};

export default DarkModeToggle;
