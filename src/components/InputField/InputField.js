import React, { useEffect, useState } from 'react';
import styles from './InputField.module.css';
import WarningSuspicious from './WarningSuspicious/WarningSuspicious';

const InputField = (props) => {
  const {
    label,
    placeholder,
    category,
    classname,
    valid,
    valRequired,
    isSuspicious,
    touched,
    changed,
    clicked,
    type,
  } = props;
  const inputClasses = [classname || styles.Input];
  const [timerOn, setTimerOn] = useState(false);

  if (!valid && valRequired && touched) {
    inputClasses.push(styles.Invalid);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isSuspicious) {
        setTimerOn(true);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isSuspicious]);

  return (
    <div className={styles.Form}>
      <label className={styles.Label} htmlFor={category}>
        {label}
        {/* {warningMsg()} */}
        {isSuspicious && timerOn && <WarningSuspicious />}
        <input
          className={inputClasses.join(' ')}
          type="text"
          id={label}
          name={label}
          placeholder={placeholder}
          onChange={changed}
          onClick={clicked}
        />
      </label>
    </div>
  );
};

export default InputField;
