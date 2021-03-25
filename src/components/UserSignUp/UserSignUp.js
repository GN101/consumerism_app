import React, { Component } from 'react';
import InputField from '../InputField/InputField';
import styles from './UserSignUp.module.css';
import axios from '../../axios-orders';

class UserSignUp extends Component {
  state = {
    userInput: {},
    formIsValid: false,
  };

  async componentDidMount() {
    try {
      const res = await axios.get('/userSignUpState.json');
      this.setState({ userInput: res.data.userSignUpForm });
    } catch (e) {
      console.log(`Failure getting user input form - Error: ${e}`);
    }
  }

  formChangeHandler = (event, index) => {
    const { userInput } = this.state;
    console.log('userInput', userInput);
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
    // console.log('updatedFormEl', updatedFormEl, formIsValid);
    this.setState({ userInput: updatedForm, formIsValid });
  };

  checkValidity(obj) {
    // console.log('run check validity', obj);
    let isValid = true;
    let isSuspicious = false;

    if (!obj.validation) {
      return true;
    }
    if (obj.validation.type === 'date') {
      console.log(obj.value);
      isSuspicious = obj.value < '1921-01-01' || obj.value > '2021-01-01';
    }

    if (obj.validation.type === 'text') {
      switch (obj.name) {
        case 'Nickname':
          obj.validation = {
            required: true,
            pattern:
              '^(?=.{3,20}$)[a-zA-Z0-9]+((~|@|#|_|-|!|/.)[a-zA-Z0-9]*)*$',
            title: 'more than 3 letters , cant include spaces',
            type: 'text',
          };
          break;
        case 'Password':
          obj.validation = {
            required: true,
            pattern:
              '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&-+=()])(?=\\S+$).{4,30}$',
            title:
              'at least 1 number,1 symbol,1 upercase letter, 1 downcase letter ',
            type: 'text',
          };
          break;
        case 'First Name':
          obj.validation = {
            required: true,
            pattern: '^[A-Za-z]([a-z]+[ ][A-Za-z])*[a-z]*$',
            title: 'word space word without numbers',
            type: 'text',
          };
          break;
        case 'Last Name':
          obj.validation = {
            required: true,
            pattern: '^[A-Za-z]([a-z]+[ ][A-Za-z])*[a-z]*$',
            title: 'word space word without numbers',
            type: 'text',
          };
          break;
        case 'E-mail':
          obj.validation = {
            required: true,
            pattern:
              '^((?!\\.)[\\w-_.]*[^.])(@\\w+)(\\.\\w+(\\.\\w+)?[^.\\W])$',
            title: 'text@email.domain',
            type: 'text', // we need a proper validation for email
          };
          break;
        case 'Country':
          obj.validation = {
            required: true,
            pattern: '^[A-Za-z]([a-z]+[ ][A-Za-z])*[a-z]*$',
            title: 'word space word without numbers',
            type: 'text',
          };
          break;
      }
      const pattern = new RegExp(obj.validation.pattern);
      isValid = (pattern.test(obj.value) || obj.value.trim() === '') && isValid;
    }
    return [isValid, isSuspicious];
  }

  // submitFormHandler = async (event) => {
  //   try {
  //     const { userInput, formIsValid } = this.state;
  //     const userData = { categories: {} };
  //     event.preventDefault();
  //     const valuesSum = Object.values(userInput)
  //       .map((listItem) => listItem.value)
  //       .filter((value) => value !== '');
  //     // const totalC =
  //     //   valuesSum.length !== 0
  //     //     ? valuesSum.reduce(
  //     //         (total, curVal) => parseInt(total, 10) + parseInt(curVal, 10)
  //     //       )
  //     //     : null;

  //     if (formIsValid) {
  //       // console.log('SUBMIT SUCCESSFUL - totalCost: ', totalC);
  //       await this.setState({ totalCost: totalC });
  //       userData.totalCost = this.state.totalCost;
  //       const userInputArr = Object.values(userInput);
  //       userInputArr.map((userInfo) => {
  //         userData.categories[userInfo.name] = userInfo.value;
  //       });

  //       axios
  //         .post('/userData.json', userData)
  //         .then((res) => console.log(res))
  //         .catch((e) => console.log(e));
  //     } else {
  //       // TODO: we need to render a proper error message for such cases
  //       console.log('SUBMIT FAILED - Form is invalid!');
  //     }
  //   } catch (e) {
  //     console.log(`Error during User Input Form submission: ${e}`);
  //   }
  // };

  render() {
    const { userInput } = this.state;
    const listOfUserInfo = Object.values(userInput);

    console.log('FINAL USERINPUT', userInput);

    const signUpForm = listOfUserInfo.map((item, index) => (
      <InputField
        key={item.name}
        classname={styles.Input}
        label={item.name}
        placeholder={`Please write ${item.name} here`}
        category={item.name}
        isSuspicious={item.isSuspicious}
        valid={item.valid}
        valRequired={item.validation.required}
        touched={item.touched}
        type={item.validation.type}
        pattern={item.validation.pattern}
        title={item.validation.title}
        // clicked={item.validation.title}
        changed={(event) => {
          this.formChangeHandler(event, index);
        }}
      />
    ));

    return (
      <form className={styles.Form} onSubmit={this.submitFormHandler}>
        <div className={styles.Label}>
          <h2 className={styles.Header}>{"Let's Get Started!"}</h2>
          {signUpForm}
          <button className={styles.Button} type="submit">
            SIGN UP
          </button>
        </div>
      </form>
    );
  }
}
export default UserSignUp;
