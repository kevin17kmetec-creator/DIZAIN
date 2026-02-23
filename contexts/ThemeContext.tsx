import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'minimalist' | 'neon' | 'arcade' | 'nature' | 'glass';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  nextTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('minimalist');

  useEffect(() => {
    const root = document.documentElement;
    // Remove all theme classes
    root.classList.remove('theme-minimalist', 'theme-neon', 'theme-arcade', 'theme-nature', 'theme-glass');
    // Add current theme class
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const nextTheme = () => {
    const themes: Theme[] = ['minimalist', 'neon', 'arcade', 'nature', 'glass'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, nextTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
