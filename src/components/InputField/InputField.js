import React from 'react';
import styles from './InputField.module.css';
import WarningSuspicious from './WarningSuspicious/WarningSuspicious';

const InputField = (props) => {
  const {
    label, placeholder, category, classname, valid, valRequired, isSuspicious, touched, changed, clicked
  } = props;
  const inputClasses = [classname || styles.Input];
  if (!valid && valRequired && touched) {
    inputClasses.push(styles.Invalid);
  }
  // At least I tried :) TODO: let's discuss about this. Let me know if you have any ideas on this.
  // const warningMsg = () => {
  //   if (isSuspicious) {
  //     console.log('test123');
  //     setTimeout(() => (
  //       <WarningSuspicious />
  //     ), 2000);
  //   }
  // };

  return (
    <div className={styles.Form}>
      <label className={styles.Label} htmlFor={category}>{label}
        {/* {warningMsg()} */}
        {isSuspicious && <WarningSuspicious />}
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
