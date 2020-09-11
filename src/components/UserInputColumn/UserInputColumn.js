import React, { Component } from 'react';
import styles from './UserInputColumn.module.css';
import InputField from './InputField/InputField';


class UserInputColumn extends Component {
  state = {

  };

  render() {
    // eslint-disable-next-line max-len
    const listOfCostsCategories = ['outdoor snacks', 'indoor snacks', 'groceries', 'expensive trips', 'cheap trips', 'cloths',
      'shoes', 'gas / vehicle fuel', 'art', 'furniture / equipment', 'entertainment (outdoors)', 'entertainment (indoors'];
    const InputForm = (
      listOfCostsCategories.map((listItems) => (
        <InputField
          key={listItems}
          label={listItems}
          placeholder={`insert expenses for ${listItems} here`}
          category={listItems}
        />
      ))
    );

    return (
      <form className={styles.Column}>
        <h2>Please fill the form below!</h2>
        {InputForm}
        <button className={styles.Button} type="submit">SUBMIT</button>
      </form>
    );
  }
}

export default UserInputColumn;
