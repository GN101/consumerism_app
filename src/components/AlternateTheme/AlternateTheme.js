import React, { useState, useContext } from 'react';
import styles from './AlternateTheme.module.css';
import AlternateThemeContext from '../././../Context/AlternateTheme-context';

const AlternateTheme = () => {
  const { theme, setTheme } = useContext(AlternateThemeContext);
  // const [theme, setTheme] = useState(true);

  const hola = () => {
    setTheme(!theme);
    if (theme) {
      document.body.style.backgroundColor = 'rgb(12,11,25)';
    } else {
      document.body.style.backgroundColor = '#607d8b';
    }
  };
  console.log('1', theme);

  return (
    <div>
      <button
        type="button"
        className={theme ? styles.themeToggle : styles.themeToggle_dark}
        onClick={hola}
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
