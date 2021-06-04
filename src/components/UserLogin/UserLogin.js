import React, { useContext, useState } from 'react';
import styles from './UserLogin.module.css';
import { Link } from 'react-router-dom';
import { signInWithGoogle, signOut, auth } from '../../firebase/firebase';
import 'firebase/auth';
import { UserContext } from '../../Context/UserProvider';

const UserLogin = () => {
  const user = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError('Error signing in with password and email!');
      console.error('Error signing in with password and email', error);
    });
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
      {user ? (
        <div>
          <p className={styles.Header}>You are successfully logged in as :</p>
          <p className={styles.Label}>{user.displayName}</p>
          <button className={styles.Button}>
            <Link to="/about">Go to Stats</Link>
          </button>
          <button className={styles.Button} onClick={signOut}>
            Log out
          </button>
        </div>
      ) : (
        <div>
          <h1 className={styles.Header}>User Login</h1>
          {error !== null && <div>{error}</div>}
          <form>
            <label htmlFor="userEmail" className={styles.Label}>
              Email:
            </label>
            <input
              className={styles.Input}
              type="email"
              name="userEmail"
              value={email}
              placeholder="E.g: michaelG3@gmail.com"
              id="userEmail"
              onChange={(event) => onChangeHandler(event)}
            />
            <label htmlFor="userPassword" className={styles.Label}>
              Password:
            </label>
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
          <br />
          <button className={styles.GoogleButton} onClick={signInWithGoogle}>
            Sign in with Google
          </button>
          <p className={styles.Text}>
            Don't have an account? <Link to="signUp">Sign up here</Link>
            <br />
            <Link to="passwordReset">Forgot Password?</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default UserLogin;
