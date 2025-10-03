import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type AppSettingsContextType = {
  fontSize: number;
  setFontSize: (size: number) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
};

const defaultSettings: AppSettingsContextType = {
  fontSize: 16,
  setFontSize: () => {},
  isDarkMode: true,
  setIsDarkMode: () => {},
};

export const AppSettingsContext = createContext<AppSettingsContextType>(defaultSettings);

export const useAppSettings = () => useContext(AppSettingsContext);

interface AppSettingsProviderProps {
  children: ReactNode;
}

export const AppSettingsProvider: React.FC<AppSettingsProviderProps> = ({ children }) => {
  // Initialize state with localStorage values if they exist
  const [fontSize, setFontSizeState] = useState<number>(() => {
    const saved = localStorage.getItem("app-font-size");
    return saved ? parseInt(saved, 10) : 16;
  });
  
  const [isDarkMode, setIsDarkModeState] = useState<boolean>(() => {
    const saved = localStorage.getItem("app-dark-mode");
    return saved ? saved === "true" : true;
  });

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem("app-font-size", fontSize.toString());
    // Apply font size to the root element
    document.documentElement.style.fontSize = `${fontSize / 16}rem`;
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("app-dark-mode", isDarkMode.toString());
    // Toggle dark mode class on document
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const setFontSize = (size: number) => {
    setFontSizeState(size);
  };

  const setIsDarkMode = (isDark: boolean) => {
    setIsDarkModeState(isDark);
  };

  return (
    <AppSettingsContext.Provider value={{ fontSize, setFontSize, isDarkMode, setIsDarkMode }}>
      {children}
    </AppSettingsContext.Provider>
  );
};