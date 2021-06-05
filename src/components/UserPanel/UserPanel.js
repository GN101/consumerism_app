import React, { useState } from 'react';
import PortalInputColumn from '../PortalInputColumn/PortalInputColumn';
import styles from './UserPanel.module.css';
import UserInputColumn from '../UserInputColumn/UserInputColumn';

const UserPanel = () => {
  const [timeFrameSavingGoal, setTimeFrameSavingGoal] = useState(1);
  const [timeFrameIncome, setTimeFrameIncome] = useState(1);
  const [savingGoal, setSavingGoal] = useState();
  const [income, setIncome] = useState();
  // const [userData, setUserData] = useState();
  const [showPortal, setShowPortal] = useState(false);

  const goalSubmit = (event) => {
    event.preventDefault();
    CreateCookie();
    togglePortal();
  };

  const togglePortal = () => {
    setShowPortal(!showPortal);
  };

  const CreateCookie = () => {
    const userGoal = {
      savingGoal: savingGoal * timeFrameSavingGoal,
      income: income * timeFrameIncome,
    };
    const daysToExpire = 31;
    const d = new Date();
    d.setTime(d.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = 'userGoal=' + JSON.stringify(userGoal) + ';' + expires;
  };

  return (
    <div className={styles.Container}>
      <h2 className={styles.Header}>Welcome, our fellow Consumer</h2>
      <p className={styles.Text}>it's time to take care of your Expenses!</p>
      <form onSubmit={goalSubmit}>
        <div className={styles.Timeperiod}>
          <label className={styles.Label} htmlFor="input1">
            How much do you want to save?
          </label>
          <select
            defaultValue={timeFrameSavingGoal}
            onChange={(e) => setTimeFrameSavingGoal(e.target.value)}
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
            defaultValue={timeFrameIncome}
            onChange={(e) => setTimeFrameIncome(e.target.value)}
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
      <button className={styles.Button} onClick={togglePortal}>
        Edit Expenses
      </button>
      {showPortal ? (
        <PortalInputColumn onClose={togglePortal}>
          <UserInputColumn></UserInputColumn>
        </PortalInputColumn>
      ) : null}
    </div>
  );
};

export default UserPanel;
