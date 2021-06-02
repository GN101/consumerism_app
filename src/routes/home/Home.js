/* eslint-disable react/prefer-stateless-function */
import React, { useState } from 'react';
import WorldDataColumn from '../../components/WorldDataColumn/WorldDataColumn';
import styles from './Home.module.css';
import UsersAverageInputColumn from '../../components/UsersAverageInputColumn/UsersAverageInputColumn';
import UserExpensesColumn from '../../components/UserExpensesColumn/UserExpensesColumn';
import UserComparisonColumn from '../../components/UserGoalsColumn/UserComparisonColumn';
import AverageCost from '../../Context/ComparingData';

const Home = () => {
  const [averageCosts, setAverageCosts] = useState();
  debugger;
  return (
    <AverageCost.Provider value={{ averageCosts, setAverageCosts }}>
      <div className={styles.Field}>
        <UserComparisonColumn />
        <UserExpensesColumn />
        <UsersAverageInputColumn />
        <WorldDataColumn />
      </div>
    </AverageCost.Provider>
  );
};

export default Home;
