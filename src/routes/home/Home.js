/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import UserInputColumn from '../../components/UserInputColumn/UserInputColumn';
import WorldDataColumn from '../../components/WorldDataColumn/WorldDataColumn';
import styles from './Home.module.css';
import UsersAverageInputColumn from '../../components/UsersAverageInputColumn/UsersAverageInputColumn';

class Home extends Component {
  render() {
    return (
      <div className={styles.Field}>
        <UserInputColumn />
        <WorldDataColumn />
        <UsersAverageInputColumn />
        {/* TODO: <UsersAverageDataColumn /> to be placed here */}
      </div>
    );
  }
}

export default Home;
