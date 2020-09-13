/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { Component } from 'react';
import styles from './UserInputColumn.module.css';
import InputField from '../InputField/InputField';


class UserInputColumn extends Component {
  state = {
    userInput: [
      {
        name: 'snacks indoor',
        value: '',
        categories: [],
        range: []
      },
      {
        name: 'snacks outdoor',
        value: '',
        categories: [],
        range: []
      },
      {
        name: 'groceries',
        value: '',
        categories: [],
        range: []
      },
      {
        name: 'trips cheap',
        value: '',
        categories: [],
        range: []
      },
      {
        name: 'trips expensive',
        value: '',
        categories: [],
        range: []
      },
      {
        name: 'clothes',
        value: '',
        categories: [],
        range: []
      },
      {
        name: 'shoes',
        value: '',
        categories: [],
        range: []
      },
      {
        name: 'jewelry',
        value: '',
        categories: [],
        range: []
      },
      {
        name: 'personal vehicle',
        value: '',
        categories: [],
        range: []
      },
      {
        name: 'public transportation',
        value: '',
        categories: [],
        range: []
      },
      {
        name: 'entertainment indoors',
        value: '',
        categories: [],
        range: []
      },
      {
        name: 'entertainment outdoors',
        value: '',
        categories: [],
        range: []
      }
    ],
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
    updatedForm[index].value = updatedFormEl.value;

    this.setState({ userInput: updatedForm });

    // TODO: remove ALL console logs after code review
    console.log('%c updatedFormEl :::', 'color: cyan', updatedFormEl);
    console.log('%c updatedForm[index] :::', 'color: green', updatedForm[index]);
    console.log('%c new state :::', 'color: orange', userInput);
  };

  // FIXME: this is not completed yet and does not work. Ignore it for the time being. :)
  submitFormHandler = (event) => {
    const { userInput } = this.state;
    const list = Object.values(userInput);
    event.preventDefault();
    const totalC = list.reduce();
    console.log(totalC);
    this.setState({ totalCost: totalC });
  }

  render() {
    const { userInput } = this.state;
    const list = Object.values(userInput);

    // TODO: investigate on how to implement this in another way
    // for (const key in list) {
    //   list[key].name = list[key].name.replace(/_/g, ' ');
    // }

    console.log('%c list :::', 'color: yellow', list);
    console.log('%c final state :::', 'color: red', userInput);


    const inputForm = (
      list.map((listItem, index) => (
        <InputField
          key={listItem.name}
          label={listItem.name}
          placeholder={`Expenses for: ${listItem.name}`}
          value={listItem.value}
          changed={(event) => { this.formChangeHandler(event, index); }}
          clicked={() => console.log(index)}
        />
      )));

    return (
      <form className={styles.Column} onSubmit={this.submitFormHandler}>
        <h2>Please fill the form below!</h2>
        {inputForm}
        <button className={styles.Button} type="submit">SUBMIT</button>
      </form>
    );
  }
}

export default UserInputColumn;
