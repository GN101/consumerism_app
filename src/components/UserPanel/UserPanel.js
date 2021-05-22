import React, { useState } from 'react';
import PortalInputColumn from '../PortalInputColumn/PortalInputColumn';
import styles from './UserPanel.module.css';
import UserInputColumn from '../UserInputColumn/UserInputColumn';

const UserPanel = () => {
  const [timeframeSavingGoal, setTimeframeSavingGoal] = useState(1);
  const [timeframeIncome, setTimeframeIncome] = useState(1);
  const [savingGoal, setSavingGoal] = useState();
  const [income, setIncome] = useState();
  const [userData, setUserData] = useState();
  const [showPortal, setShowPortal] = useState(false);

  const goalSubmit = (event) => {
    event.preventDefault();
    CreateCoockie();
    tooglePortal();
  };

  const tooglePortal = () => {
    setShowPortal(!showPortal);
  };

  const getUserData = () => {
    const name = ['userExpenses=', 'userTotalExpenses=', 'userGoal='];
    const userdataArray = {
      userExpenses: '',
      userTotalExpenses: '',
      userGoal: '',
    };
    const coockieArray = document.cookie.split('; ');
    for (let i = 0; i < coockieArray.length; i++) {
      let cA = coockieArray[i];
      const string = cA.substring(name[i].length, cA.length);
      userdataArray[Object.keys(userdataArray)[i]] = JSON.parse(string);
    }
    setUserData(userdataArray);
  };

  const CreateCoockie = () => {
    const userGoal = {
      savingGoal: savingGoal * timeframeSavingGoal,
      income: income * timeframeIncome,
    };
    const daysToExpire = 31;
    const d = new Date();
    d.setTime(d.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = 'userGoal=' + JSON.stringify(userGoal) + ';' + expires;
  };

  return (
    <div className={styles.Container}>
      <h2 className={styles.Header}>Wellcome our fellow Consumer</h2>
      <p className={styles.Text}>it's time to take care of your Expenses!</p>
      <form onSubmit={goalSubmit}>
        <div className={styles.TimePeriod}>
          <label className={styles.Label} htmlFor="input1">
            How much do you wana save?
          </label>
          <select
            defaultValue={timeframeSavingGoal}
            onChange={(e) => setTimeframeSavingGoal(e.target.value)}
          >
            <option value={(1 / 7) * (365 / 12)}>per Week </option>
            <option value={1}>per Month</option>
            <option value={1 / 12}>per Year</option>
          </select>
          <input
            className={styles.Input}
            id="input1"
            required
            onChange={(event) => {
              event.target.value = event.target.value.replace(/[\D]/, '');
              setSavingGoal(event.target.value);
            }}
          />
          <label className={styles.Label} htmlFor="input2">
            What's your income?
          </label>
          <select
            defaultValue={timeframeIncome}
            onChange={(e) => setTimeframeIncome(e.target.value)}
          >
            <option value={(1 / 7) * (365 / 12)}>per Week </option>
            <option value={1}>per Month</option>
            <option value={1 / 12}>per Year</option>
          </select>
          <input
            className={styles.Input}
            id="input2"
            required
            onChange={(event) => {
              event.target.value = event.target.value.replace(/[\D]/, '');
              setIncome(event.target.value);
            }}
          />
        </div>
        <button className={styles.Button} type="submit">
          Lets go
        </button>
      </form>
      <button className={styles.Button} onClick={getUserData}>
        GetUserData
      </button>
      <button className={styles.Button} onClick={tooglePortal}>
        Edit Expenses
      </button>
      {showPortal ? (
        <PortalInputColumn onClose={tooglePortal}>
          <UserInputColumn></UserInputColumn>
        </PortalInputColumn>
      ) : null}
    </div>
  );
};

export default UserPanel;
