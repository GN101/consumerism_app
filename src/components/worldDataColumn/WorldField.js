import React from 'react';
import styles from './WorldDataColumn.module.css';

const WorldField = (props) => {
  const { label, value, placeholder } = props;
  const inputClasses = [styles.Input];

  return (
    <div className={styles.Form}>
      <label className={styles.Label} htmlFor={label}>
        {label}
        <input
          className={inputClasses.join(' ')}
          type="text"
          id={label}
          name={label}
          value={value}
          placeholder={placeholder}
          readOnly
        />
      </label>
    </div>
  );
};

export default WorldField;
