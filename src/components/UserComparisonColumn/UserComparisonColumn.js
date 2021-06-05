import React, { useContext, useEffect, useState } from 'react';
import styles from './UserComparisonColumn.module.css';
import UpdateUserData from '../../Context/UpdateUserData';
import AverageCost from '../../Context/ComparingData';
import CookieUserData from '../../Context/CookieUserData';

const UsersComparisonColumn = () => {
  const [userData, setUserData] = useState();
  const updatedData = useContext(UpdateUserData);
  const { averageCosts } = useContext(AverageCost);
  const { setCookieUserData } = useContext(CookieUserData);

  const getUserData = () => {
    const userDataArray = {};
    const cookieArray = document.cookie.split('; ');

    for (let i = 0; i < cookieArray.length; i++) {
      let cA = cookieArray[i];
      const string = cA.substring(cA.indexOf('=') + 1);
      userDataArray[cA.substring(0, cA.indexOf('='))] = JSON.parse(string);
    }
    setUserData(userDataArray);
    setCookieUserData(userDataArray);
  };

  useEffect(() => {
    getUserData();
  }, [updatedData]);

  if (userData !== undefined) {
    const inputCategories = [];
    const yourExpenses = [];
    const averageExpenses = averageCosts;

    userData.userExpenses.forEach((x) => {
      inputCategories.push(x.name);
    });
    userData.userExpenses.forEach((x) => {
      yourExpenses.push(x.value);
    });
    const totalUserCost = yourExpenses.reduce(
      (a, b) => parseFloat(a) + parseFloat(b)
    );
    const comparison = yourExpenses.map(
      (x, index) => x - averageExpenses[index]
    );
    const totalComparisonCost = comparison.reduce(
      (a, b) => parseFloat(a) + parseFloat(b)
    );
    const totalAverageCost = averageExpenses.reduce(
      (a, b) => parseFloat(a) + parseFloat(b)
    );

    return (
      <div className={styles.Table}>
        <h3 className={styles.Title}>
          Results <span className={styles.Text}>(per month)</span>
        </h3>
        <table>
          <tbody>
            <tr>
              <th className={styles.Title}>Categories</th>
              <th className={styles.Title}>Your Expenses</th>
              <th className={styles.Title}>Others Expenses</th>
              <th className={styles.Title}>Comparison</th>
            </tr>
            {inputCategories.map((category, index) => (
              <tr key={index}>
                <td className={styles.Categories}>{category}</td>
                <td className={styles.CategoriesValues}>
                  {parseFloat(yourExpenses[index]).toFixed()}
                </td>
                <td className={styles.CategoriesValues}>
                  {parseFloat(averageExpenses[index]).toFixed()}
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
              <td className={styles.SumValue}>{totalAverageCost.toFixed()}</td>
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
