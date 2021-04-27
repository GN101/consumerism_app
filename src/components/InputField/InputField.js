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
    hasValue,
    timeCategorisation,
    changed,
  } = props;
  const [showWarningMsg, setShowWarningMsg] = useState(false);
  const [invalidStyle, setInvalidStyle] = useState(false);
  const [warning, setWarning] = useState();
  const [touched, setTouched] = useState(false);
  const [timeframe, setTimeframe] = useState('per Month');
  const inputClasses = [classname || styles.Input];

  if (!valid && valRequired && hasValue) {
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

  useEffect(() => {
    console.log(touched);
  }, [touched]);

  const active = () => {
    setTouched(true);
  };

  const setTimeperiod = (e) => {
    setTimeframe(e.target.value);
  };

  const focusOutHandler = () => {
    return isSuspicious || isTooHigh
      ? setTimeout(() => {
          setShowWarningMsg(true);
        }, 500)
      : !valid && valRequired && hasValue
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
        {timeCategorisation && (touched || hasValue) ? (
          <form>
            Cost:{' '}
            <select onChange={setTimeperiod} defaultValue={timeframe}>
              <option value="per Week">per Week </option>
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
          timeperiod={timeframe}
        />
      </label>
    </div>
  );
};

export default InputField;
