import { useState, useEffect } from 'react';

export const useTheme = () => {

  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem('theme') === 'dark'
  );


  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);


  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };


  return { isDarkTheme, toggleTheme };
};