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
    time,
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
          <div className={styles.TimePeriod}>
            <p> Cost: </p>
            <select
              onChange={(e) => setTimeframe(e.target.value)}
              onInput={time}
              defaultValue={timeframe}
            >
              <option value="per Week">per Week </option>
              <option value="per Month">per Month</option>
              <option value="per Year">per Year</option>
            </select>
          </div>
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
          onClick={() => setTouched(true)}
          onBlur={focusOutHandler}
          time={timeframe}
          timeperiod={timeframe}
        />
      </label>
    </div>
  );
};

export default InputField;
