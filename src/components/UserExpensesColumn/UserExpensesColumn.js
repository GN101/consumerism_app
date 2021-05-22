import React, { useContext, useEffect, useState } from 'react';
import axios from '../../axios-orders';
import styles from './UserExpensesColumn.module.css';
import UpdateUserData from '../../Context/UpdateUserData';

const UsersAverageInputColumn = () => {
  const [userData, setUserData] = useState();
  const updatedData = useContext(UpdateUserData);

  const getUserData = () => {
    const name = ['userGoal=', 'userExpenses=', 'userTotalExpenses='];
    const userdataArray = {
      userGoal: '',
      userExpenses: '',
      userTotalExpenses: '',
    };
    const coockieArray = document.cookie.split('; ');
    for (let i = 0; i < coockieArray.length; i++) {
      let cA = coockieArray[i];
      const string = cA.substring(name[i].length, cA.length);
      userdataArray[Object.keys(userdataArray)[i]] = JSON.parse(string);
    }
    setUserData(userdataArray);
  };

  useEffect(() => {
    getUserData();
  }, [, updatedData]);

  if (userData !== undefined) {
    const inputCategories = Object.keys(userData.userExpenses);
    const dataValues = Object.values(userData.userExpenses);
    const totalAveCost = dataValues.reduce(
      (a, b) => parseFloat(a) + parseFloat(b)
    );

    return (
      <div>
        <h3 className={styles.Title}>Your Expenses!</h3>
        <table>
          <tbody>
            {inputCategories.map((category, index) => (
              <tr key={index}>
                <td className={styles.Categories}>{category}</td>
                <td className={styles.CategoriesValues}>{dataValues[index]}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className={styles.Sum}>
              <td>Total Expenses</td>
              <td className={styles.Sumvalue}>{totalAveCost}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
  return null;
};

export default UsersAverageInputColumn;
