import React, { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import './Darkmode.css'; // Assuming you have a CSS file for styling

const DarkModeToggle = () => {
  // State to handle dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Prefer saved theme, else system preference
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Toggle dark mode
  const toggleDarkMode = (checked) => {
    setIsDarkMode(checked);
    document.body.classList.toggle("dark-mode", checked);
    document.body.classList.toggle("light-mode", !checked);
  };

  // Persist and apply theme on mount and change
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="dark-mode-toggle" title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
      <DarkModeSwitch
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={30}
        sunColor="#fbbf24"
        moonColor="#2563eb"
      />
    </div>
  );
};

export default DarkModeToggle;