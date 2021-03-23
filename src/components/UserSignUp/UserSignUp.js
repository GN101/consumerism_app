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
      const pattern = new RegExp(obj.validation.pattern);
      isValid = (pattern.test(obj.value) || obj.value.trim() === '') && isValid;
    }
    return [isValid, isSuspicious];
  }

  render() {
    const { userInput } = this.state;
    const listOfUserInfo = Object.values(userInput);

    console.log('FINAL USERINPUT', userInput);

    const signUpForm = listOfUserInfo.map((items, index) => (
      <InputField
        key={items.name}
        classname={styles.Input}
        label={items.name}
        placeholder={`Please write ${items.name} here`}
        category={items.name}
        isSuspicious={items.isSuspicious}
        valid={items.valid}
        valRequired={items.validation.required}
        touched={items.touched}
        type={items.validation.type}
        changed={(event) => {
          this.formChangeHandler(event, index);
        }}
      />
    ));

    return (
      <form
        className={styles.Form} //onSubmit={this.submitFormHandler}
      >
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

//   submitFormHandler = async (event) => {
//     try {
//       const { userInput, formIsValid } = this.state;
//       const userData = { categories: {} };
//       event.preventDefault();
//       const valuesSum = Object.values(userInput)
//         .map((listItem) => listItem.value)
//         .filter((value) => value !== '');
//       const totalC =
//         valuesSum.length !== 0
//           ? valuesSum.reduce(
//               (total, curVal) => parseInt(total, 10) + parseInt(curVal, 10)
//             )
//           : null;

//       if (formIsValid) {
//         console.log('SUBMIT SUCCESSFUL - totalCost: ', totalC);
//         await this.setState({ totalCost: totalC });
//         userData.totalCost = this.state.totalCost;
//         const userInputArr = Object.values(userInput);
//         userInputArr.map((userInfo) => {
//           userData.categories[userInfo.name] = userInfo.value;
//         });

//         axios
//           .post('/userData.json', userData)
//           .then((res) => console.log(res))
//           .catch((e) => console.log(e));
//       } else {
//         // TODO: we need to render a proper error message for such cases
//         console.log('SUBMIT FAILED - Form is invalid!');
//       }
//     } catch (e) {
//       console.log(`Error during User Input Form submission: ${e}`);
//     }
//   };

//   render() {
//     const { userInput } = this.state;
//     const list = Object.values(userInput);

//     return (
//       <div className={styles.Container}>
//         <form className={styles.Column} onSubmit={this.submitFormHandler}>
//           <h3>Please fill the form below!</h3>
//           {inputForm}
//           <button className={styles.Button} type="submit">
//             SUBMIT
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

// export default UserInputColumn;
