import React, { useContext, useEffect, useState } from 'react';
import styles from '../Expectations/Expectations.module.css';
import CookieUserData from '../../Context/CookieUserData';

const Expectations = () => {
  const { cookieUserData } = useContext(CookieUserData);
  const [income, setIncome] = useState(0);
  const [savingGoal, setSavingGoal] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    if (cookieUserData) {
      setIncome(cookieUserData.userGoal.income);
      setSavingGoal(cookieUserData.userGoal.savingGoal);
      setExpenses(cookieUserData.userTotalExpenses);
    }
  }, [cookieUserData]);

  const amount = expenses + savingGoal - income;

  return (
    <div className={styles.Container}>
      <h3 className={styles.Title}>
        Expectations <span className={styles.Text}>(per month)</span>
      </h3>
      <table>
        <tbody>
          <tr>
            <td className={styles.Categories}> Your income: </td>
            <td className={styles.CategoriesValues}> {income} </td>
          </tr>
          <tr>
            <td className={styles.Categories}> Your expenses:</td>
            <td className={styles.CategoriesValues}> {expenses}</td>
          </tr>
          <tr>
            <td className={styles.Categories}>Your saving Goal:</td>
            <td className={styles.CategoriesValues}> {savingGoal}</td>
          </tr>
        </tbody>
      </table>
      {amount > 0 ? (
        <p className={styles.ConclusionText}>
          {' '}
          you will need to reduce your expenses for about{' '}
          <span className={styles.Categories}>{amount}</span> per month to reach
          your goal
        </p>
      ) : (
        <p className={styles.ConclusionText}>
          your expenses are low enough that you already can save up to{' '}
          <span className={styles.Categories}>{income - expenses}</span> per
          Month!{' '}
        </p>
      )}
    </div>
  );
};

export default Expectations;
