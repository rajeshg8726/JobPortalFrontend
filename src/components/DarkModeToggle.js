// Import necessary libraries
import React, { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import './Stylesheet.css';

const DarkModeToggle = () => {
  // State to handle dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = (checked) => {
    setIsDarkMode(checked);
    // Set the theme in localStorage or apply changes to your app
    document.body.className = checked ? "dark-mode" : "light-mode";
  };

  // Persist the theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.body.className = savedTheme === "dark" ? "dark-mode" : "light-mode";
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <div className="dark-mode-toggle">
      <DarkModeSwitch
        checked={isDarkMode}
        onChange={toggleDarkMode}
        size={30} // You can adjust the size of the toggle
      />
    </div>
  );
};

export default DarkModeToggle;
