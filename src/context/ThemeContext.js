import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('blue');

  useEffect(() => {
    const savedTheme = localStorage.getItem('fitness-dashboard-theme');
    const savedColor = localStorage.getItem('fitness-dashboard-color');
    
    if (savedTheme) setTheme(savedTheme);
    if (savedColor) setPrimaryColor(savedColor);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('fitness-dashboard-theme', newTheme);
  };

  const changePrimaryColor = (color) => {
    setPrimaryColor(color);
    localStorage.setItem('fitness-dashboard-color', color);
  };

  const value = {
    theme,
    primaryColor,
    toggleTheme,
    changePrimaryColor
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={`theme-${theme} color-${primaryColor}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};