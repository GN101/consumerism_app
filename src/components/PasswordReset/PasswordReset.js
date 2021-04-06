import React, { useState } from 'react';
import styles from './PasswordReset.module.css';
import { Link } from 'react-router-dom';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'userEmail') {
      setEmail(value);
    }
  };
  const sendResetEmail = (event) => {
    event.preventDefault();
  };
  return (
    <div className={styles.Container}>
      <h1 className={styles.Header}>Reset your Password</h1>
      <div>
        <form action="">
          {emailHasBeenSent && <div>An email has been sent to you!</div>}
          {error !== null && <div>{error}</div>}
          <label htmlFor="userEmail" className={styles.Label}>
            Email:
          </label>
          <input
            type="email"
            name="userEmail"
            id="userEmail"
            value={email}
            placeholder="Input your email"
            onChange={onChangeHandler}
            className={styles.Input}
          />
          <button className={styles.Button}>Send me a reset link</button>
        </form>
        <Link to="/login" className={styles.Text}>
          &larr; back to log in page
        </Link>
      </div>
    </div>
  );
};
export default PasswordReset;
