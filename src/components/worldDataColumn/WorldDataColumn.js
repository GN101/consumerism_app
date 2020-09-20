import React, { Component } from 'react';
// eslint-disable-next-line max-len
import styles from './WorldDataColumn.module.css';
import WorldField from './WorldField';


class WorldDataColumn extends Component {
  state = {
    worldData: [
      {
        name: 'snacks indoor',
        value: '25',
        categories: [],
      },
      {
        name: 'snacks outdoor',
        value: '50',
        categories: [],
      },
      {
        name: 'groceries',
        value: '250',
        categories: [],
      },
      {
        name: 'trips cheap',
        value: '30',
        categories: [],
      },
      {
        name: 'trips expensive',
        value: '250',
        categories: [],
      },
      {
        name: 'clothes',
        value: '15',
        categories: [],
      },
      {
        name: 'shoes',
        value: '10',
        categories: [],
      },
      {
        name: 'fitness',
        value: '30',
        categories: [],
      },
      {
        name: 'jewelry',
        value: '92',
        categories: [],
      },
      {
        name: 'personal vehicle',
        value: '120',
        categories: [],
      },
      {
        name: 'public transportation',
        value: '30',
        categories: [],
      },
      {
        name: 'entertainment indoors',
        value: '60',
        categories: [],
      },
      {
        name: 'entertainment outdoors',
        value: '80',
        categories: [],
      },
    ],
    show: true,
    totalCost: ''
  };

  toggleContent = (e) => {
    e.preventDefault();
    const { show } = this.state;
    this.setState({ show: !show });
  }

  render() {
    const { worldData, show } = this.state;
    const hideFields = show ? styles.Column : styles.Hide;
    const list = Object.values(worldData);

    const worldInputForm = (
      list.map((listItem) => (
        <WorldField
          key={listItem.name}
          label={listItem.name}
          placeholder={`Expenses for: ${listItem.name}`}
          value={listItem.value}
        />
      )));

    return (
      <div>
        <button type="button" className={styles.Button} onClick={this.toggleContent}> Toggle </button>
        <div className={hideFields}>
          {/* <button type="button" className={styles.Button} onClick={this.toggleContent}> Toggle </button> */}
          <div>
            {worldInputForm}
          </div>
        </div>
      </div>
    );
  }
}

export default WorldDataColumn;
