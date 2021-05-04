import React, { useState, useEffect, useContext } from 'react';
import styles from './UserInputColumn.module.css';
import InputField from '../InputField/InputField';
import axios from '../../axios-orders';
import { UpdateUserData } from '../../Context/UpdateUserData';

const UserInputColumn = () => {
  const { updatedData, setUpdatedData } = useContext(UpdateUserData);
  const [userInput, setUserInput] = useState([]);
  const [formIsValid, setFormIsValid] = useState(false);

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

  const formChangeHandler = (value, index, time) => {
    const updatedForm = {
      ...userInput,
    };
    const updatedFormEl = {
      ...updatedForm[index],
    };
    updatedFormEl.input = value;
    updatedFormEl.value = timeFramedValue(value, time);
    updatedFormEl.valid = checkValidity(updatedFormEl)[0];
    updatedFormEl.isSuspicious = checkValidity(updatedFormEl)[1];
    updatedFormEl.isTooHigh = checkValidity(updatedFormEl)[2];
    updatedFormEl.hasValue = true;

    updatedForm[index] = updatedFormEl;

    let formIsValid = true;
    for (const i in updatedForm) {
      formIsValid = updatedForm[i].valid && formIsValid;
    }
    setUserInput(updatedForm);
    setFormIsValid(formIsValid);
  };

  const timeFramedValue = (value, time) => {
    switch (time) {
      case 'per Week':
        return (value / 7) * (365 / 12);
      case 'per Month':
        return value;
      case 'per Year':
        return value / 12;
      default:
        console.log('error with object.time');
    }
  };

  const submitFormHandler = async (event) => {
    try {
      event.preventDefault();
      const userData = { categories: {}, totalCost: '', suspiciousInput: {} };
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
      const lowRange = obj.validation.range[0];
      const highRange = obj.validation.range[1];

      isSuspicious = obj.value < lowRange && obj.value > 0;
      isTooHigh = obj.value > highRange;
    }

    if (obj.validation.type === 'number') {
      const pattern = /^\d+$/;
      isValid = (pattern.test(obj.value) || obj.value.trim() === '') && isValid;
    }
    return [isValid, isSuspicious, isTooHigh];
  };

  const list = Object.values(userInput);
  const inputForm = list.map((listItem, index) => (
    <InputField
      key={listItem.name}
      type={listItem.validation.type}
      label={listItem.name}
      placeholder={listItem.placeholder}
      value={listItem.value}
      valid={listItem.valid}
      isSuspicious={listItem.isSuspicious}
      isTooHigh={listItem.isTooHigh}
      hasValue={listItem.hasValue}
      timeCategorisation={true}
      valRequired={listItem.validation.required}
      time={(event) => {
        if (userInput[index].input > 0) {
          formChangeHandler(userInput[index].input, index, event.target.value);
        }
      }}
      changed={(event) => {
        event.target.value = event.target.value.replace(/[\D]/, '');
        formChangeHandler(
          event.target.value,
          index,
          event.target.attributes.time.value
        );
      }}
    />
  ));

  return (
    <div className={styles.Container}>
      <h3>Please fill the form below!</h3>
      <form className={styles.Column} onSubmit={submitFormHandler}>
        {inputForm}
        <button className={styles.Button} type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default UserInputColumn;
