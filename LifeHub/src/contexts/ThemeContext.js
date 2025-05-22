import React, { createContext, useState, useMemo } from 'react';
import { Appearance } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = Appearance.getColorScheme() || 'light'; // 'light', 'dark', or null
  const [theme, setTheme] = useState(systemTheme); // Default to system theme

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Basic theme colors (can be expanded significantly)
  const themeColors = useMemo(() => ({
    light: {
      background: '#f0f0f0',
      card: '#ffffff',
      text: '#000000',
      primary: '#007AFF',
      separator: '#ddd',
      // ... other colors
    },
    dark: {
      background: '#000000',
      card: '#1a1a1a',
      text: '#ffffff',
      primary: '#0A84FF', // Apple's dark mode blue
      separator: '#333',
      // ... other colors
    }
  }), []);
  
  const currentThemeColors = themeColors[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: currentThemeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
