/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { Component } from 'react';
import styles from './UserInputColumn.module.css';
import InputField from '../InputField/InputField';
import mockedUserInputState from '../../mocks/mockedUserInputColumnState';

class UserInputColumn extends Component {
  state = {
    ...mockedUserInputState,
    formIsValid: false,
    totalCost: '',
  };

  formChangeHandler = (event, index) => {
    const { userInput } = this.state;
    const updatedForm = {
      ...userInput,
    };
    const updatedFormEl = {
      ...updatedForm[index],
    };
    updatedFormEl.value = event.target.value;
    // eslint-disable-next-line prefer-destructuring
    updatedFormEl.valid = this.checkValidity(updatedFormEl)[0];
    // eslint-disable-next-line prefer-destructuring
    updatedFormEl.isSuspicious = this.checkValidity(updatedFormEl)[1];
    updatedFormEl.touched = true;
    updatedForm[index] = updatedFormEl;

    let formIsValid = true;
    for (const i in updatedForm) {
      formIsValid = updatedForm[i].valid && formIsValid;
    }

    this.setState({ userInput: updatedForm, formIsValid });
  };

  submitFormHandler = (event) => {
    const { userInput } = this.state;
    event.preventDefault();
    const valuesSum = Object.values(userInput)
      .map((listItem) => listItem.value)
      .filter((value) => value !== '');
    const totalC =
      valuesSum.length !== 0
        ? valuesSum.reduce(
            (total, curVal) => parseInt(total, 10) + parseInt(curVal, 10)
          )
        : console.log('No values were provided by the user!');
    // TODO: delete the logs after code review
    console.log(
      '%cVALUES SUM :::::::',
      'color: cyan;, font-size:18px',
      valuesSum
    );
    console.log(
      '%cUSER INPUT STATE :::::::',
      'color: red;, font-size:18px',
      userInput
    );
    if (this.state.formIsValid) {
      console.log('SUBMIT SUCCESFUL - totalC', totalC);
      this.setState({ totalCost: totalC });
    } else {
      // TODO: we need to render a proper error message for such cases
      console.log('SUBMIT FAILED - Form is invalid!');
    }
  };

  checkValidity(obj) {
    let isValid = true;
    let isSuspicious = false;

    if (!obj.validation) {
      return true;
    }

    if (obj.validation.range) {
      isSuspicious =
        obj.value < obj.validation.range[0] ||
        obj.value > obj.validation.range[1];
    }

    if (obj.validation.type === 'number') {
      const pattern = /^\d+$/;
      isValid = (pattern.test(obj.value) || obj.value.trim() === '') && isValid;
    }
    return [isValid, isSuspicious];
  }

  render() {
    const { userInput } = this.state;
    const list = Object.values(userInput);

    // console.log('%c list :::', 'color: yellow', list);
    console.log('%c final userInput :::', 'color: red', userInput);
    console.log('%c final state :::', 'color: red', this.state.userInput);
    console.log('%c final total cost :::', 'color: red', this.state.totalCost);
    console.log('%c formIsValid :::', 'color: yellow', this.state.formIsValid);

    const inputForm = list.map((listItem, index) => (
      <InputField
        key={listItem.name}
        label={listItem.name}
        type="number"
        placeholder={listItem.placeholder}
        value={listItem.value}
        valid={listItem.valid}
        isSuspicious={listItem.isSuspicious}
        touched={listItem.touched}
        valRequired={listItem.validation.required}
        changed={(event) => {
          this.formChangeHandler(event, index);
        }}
      />
    ));

    return (
      <div className={styles.Container}>
        <form className={styles.Column} onSubmit={this.submitFormHandler}>
          <h3>Please fill the form below!</h3>
          {inputForm}
          <button className={styles.Button} type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    );
  }
}

export default UserInputColumn;
