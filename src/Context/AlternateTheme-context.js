import React from 'react';

const AlternateThemeContext = React.createContext({
  theme: true,
  setTheme: () => {},
});

export default AlternateThemeContext;
