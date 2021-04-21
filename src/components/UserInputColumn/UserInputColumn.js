import React, { useState, useEffect, useContext } from 'react';
import styles from './UserInputColumn.module.css';
import InputField from '../InputField/InputField';
import axios from '../../axios-orders';
import { UpdateUserData } from '../../Context/UpdateUserData';

const UserInputColumn = () => {
  const [userInput, setUserInput] = useState([]);
  const [formIsValid, setFormIsValid] = useState(false);
  const [totalCost, setTotalCost] = useState('');
  const { updatedData, setUpdatedData } = useContext(UpdateUserData);

  const update = () => {
    setTimeout(() => {
      setUpdatedData(updatedData + 1);
    }, 500);
  };

  const fetchUserForm = async () => {
    try {
      const res = await axios.get('/userInputState.json');
      setUserInput(res.data.userInputForm);
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
    updatedFormEl.touched = true;
    updatedForm[index] = updatedFormEl;
    let formIsValid = true;
    for (const i in updatedForm) {
      formIsValid = updatedForm[i].valid && formIsValid;
    }
    setUserInput(updatedForm);
    setFormIsValid(formIsValid);
  };

  const submitFormHandler = async (event) => {
    try {
      const userData = { categories: {}, totalCost };
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
        await setTotalCost(totalC); // doesnt update totalCost value
        userData.totalCost = totalC;
        const userInputArr = Object.values(userInput);
        userInputArr.map(
          (userInfo) => (userData.categories[userInfo.name] = userInfo.value)
        );
        Object.values(userInput);
        const suspiciousInputArr = Object.values(userInput);
        suspiciousInputArr.map(
          (suspiciousInput) =>
            (userData.suspiciousInput[
              suspiciousInput.name
            ] = suspiciousInput.isSuspicious
              ? 'Low'
              : suspiciousInput.isTooHigh
              ? 'High'
              : false)
        );

        axios
          .post('/userData.json', userData)
          .then((res) => console.log(res))
          .catch((e) => console.log(e))
          .then(update());
      } else {
        // TODO: we need to render a proper error message for such cases
        console.log('SUBMIT FAILED - Form is invalid!');
      }
    } catch (e) {
      console.log(`Error during User Input Form submission: ${e}`);
    }
  };

  const checkValidity = (obj) => {
    let isValid = true;
    let isSuspicious = false;
    let isTooHigh = false;

    if (!obj.validation) {
      return true;
    }

    if (obj.validation.range) {
      isSuspicious = obj.value < obj.validation.range[0];
      isTooHigh = obj.value > obj.validation.range[1];
    }

    if (obj.validation.type === 'number') {
      const pattern = /^\d+$/;
      isValid = (pattern.test(obj.value) || obj.value.trim() === '') && isValid;
    }
    return [isValid, isSuspicious];
  };

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
        event.target.value = event.target.value.replace(/[\D]/, '');
        formChangeHandler(event, index);
      }}
    />
  ));

  return (
    <div className={styles.Container}>
      <form className={styles.Column} onSubmit={submitFormHandler}>
        <h3>Please fill the form below!</h3>
        {inputForm}
        <button className={styles.Button} type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default UserInputColumn;
