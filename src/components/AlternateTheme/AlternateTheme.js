import React, { useState } from 'react';

import styles from './AlternateTheme.module.css';

const AlternateTheme = () => {
  const [theme, setTheme] = useState('default');

  const hola = () => {
    setTheme('dark');
    console.log(theme);
  };

  return (
    <div>
      <button type="button" className={styles.ThemeToggle} onClick={hola}>
        <span role="img" aria-label="Dark mode">
          🌙 🔆
        </span>
        <div className={styles.ball}> </div>
      </button>
    </div>
    // icons={{ checked: '🌙', unchecked: '' }}
    // onChange={event => setIsDark(event.target.checked)}
  );
};

export default AlternateTheme;
