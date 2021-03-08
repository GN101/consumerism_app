import React, { useState, useContext } from 'react';
import styles from './AlternateTheme.module.css';
import AlternateThemeContext from '../../Context/AlternateTheme-context';

const AlternateTheme = () => {
  const { theme, setTheme } = useContext(AlternateThemeContext);

  const toggleTheme = () => {
    setTheme(!theme);
  };

  return (
    <div>
      <button
        type="button"
        className={theme ? styles.themeToggle : styles.themeToggle_dark}
        onClick={toggleTheme}
      >
        <span role="img" aria-label="Dark mode">
          🌙 🔆
        </span>
        <div className={theme ? styles.ball : styles.ball_dark}> </div>
      </button>
    </div>
  );
};

export default AlternateTheme;
