import React, { Component } from 'react';
import styles from './WorldDataColumn.module.css';
import WorldField from './WorldField';
import mockedUserInputState from '../../mocks/mockedUserInputColumnState';

class WorldDataColumn extends Component {
  state = {
    mockedUserInputState,
    show: true,
    totalCost: '',
  };

  toggleContent = (e) => {
    e.preventDefault();
    const { show } = this.state;
    this.setState({ show: !show });
  };

  render() {
    const userInput = this.state.mockedUserInputState;
    const { show } = this.state;
    const hideFields = show ? styles.Column : styles.Hide;

    const worldInputForm = userInput.map((obj) => (
      <WorldField
        key={`${obj.name}world-data-id`}
        label={obj.name}
        placeholder={obj.placeholder}
        value={obj.value}
      />
    ));

    return (
      <div>
        <button
          type="button"
          className={styles.Button}
          onClick={this.toggleContent}
        >
          Toggle
        </button>
        <div className={hideFields}>
          <div>{worldInputForm}</div>
        </div>
      </div>
    );
  }
}

export default WorldDataColumn;
