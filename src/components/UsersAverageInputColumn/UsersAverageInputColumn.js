import React, { useContext, useEffect, useState } from 'react';
import axios from '../../axios-orders';
import styles from './UserAverageInputColumn.module.css';
import UpdateUserData from '../../Context/UpdateUserData';

const UsersAverageInputColumn = () => {
  const [usersData, setUsersData] = useState([]);
  const updatedData = useContext(UpdateUserData);

  const fetchData = async () => {
    try {
      const response = await axios.get('/userData.json');
      setUsersData(response.data);
    } catch (e) {
      console.log(`Failure getting user input form - Error: ${e}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [updatedData]);

  const usersDataArr = Object.values(usersData);
  if (usersDataArr.length > 0) {
    const usersInputs = [];
    usersDataArr[0].categories.forEach((x) => {
      usersInputs.push({ name: x.name, value: [] });
    });
    for (let i = 0; i < usersDataArr.length; i++) {
      for (let j = 0; j < usersDataArr[i].categories.length; j++) {
        usersInputs[j].value.push(usersDataArr[i].categories[j].value);
      }
    }
    const aveCost = usersInputs
      .map((x) => x.value)
      .map(
        (x) =>
          x.reduce((a, b) => parseFloat(a) + parseFloat(b)) /
          usersInputs[0].value.length
      );
    const totalAveCost = aveCost.reduce((a, b) => a + b);
    const inputCategories = usersInputs.map((x) => x.name);
    return (
      <div>
        <h3 className={styles.Title}>Users average Costs!</h3>
        <table>
          <tbody>
            {inputCategories.map((category, index) => (
              <tr key={index}>
                <td className={styles.Categories}>{category}</td>
                <td className={styles.CategoriesValues}>
                  {aveCost[index].toFixed()}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className={styles.Sum}>
              <td>Total Cost</td>
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
