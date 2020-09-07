/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { Component } from 'react';
import styles from './UserInputColumn.module.css';
import InputField from './InputField/InputField';


class UserInputColumn extends Component {
  state = {
    userInput: [
      {
        name: 'snacks_indoor',
        value: '',
        categories: []
      },
      {
        name: 'snacks_outdoor',
        value: '',
        categories: []
      },
      {
        name: 'groceries',
        value: '',
        categories: []
      },
      {
        name: 'trips_cheap',
        value: '',
        categories: []
      },
      {
        name: 'trips_expensive',
        value: '',
        categories: []
      },
      {
        name: 'clothes',
        value: '',
        categories: []
      },
      {
        name: 'shoes',
        value: '',
        categories: []
      },
      {
        name: 'jewelry',
        value: '',
        categories: []
      },
      {
        name: 'personal_vehicle',
        value: '',
        categories: []
      },
      {
        name: 'public_transportation',
        value: '',
        categories: []
      },
      {
        name: 'entertainment_indoors',
        value: '',
        categories: []
      },
      {
        name: 'entertainment_outdoors',
        value: '',
        categories: []
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
    for (let key in list) {
      list[key].name = list[key].name.replace(/_/g, ' ');
    }

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
