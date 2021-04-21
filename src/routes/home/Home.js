/* eslint-disable react/prefer-stateless-function */
import React, { useState } from 'react';
import UserInputColumn from '../../components/UserInputColumn/UserInputColumn';
import WorldDataColumn from '../../components/WorldDataColumn/WorldDataColumn';
import styles from './Home.module.css';
import UsersAverageInputColumn from '../../components/UsersAverageInputColumn/UsersAverageInputColumn';
import { UpdateUserData } from '../../Context/UpdateUserData';

const Home = () => {
  const [updatedData, setUpdatedData] = useState(1);
  const defaultValue = { updatedData, setUpdatedData };

  return (
    <div className={styles.Field}>
      <UpdateUserData.Provider value={defaultValue}>
        <UserInputColumn />
        <UsersAverageInputColumn />
        <WorldDataColumn />
      </UpdateUserData.Provider>
    </div>
  );
};

export default Home;
