import React, { Component } from 'react';
// eslint-disable-next-line max-len
// // import styles from './WorldDataColumn.module.css';
// import WorldField from './WorldField';
// import mockedUserInputState from '../../mocks/mockedUserInputColumnState';

class UsersAverageInputColumn extends Component {
  state = {
    totalCost: 2,
  };

  render() {
    const count = this.state.totalCost;
    return <div> exo {count} arxidia </div>;
  }
}

export default UsersAverageInputColumn;
