
import React from 'react';
import styles from './WorldDataColumn.module.css';


const WorldField = (props) => {
  const {
    label, value
  } = props;
  const inputClasses = [styles.Input];

  return (
    <div className={styles.Form}>
      <label className={styles.Label} htmlFor={label}>{label}
        <input
          className={inputClasses.join(' ')}
          type="text"
          id={label}
          name={label}
          value={value}
          readOnly
        />
      </label>
    </div>
  );
};

export default WorldField;
