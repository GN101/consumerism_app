import React, { useState } from 'react';
import PortalInputField from '../PortalInputField/PortalInputField';
import styles from './UserPanel.module.css';

const UserPanel = () => {
  const [timeframe] = useState('per Month');

  return (
    <div className={styles.Container}>
      <h2 className={styles.Header}>Wellcome our fellow Consumer</h2>
      <p className={styles.Text}>it's time to take care of your Expenses!</p>
      <form>
        <div className={styles.TimePeriod}>
          <label className={styles.Label} htmlFor="input1">
            How much do you wana save?
          </label>
          <select defaultValue={timeframe}>
            <option value="per Week">per Week </option>
            <option value="per Month">per Month</option>
            <option value="per Year">per Year</option>
          </select>
          <input
            className={styles.Input}
            id="input1"
            onChange={(event) => {
              event.target.value = event.target.value.replace(/[\D]/, '');
            }}
          />
          <label className={styles.Label} htmlFor="input2">
            What's your income?
          </label>
          <select defaultValue={timeframe}>
            <option value="per Week">per Week </option>
            <option value="per Month">per Month</option>
            <option value="per Year">per Year</option>
          </select>
          <input
            className={styles.Input}
            id="input2"
            onChange={(event) => {
              event.target.value = event.target.value.replace(/[\D]/, '');
            }}
          />
        </div>
        <button className={styles.Button}> Lets go </button>
      </form>
      <PortalInputField></PortalInputField>
    </div>
  );
};

export default UserPanel;
