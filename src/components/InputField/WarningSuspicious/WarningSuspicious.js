import React, { useState } from 'react';
import styles from './WarningSuspicious.module.css';

const WarningSuspicious = (warning) => {
  const [close, setClose] = useState(false);
  const suspicionMsg = 'This is too Low. Are you sure about this?';
  const tooHighMsg = 'This is too High. Are you sure about this?';
  const warnDivClasses = [styles.Suspicious];

  if (close) {
    warnDivClasses.push(styles.Closed);
  }
  console.log(warning, warning.type === 'low');
  return (
    <div className={warnDivClasses.join(' ')}>
      {warning.type === 'low' ? (
        <p>{suspicionMsg}</p>
      ) : warning.type === 'high' ? (
        <p>{tooHighMsg}</p>
      ) : null}
      <button
        className={styles.Button}
        type="button"
        onClick={() => setClose(true)}
      >
        Yes
      </button>
    </div>
  );
};

export default WarningSuspicious;
