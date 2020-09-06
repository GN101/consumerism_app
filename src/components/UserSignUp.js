import React, { Component } from 'react';
import styles from './UserSignUp.module.css';

class UserSignUp extends Component {
  state = {

  }

  render() {
    return (
      <div className={styles.Form}>
        <h2 className={styles.Header}>Let&apos; s Get Started!</h2>
        <div className={styles.Label}>
          <label htmlFor="Username" id="Username">Username
            <input type="text" className={styles.Input}></input>
          </label>
          <label htmlFor="FirstName" id="FirstName">First Name
            <input type="text" className={styles.Input}></input>
          </label>
          <label htmlFor="LastName" id="LastName">Last Name
            <input type="text" className={styles.Input}></input>
          </label>
          <label htmlFor="Email" id="Email">e-mail
            <input type="text" className={styles.Input}></input>
          </label>
          <label htmlFor="Location" id="Location">Location
            <input type="text" className={styles.Input}></input>
          </label>
          <label htmlFor="DateOfBirth" id="DateOfBirth">Date Of Birth
            <input type="text" className={styles.Input}></input>
          </label>
        </div>
        <button className={styles.Button} type="submit">SIGN UP</button>
      </div>
    );
  }
}
export default UserSignUp;
