import React, { Component } from 'react';
import styles from './UserInputColumn.module.css';
import InputField from './InputField/InputField';


class UserInputColumn extends Component {
  state = {
    label: '',
    placeholder: 'Insert your expenses here'
  };

  render() {
    const { label, placeholder } = this.state;

    return (
      <div className={styles.Column}>
        <InputField
          label={label}
          placeholder={placeholder}
        />
      </div>
    );
  }
}

export default UserInputColumn;
