import React, { useState, useEffect } from 'react';
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
    isTooHigh,
    touched,
    changed,
  } = props;
  const [showWarningMsg, setShowWarningMsg] = useState(false);
  const [invalidStyle, setInvalidStyle] = useState(false);
  const [warning, setWarning] = useState();
  const inputClasses = [classname || styles.Input];

  if (!valid && valRequired && touched) {
    if (invalidStyle) {
      inputClasses.push(styles.Invalid);
    }
  }
  useEffect(() => {
    if (isSuspicious) {
      setWarning('low');
    } else if (isTooHigh) {
      setWarning('high');
    }
  }, [isSuspicious, isTooHigh]);

  const focusOutHandler = () => {
    return isSuspicious || isTooHigh
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
        {isSuspicious && showWarningMsg && <WarningSuspicious type={warning} />}
        {isTooHigh && showWarningMsg && <WarningSuspicious type={warning} />}
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
