import React from 'react';
import styles from '../Expectations/Expectations.module.css';

const Expectations = () => {
  const income = 650;
  const expenses = 600;
  const savingGoal = 100;
  const amount = 50;

  return (
    <div>
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
      <p className={styles.CategoriesValues}>
        {' '}
        you will need to reduce your expenses for about{' '}
        <span className={styles.Categories}>{amount}</span> per month to reach
        your goal
      </p>
    </div>
  );
};

export default Expectations;
