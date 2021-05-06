import React, { useState, useContext } from 'react';
import HideWarnings from '../../../Context/HideWarnings';
import styles from './WarningSuspicious.module.css';

const WarningSuspicious = (warning) => {
  const { hide, setHide } = useContext(HideWarnings);
  const [close, setClose] = useState(false);
  const [cheacked, setCheacked] = useState(false);
  const suspicionMsg = 'This is too Low. Are you sure about this?';
  const tooHighMsg = 'This is too High. Are you sure about this?';
  const warnDivClasses = [styles.Suspicious];

  if (!hide && close) {
    warnDivClasses.push(styles.Closed);
    if (cheacked) {
      setHide(true);
    }
  }

  return hide ? null : (
    <div className={warnDivClasses.join(' ')}>
      {warning.type === 'low' ? (
        <p>{suspicionMsg}</p>
      ) : warning.type === 'high' ? (
        <p>{tooHighMsg}</p>
      ) : null}
      <br></br>
      <button
        className={styles.Button}
        type="button"
        onClick={() => setClose(true)}
      >
        Yes
      </button>
      <input type="checkbox" onClick={() => setCheacked(!cheacked)} />
      <label>Don't show again</label>
    </div>
  );
};

export default WarningSuspicious;
