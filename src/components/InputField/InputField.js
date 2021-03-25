import React, { useEffect, useState } from 'react';
import styles from './InputField.module.css';
import WarningSuspicious from './WarningSuspicious/WarningSuspicious';

const InputField = (props) => {
  const {
    label,
    type,
    pattern,
    title,
    placeholder,
    category,
    classname,
    valid,
    valRequired,
    isSuspicious,
    touched,
    changed,
  } = props;
  const [showWarningMsg, setShowWarningMsg] = useState(false);
  const [invalidStyle, setInvalidStyle] = useState(false);
  const inputClasses = [classname || styles.Input];
  if (!valid && valRequired && touched) {
    if (invalidStyle) {
      inputClasses.push(styles.Invalid);
    }
  }

  const focusOutHandler = () => {
    return isSuspicious
      ? setTimeout(() => {
          setShowWarningMsg(true);
        }, 500)
      : !valid && valRequired && touched
      ? setTimeout(() => {
          setInvalidStyle(true);
        }, 500)
      : null;
  };

  return (
    <div className={styles.Form}>
      <label className={styles.Label} htmlFor={category}>
        {label}
        {isSuspicious && showWarningMsg && <WarningSuspicious />}
        <input
          className={inputClasses.join(' ')}
          type={type}
          pattern={pattern}
          title={title}
          id={label}
          name={label}
          placeholder={placeholder}
          onChange={changed}
          onBlur={focusOutHandler}
        />
      </label>
    </div>
  );
};

export default InputField;
