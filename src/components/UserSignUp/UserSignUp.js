import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../InputField/InputField';
import styles from './UserSignUp.module.css';
import axios from '../../axios-orders';
import firebase from 'firebase/app';
import { UserContext } from '../../Context/UserProvider';

const UserSignUp = () => {
  const [userInput, setUserInput] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const user = useContext(UserContext);

  const fetchUserForm = async () => {
    try {
      const res = await axios.get('/userSignUpState.json');
      setUserInput(res.data.userSignUpForm);
    } catch (e) {
      console.log(`Failure getting user input form - Error: ${e}`);
    }
  };

  useEffect(() => {
    fetchUserForm();
  }, []);

  const formChangeHandler = (event, index) => {
    const updatedForm = {
      ...userInput,
    };
    const updatedFormEl = {
      ...updatedForm[index],
    };
    updatedFormEl.value = event.target.value;

    updatedFormEl.valid = checkValidity(updatedFormEl)[0];
    updatedFormEl.isSuspicious = checkValidity(updatedFormEl)[1];
    updatedFormEl.hasValue = true;
    updatedForm[index] = updatedFormEl;

    let formIsValid = true;
    for (const i in updatedForm) {
      formIsValid = updatedForm[i].valid && formIsValid;
    }
    setUserInput(updatedForm);
    setFormIsValid(formIsValid);
  };

  const checkValidity = (obj) => {
    let isValid = true;
    let isSuspicious = false;

    if (!obj.validation) {
      return true;
    }
    if (obj.validation.type === 'date') {
      isSuspicious = obj.value < '1931-01-01';
      isValid = obj.value < '2021-01-01' && isValid;
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
              '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&-+=()])(?=\\S+$).{6,30}$',
            title:
              'at least 6 characters long including 1 number,1 symbol,1 upercase letter, 1 downcase letter ',
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
            type: 'text',
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
        default:
          console.log('error with object.name');
      }
      const pattern = new RegExp(obj.validation.pattern);
      isValid = (pattern.test(obj.value) || obj.value.trim() === '') && isValid;
    }
    return [isValid, isSuspicious];
  };
  const submitFormHandler = async (event) => {
    const NicknameList = [];
    const EmailList = [];
    try {
      const userAcountInfo = { personalInfo: {} };
      event.preventDefault();
      if (formIsValid) {
        try {
          const userAcounts = await axios.get('userAcounts/.json');
          const data = userAcounts.data;
          for (const key in data) {
            NicknameList.push(data[key].personalInfo.Nickname);
            EmailList.push(data[key].personalInfo['E-mail']);
          }
        } catch (e) {
          console.log(`Failure getting Nickname List- Error: ${e}`);
        }
        if (!NicknameList.includes(userInput[0]['value'])) {
          if (!EmailList.includes(userInput[4]['value'])) {
            const userInputArr = Object.values(userInput);
            userInputArr.map(
              (userInfo) =>
                (userAcountInfo.personalInfo[userInfo.name] = userInfo.value)
            );

            firebase
              .auth()
              .createUserWithEmailAndPassword(
                userAcountInfo.personalInfo['E-mail'],
                userAcountInfo.personalInfo['Password']
              )
              .then(function () {
                firebase
                  .auth()
                  .currentUser.updateProfile({
                    displayName: userAcountInfo.personalInfo['Nickname'],
                  })
                  .then(function () {
                    console.log('Name Update successful.');
                  })
                  .catch(function (error) {
                    console.log('An error happened.');
                  });
              })
              .catch(function (error) {
                console.log(error.code);
                console.log(error.message);
              });

            axios
              .post('/userAcounts.json', userAcountInfo)
              .then((res) => console.log('res', res))
              .catch((e) => console.log('error', e));
          } else {
            alert('E-mail in use by another acount');
          }
        } else {
          alert('Nickname taken try another one.');
        }
      } else {
        // TODO: we need to render a proper error message for such cases
        console.log('SUBMIT FAILED - Form is invalid!');
        alert('SUBMIT FAILED - Form is invalid or misses data');
      }
    } catch (e) {
      console.log(`Error during User Input Form submission: ${e}`);
    }
  };

  const listOfUserInfo = Object.values(userInput);

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
      hasValue={item.hasValue}
      type={item.validation.type}
      pattern={item.validation.pattern}
      title={item.validation.title}
      changed={(event) => {
        formChangeHandler(event, index);
      }}
    />
  ));

  return (
    <div className={styles.Form}>
      {user ? (
        <div>
          <p className={styles.Header}>You are succesfuly loged in as :</p>
          <p className={styles.Label}>{user.displayName}</p>
          <button className={styles.Button}>
            <Link to="/about">Go to Stats</Link>
          </button>
        </div>
      ) : (
        <form onSubmit={submitFormHandler}>
          <div className={styles.Label}>
            <h2 className={styles.Header}>{"Let's Get Started!"}</h2>
            {signUpForm}
            <button className={styles.Button} type="submit">
              SIGN UP
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
export default UserSignUp;
