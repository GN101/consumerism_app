/* eslint-disable react/destructuring-assignment */
/* eslint-disable guard-for-in */
import React, { Component } from 'react';
import styles from './UserInputColumn.module.css';
import InputField from '../InputField/InputField';
import axios from '../../axios-orders';
class UserInputColumn extends Component {
  state = {
    userInput: [],
    formIsValid: false,
    totalCost: '',
  };

  async componentDidMount() {
    try {
      const res = await axios.get('/userInputState.json');
      this.setState({ userInput: res.data.userInputForm });
    } catch (e) {
      console.log(`Failure getting user input form - Error: ${e}`);
    }
  }

  formChangeHandler = (event, index) => {
    const { userInput } = this.state;
    const updatedForm = {
      ...userInput,
    };
    const updatedFormEl = {
      ...updatedForm[index],
    };
    updatedFormEl.value = event.target.value;
    updatedFormEl.valid = this.checkValidity(updatedFormEl)[0];
    updatedFormEl.isSuspicious = this.checkValidity(updatedFormEl)[1];
    updatedFormEl.touched = true;
    updatedForm[index] = updatedFormEl;
    let formIsValid = true;
    for (const i in updatedForm) {
      formIsValid = updatedForm[i].valid && formIsValid;
    }

    this.setState({ userInput: updatedForm, formIsValid });
  };

  submitFormHandler = async (event) => {
    try {
      const { userInput, formIsValid } = this.state;
      const userData = { categories: {} };
      event.preventDefault();
      const valuesSum = Object.values(userInput)
        .map((listItem) => listItem.value)
        .filter((value) => value !== '');
      const totalC =
        valuesSum.length !== 0
          ? valuesSum.reduce(
              (total, curVal) => parseInt(total, 10) + parseInt(curVal, 10)
            )
          : null;

      if (formIsValid) {
        console.log('SUBMIT SUCCESSFUL - totalCost: ', totalC);
        await this.setState({ totalCost: totalC });
        userData.totalCost = this.state.totalCost;
        const userInputArr = Object.values(userInput);
        userInputArr.map((userInfo) => {
          userData.categories[userInfo.name] = userInfo.value;
        });

        axios
          .post('/userData.json', userData)
          .then((res) => console.log(res))
          .catch((e) => console.log(e));
      } else {
        // TODO: we need to render a proper error message for such cases
        console.log('SUBMIT FAILED - Form is invalid!');
      }
    } catch (e) {
      console.log(`Error during User Input Form submission: ${e}`);
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
      //const pattern = /^\d+$/; // allaksa thn gramh 110 opote to type metaferete sto InputField , etsi to inpute dexete mono arithmous Olo to Is Valid den xreiazete pia, to svino ok?
      // isValid = (pattern.test(obj.value) || obj.value.trim() === '') && isValid;
    }
    return [isValid, isSuspicious];
  }

  render() {
    const { userInput } = this.state;
    const list = Object.values(userInput);

    const inputForm = list.map((listItem, index) => (
      <InputField
        key={listItem.name}
        label={listItem.name}
        type={listItem.validation.type}
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
