import React, { useContext, useEffect, useState } from 'react';
import styles from './UserComparisonColumn.module.css';
import UpdateUserData from '../../Context/UpdateUserData';
import AverageCost from '../../Context/ComparingData';

const UsersComparisonColumn = () => {
  const [userData, setUserData] = useState();
  const updatedData = useContext(UpdateUserData);
  const averageCosts = useContext(AverageCost);
  console.log(averageCosts);
  debugger;

  const averageExpenses = [5, 3, 4, 2, 3, 4, 1];
  const yourExpenses = [2, 3, 5, 5, 6, 7, 8];
  const comparison = yourExpenses.map((x, index) => x - averageExpenses[index]);

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
    const totalUserCost = dataValues.reduce(
      (a, b) => parseFloat(a) + parseFloat(b)
    );
    const totalComparisonCost = comparison.reduce(
      (a, b) => parseFloat(a) + parseFloat(b)
    );

    return (
      <div>
        <h3 className={styles.Title}>Results</h3>
        <table>
          <tbody>
            <tr>
              {/* <th className={styles.Title}>Others Expenses</th> */}
              <th> &nbsp;</th>
              <th className={styles.Title}>Your Expenses</th>
              <th className={styles.Title}>Comparison</th>
            </tr>
            {inputCategories.map((category, index) => (
              <tr key={index}>
                <td className={styles.Categories}>{category}</td>
                <td className={styles.CategoriesValues}>
                  {parseFloat(dataValues[index]).toFixed()}
                </td>
                <td className={styles.CategoriesValues}>
                  {parseFloat(comparison[index]).toFixed()}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className={styles.Sum}>
              <td>Total difference</td>
              <td className={styles.SumValue}>{totalUserCost.toFixed()}</td>
              <td className={styles.SumValue}>
                {totalComparisonCost.toFixed()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
  return null;
};

export default UsersComparisonColumn;
