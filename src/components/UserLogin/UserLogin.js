import React, { useState } from 'react';
import styles from './UserLogin.module.css';
import { Link } from 'react-router-dom';
// import firebase from 'firebase';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    } else if (name === 'userPassword') {
      setPassword(value);
    }
  };

  return (
    <div className={styles.Container}>
      <h1 className={styles.Header}>Sign In</h1>
      <div>
        {error !== null && <div>{error}</div>}
        <form>
          <label className={styles.Label}>Email:</label>
          <input
            className={styles.Input}
            type="email"
            name="userEmail"
            value={email}
            placeholder="E.g: faruq123@gmail.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <label className={styles.Label}>Password:</label>
          <input
            className={styles.Input}
            type="password"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
          <button
            className={styles.Button}
            onClick={(event) => {
              signInWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign in
          </button>
        </form>
        <p>or</p>
        <button>Sign in with Google</button>
        <p>
          Don't have an account? <Link to="signUp">Sign up here</Link>
          <br />
          <Link to="passwordReset">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
