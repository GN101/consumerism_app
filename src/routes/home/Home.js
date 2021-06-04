/* eslint-disable react/prefer-stateless-function */
import React, { useState } from 'react';
import WorldDataColumn from '../../components/WorldDataColumn/WorldDataColumn';
import styles from './Home.module.css';
import UsersAverageInputColumn from '../../components/UsersAverageInputColumn/UsersAverageInputColumn';
// import UserExpensesColumn from '../../components/UserExpensesColumn/UserExpensesColumn';
import UserComparisonColumn from '../../components/UserComparisonColumn/UserComparisonColumn';
import Expectations from '../../components/Expectations/Expectations';
import AverageCost from '../../Context/ComparingData';
import CookieUserData from '../../Context/CookieUserData';

const Home = () => {
  const [averageCosts, setAverageCosts] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [cookieUserData, setCookieUserData] = useState();
  const defaultValue = { averageCosts, setAverageCosts };
  return (
    <CookieUserData.Provider value={{ cookieUserData, setCookieUserData }}>
      <AverageCost.Provider value={defaultValue}>
        <div className={styles.Field}>
          <UserComparisonColumn />
          <Expectations />
          {/* <UserExpensesColumn /> */}
          <UsersAverageInputColumn />
          <WorldDataColumn />
        </div>
      </AverageCost.Provider>
    </CookieUserData.Provider>
  );
};

export default Home;
