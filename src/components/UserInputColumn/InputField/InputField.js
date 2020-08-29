import React from 'react';
import styles from './InputField.module.css';

const InputField = (props) => {
  const { label, placeholder, category } = props;

  return (
    <div className={styles.Form}>
      <label className={styles.Label} htmlFor={category}>{label}
        <input className={styles.Input} type="text" id={category} placeholder={placeholder} />
      </label>
    </div>
  );
};

export default InputField;
