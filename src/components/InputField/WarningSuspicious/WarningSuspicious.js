import React, { useState } from 'react';
import styles from './WarningSuspicious.module.css';

const WarningSuspicious = () => {
  const [close, setClose] = useState(false);

  const suspicionMsg = 'This seems rather... extreme. Are you sure about this?';
  const warnDivClasses = [styles.Suspicious];

  if (close) {
    warnDivClasses.push(styles.Closed);
  }

  return (
    <div className={warnDivClasses.join(' ')}>
      <p>{suspicionMsg}</p>
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
