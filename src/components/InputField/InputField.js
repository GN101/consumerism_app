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
  } = props;
  const inputClasses = [classname || styles.Input];
  const [showWarningMsg, setShowWarningMsg] = useState(false);

  if (!valid && valRequired && touched) {
    inputClasses.push(styles.Invalid);
  }

  const focusOutHandler = () => {
    // TODO: remove all console.logs after code review
    console.log('%cisSuspicious', 'color: yellow', isSuspicious);
    return isSuspicious
      ? setTimeout(() => {
          setShowWarningMsg(true);
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
          type="text"
          id={label}
          name={label}
          placeholder={placeholder}
          onChange={changed}
          onClick={clicked}
          onBlur={focusOutHandler}
        />
      </label>
    </div>
  );
};

export default InputField;
