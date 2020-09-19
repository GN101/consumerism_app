/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { Component } from 'react';
import styles from './UserInputColumn.module.css';
import InputField from '../InputField/InputField';
import WorldDataColumn from '../WorldDataColumn/WorldDataColumn';


class UserInputColumn extends Component {
  state = {
    userInput: [
      {
        name: 'snacks indoor',
        value: '',
        categories: [],
        isSuspicious: false,
        validation: {
          required: true,
          range: [0, 150],
          type: 'number'
        },
        valid: false,
        touched: false
      },
      {
        name: 'snacks outdoor',
        value: '',
        categories: [],
        isSuspicious: false,
        validation: {
          required: true,
          range: [0, 150],
          type: 'number'
        },
        valid: false,
        touched: false
      },
      {
        name: 'groceries',
        value: '',
        categories: [],
        isSuspicious: false,
        validation: {
          required: true,
          range: [100, 400],
          type: 'number'
        },
        valid: false,
        touched: false
      },
      {
        name: 'trips cheap',
        value: '',
        categories: [],
        isSuspicious: false,
        validation: {
          required: true,
          range: [0, 2000],
          type: 'number'
        },
        valid: false,
        touched: false
      },
      {
        name: 'trips expensive',
        value: '',
        categories: [],
        isSuspicious: false,
        validation: {
          required: true,
          range: [0, 5000],
          type: 'number'
        },
        valid: false,
        touched: false
      },
      {
        name: 'clothes',
        value: '',
        categories: [],
        isSuspicious: false,
        validation: {
          required: true,
          range: [0, 100],
          type: 'number'
        },
        valid: false,
        touched: false
      },
      {
        name: 'shoes',
        value: '',
        categories: [],
        isSuspicious: false,
        validation: {
          required: true,
          range: [0, 100],
          type: 'number'
        },
        valid: false,
        touched: false
      },
      {
        name: 'fitness',
        value: '',
        categories: [],
        isSuspicious: false,
        validation: {
          required: true,
          range: [0, 150],
          type: 'number'
        },
        valid: false,
        touched: false
      },
      {
        name: 'jewelry',
        value: '',
        categories: [],
        isSuspicious: false,
        validation: {
          required: true,
          range: [0, 200],
          type: 'number'
        },
        valid: false,
        touched: false
      },
      {
        name: 'personal vehicle',
        value: '',
        categories: [],
        isSuspicious: false,
        validation: {
          required: true,
          range: [0, 500],
          type: 'number'
        },
        valid: false,
        touched: false
      },
      {
        name: 'public transportation',
        value: '',
        categories: [],
        isSuspicious: false,
        validation: {
          required: true,
          range: [0, 100],
          type: 'number'
        },
        valid: false,
        touched: false
      },
      {
        name: 'entertainment indoors',
        value: '',
        categories: [],
        isSuspicious: false,
        validation: {
          required: true,
          range: [0, 200],
          type: 'number'
        },
        valid: false,
        touched: false
      },
      {
        name: 'entertainment outdoors',
        value: '',
        categories: [],
        isSuspicious: false,
        validation: {
          required: true,
          range: [0, 300],
          type: 'number'
        },
        valid: false,
        touched: false
      }
    ],
    formIsValid: false,
    totalCost: ''
  };

  formChangeHandler = (event, index) => {
    const { userInput } = this.state;
    const updatedForm = {
      ...userInput
    };
    const updatedFormEl = {
      ...updatedForm[index]
    };
    updatedFormEl.value = event.target.value;
    updatedFormEl.valid = this.checkValidity(updatedFormEl)[0];
    updatedFormEl.isSuspicious = this.checkValidity(updatedFormEl)[1];
    updatedFormEl.touched = true;
    updatedForm[index] = updatedFormEl;

    let formIsValid = true;
    for (const index in updatedForm) {
      formIsValid = updatedForm[index].valid && formIsValid;
    }

    this.setState({ userInput: updatedForm, formIsValid: formIsValid });

    // TODO: remove ALL console logs after code review
    // console.log('%c updatedFormEl :::', 'color: cyan', updatedFormEl);
    // console.log('%c updatedForm[index] :::', 'color: green', updatedForm[index]);
    // console.log('%c new state :::', 'color: orange', userInput);
  };

  // FIXME: this is not completed yet and does not work. Ignore it for the time being. :)
  // submitFormHandler = (event) => {
  //   const { userInput } = this.state;
  //   const list = Object.values(userInput);
  //   event.preventDefault();
  //   const totalC = list.reduce();
  //   console.log(totalC);
  //   this.setState({ totalCost: totalC });
  // }

  checkValidity(obj) {
    let isValid = true;
    let isSuspicious = false;

    if (!obj.validation) {
      return true;
    }

    if (obj.validation.range) {
      isSuspicious = obj.value < obj.validation.range[0] || obj.value > obj.validation.range[1];
    }

    if (obj.validation.type === 'number') {
      const pattern = /^\d+$/;
      isValid = (pattern.test(obj.value) || obj.value.trim() === '') && isValid;
      // console.log('%c isValid :::', 'color: purple', isValid);
    }

    // console.log('%c isValid :::', 'color: purple', isValid);
    return [isValid, isSuspicious];
  }

  render() {
    const { userInput } = this.state;
    const list = Object.values(userInput);
    // TODO: investigate on how to implement this in another way
    // for (const key in list) {
    //   list[key].name = list[key].name.replace(/_/g, ' ');
    // }

    // console.log('%c list :::', 'color: yellow', list);
    // console.log('%c final userInput :::', 'color: red', userInput);
    // console.log('%c final state :::', 'color: red', this.state.userInput[0].valid);


    const inputForm = (
      list.map((listItem, index) => (
        <InputField
          key={listItem.name}
          label={listItem.name}
          placeholder={`Expenses for: ${listItem.name}`}
          value={listItem.value}
          valid={listItem.valid}
          isSuspicious={listItem.isSuspicious}
          touched={listItem.touched}
          valRequired={listItem.validation.required}
          changed={(event) => { this.formChangeHandler(event, index); }}
          clicked={() => console.log(index)}
        />
      )));

    const worldForm = <WorldDataColumn />;

    return (
      <div className={styles.Container}>
        <div className={styles.Field}>
          <form className={styles.Column} onSubmit={this.submitFormHandler}>
            <h3>Please fill the form below!</h3>
            {inputForm}
            <button className={styles.Button} type="submit">SUBMIT</button>
          </form>

          {worldForm}
          {/* The below will be replaced by Average User Expenses. Included for cosmetic reasons :). */}
          {worldForm}

        </div>
      </div>
    );
  }
}

export default UserInputColumn;
