import React, { createContext, useState, useEffect } from 'react';
import lightTheme from '../common-styles/light-theme';
import darkTheme from '../common-styles/dark-theme';

type ThemeContextProps = {
  theme: any;
  themeName: string;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextProps>({
  theme: lightTheme,
  themeName: 'light',
  toggleTheme: () => {},
});

type ProviderProps = {
  children: React.ReactNode;
};

const SelectedThemeProvider = ({ children }: ProviderProps) => {
  let initialTheme = lightTheme;
  let initialThemeName = 'light';
  if (window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      initialTheme = darkTheme;
      initialThemeName = 'dark';
    }
  }

  const [theme, setTheme] = useState(initialTheme);
  const [themeName, setThemeName] = useState(initialThemeName);

  useEffect(() => {
    if (window.matchMedia) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          if (event.matches) {
            setTheme(darkTheme);
            setThemeName('dark');
          } else {
            setTheme(lightTheme);
            setThemeName('light');
          }
        });
    }
  }, []);

  const toggleTheme = () => {
    if (themeName === 'light') {
      setTheme(darkTheme);
      setThemeName('dark');
    } else {
      setTheme(lightTheme);
      setThemeName('light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default SelectedThemeProvider;
