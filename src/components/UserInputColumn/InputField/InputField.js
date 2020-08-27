import React from 'react';
import styles from './InputField.module.css';

const InputField = (props) => {
  // const { label, placeholder } = props;

  return (
    <div>
      <form className={styles.Form}>
        <label htmlFor="expense">Please insert your expenses
          <input type="text" id="expense" placeholder={props.placeholder} />
        </label>
      </form>
    </div>
  );
};

export default InputField;
