
import React from 'react';
import styles from './WorldDataColumn.module.css';


const WorldField = (props) => {
  const {
    label, category, classname, value
  } = props;
  const inputClasses = [classname || styles.Input || styles.Hide];

  return (
    <div className={styles.Form}>
      <label className={styles.Label} htmlFor={category}>{label}
        <input
          className={inputClasses.join(' ')}
          type="text"
          id={label}
          name={label}
          value={value}
          readOnly
        />
      </label>
    </div>
  );
};

export default WorldField;
