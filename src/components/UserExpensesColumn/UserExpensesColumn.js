import React, { useContext, useEffect, useState } from 'react';
import styles from './UserExpensesColumn.module.css';
import UpdateUserData from '../../Context/UpdateUserData';

const UsersAverageInputColumn = () => {
  const [userData, setUserData] = useState();
  const updatedData = useContext(UpdateUserData);

  const getUserData = () => {
    const name = ['userGoal=', 'userExpenses=', 'userTotalExpenses='];
    const userDataArray = {
      userGoal: '',
      userExpenses: '',
      userTotalExpenses: '',
    };
    const cookieArray = document.cookie.split('; ');
    for (let i = 0; i < cookieArray.length; i++) {
      let cA = cookieArray[i];
      const string = cA.substring(name[i].length, cA.length);
      userDataArray[Object.keys(userDataArray)[i]] = JSON.parse(string);
    }
    setUserData(userDataArray);
  };

  debugger;
  useEffect(() => {
    getUserData();
  }, [updatedData]);

  if (userData !== undefined) {
    const inputCategories = [];
    const dataValues = [];
    userData.userExpenses.forEach((x) => {
      inputCategories.push(x.name);
    });
    userData.userExpenses.forEach((x) => {
      dataValues.push(x.value);
    });
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
                <td className={styles.CategoriesValues}>
                  {parseFloat(dataValues[index]).toFixed()}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className={styles.Sum}>
              <td>Total Expenses</td>
              <td className={styles.SumValue}>{totalAveCost.toFixed()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
  return null;
};

export default UsersAverageInputColumn;
