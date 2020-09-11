import React, { Component } from 'react';
import InputField from './UserInputColumn/InputField/InputField';
import styles from './UserSignUp.module.css';

class UserSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      'First Name': '',
      'Last Name': '',
      email: '',
      location: '',
      'Date Of Birth': ''
    };
  }

  render() {
    const listOfUserInfo = Object.keys(this.state);

    const signUpForm = listOfUserInfo.map((items) => (
      <InputField
        key={items}
        classname={styles.Input}
        label={items}
        placeholder={`Please write ${items} here`}
        category={items}
      />
    ));

    return (
      <div className={styles.Form}>
        <h2 className={styles.Header}>{'Let\'s Get Started!'}</h2>
        <div className={styles.Label}>
          {signUpForm}
          <button className={styles.Button} type="submit">SIGN UP</button>
        </div>
      </div>
    );
  }
}
export default UserSignUp;
