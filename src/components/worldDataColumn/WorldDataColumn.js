import React, { Component } from 'react';
// eslint-disable-next-line max-len
import styles from './WorldDataColumn.module.css';
import WorldField from './WorldField';
import mockedUserInputState from '../../mocks/mockedUserInputColumnState';

class WorldDataColumn extends Component {
  state = {
    ...mockedUserInputState,
    show: true,
    totalCost: '',
  };

  toggleContent = (e) => {
    e.preventDefault();
    const { show } = this.state;
    this.setState({ show: !show });
  };

  render() {
    const { userInput, show } = this.state;
    const worldData = userInput;
    const hideFields = show ? styles.Column : styles.Hide;
    const list = Object.values(worldData);

    const worldInputForm = list.map((listItem) => (
      <WorldField
        key={`${listItem.name}world-data-id`}
        label={listItem.name}
        placeholder={listItem.placeholder}
        value={listItem.value}
      />
    ));

    return (
      <div>
        <button
          type="button"
          className={styles.Button}
          onClick={this.toggleContent}
        >
          {' '}
          Toggle{' '}
        </button>
        <div className={hideFields}>
          <div>{worldInputForm}</div>
        </div>
      </div>
    );
  }
}

export default WorldDataColumn;
