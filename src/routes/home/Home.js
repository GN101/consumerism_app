/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import WorldDataColumn from '../../components/WorldDataColumn/WorldDataColumn';
import styles from './Home.module.css';
import UsersAverageInputColumn from '../../components/UsersAverageInputColumn/UsersAverageInputColumn';
import UserExpensesColumn from '../../components/UserExpensesColumn/UserExpensesColumn';
import UserGoalsColumn from '../../components/UserGoalsColumn/UserGoalsColumn';

const Home = () => {
  return (
    <div className={styles.Field}>
      <UserGoalsColumn />
      <UserExpensesColumn />
      <UsersAverageInputColumn />
      <WorldDataColumn />
    </div>
  );
};

export default Home;
