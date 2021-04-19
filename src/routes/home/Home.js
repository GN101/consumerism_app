/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import UserInputColumn from '../../components/UserInputColumn/UserInputColumn';
import WorldDataColumn from '../../components/WorldDataColumn/WorldDataColumn';
import styles from './Home.module.css';
import UsersAverageInputColumn from '../../components/UsersAverageInputColumn/UsersAverageInputColumn';
import { UpdateUserData } from '../../Context/UpdateUserData';
class Home extends Component {
  setUpdatedData = (updatedData) => {
    this.setState({ updatedData });
    debugger;
    console.log('triger setUpdate', updatedData);
    console.log('triger setUpdate', this.state.updatedData);
    debugger;
    this.test();
  };

  state = {
    updatedData: 15,
    setUpdatedData: this.setUpdatedData,
  };

  test = () => {
    console.log('test', this.state.updatedData);
  };

  render() {
    return (
      <div className={styles.Field}>
        <UpdateUserData.Provider value={this.state}>
          <UserInputColumn />
          <UsersAverageInputColumn />
          <WorldDataColumn />
        </UpdateUserData.Provider>
      </div>
    );
  }
}

export default Home;
