import React, { Component } from 'react';
// eslint-disable-next-line max-len
import styles from './WorldDataColumn.module.css';
import WorldField from './WorldField';


class WorldDataColumn extends Component {
  state = {
    userInput: [
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

  // Couldn't get it to work without below function. Input field will be read only so maybe there's a better way to handle.

  // worldformChangeHandler = (event, index) => {
  //   const { userInput } = this.state;
  //   const updatedForm = {
  //     ...userInput
  //   };
  //   const updatedFormEl = {
  //     ...updatedForm[index]
  //   };
  //   updatedFormEl.value = event.target.value;
  //   updatedForm[index].value = updatedFormEl.value;

  //   this.setState({ userInput: updatedForm });
  // };

  toggleContent = (e) => {
    e.preventDefault();
    const { show } = this.state;
    const hide = show;
    if (hide === show) {
      this.setState({ show: !hide });
    } else {
      this.setState({ show: true });
    }
  }

  render() {
    const { userInput, show } = this.state;
    const hideFields = show ? styles.Column : styles.Hide;
    const list = Object.values(userInput);

    const worldInputForm = (
      list.map((listItem) => (
        <WorldField
          className={listItem.name}
          key={listItem.name}
          label={listItem.name}
          placeholder={`Expenses for: ${listItem.name}`}
          value={listItem.value}
        />
      )));

    return (
      <form className={styles.Column}>
        <button type="button" className={styles.Button} onClick={this.toggleContent}> Toggle </button>
        <div className={hideFields}>
          {worldInputForm}
        </div>
      </form>
    );
  }
}

export default WorldDataColumn;
