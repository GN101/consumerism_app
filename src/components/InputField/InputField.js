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
    timeCategorisation,
    changed,
  } = props;
  const [showWarningMsg, setShowWarningMsg] = useState(false);
  const [invalidStyle, setInvalidStyle] = useState(false);
  const [warning, setWarning] = useState();
  const inputClasses = [classname || styles.Input];
  const [touche2d2, setTouche2d2] = useState(false);

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

  const active = () => {
    setTouche2d2(true);
  };

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
        {timeCategorisation && touched ? (
          <form name="form1" id="form1" action="/action_page.php">
            Cost:{' '}
            <select name="Time Period" id="subject" defaultValue="per Month">
              <option value="per Week">per Week</option>
              <option value="per Month">per Month</option>
              <option value="per Year">per Year</option>
            </select>
          </form>
        ) : null}
        <input
          className={inputClasses.join(' ')}
          type={type}
          pattern={pattern}
          title={title}
          id={label}
          name={label}
          placeholder={placeholder}
          onChange={changed}
          onClick={active}
          onBlur={focusOutHandler}
        />
      </label>
    </div>
  );
};

export default InputField;
