import React, { useContext, useEffect, useState } from 'react';
import axios from '../../axios-orders';
import styles from './UserAverageInputColumn.module.css';
import UpdateUserData from '../../Context/UpdateUserData';
import AverageCost from '../../Context/ComparingData';

const UsersAverageInputColumn = () => {
  const { setAverageCosts } = useContext(AverageCost);
  const updatedData = useContext(UpdateUserData);
  const [usersData, setUsersData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/userData.json');
      setUsersData(response.data);
    } catch (e) {
      console.log(`Failure getting user input form - Error: ${e}`);
    }
  };

  const handler = (aveCost) => {
    const test = aveCost.map((x) => x);
    console.log('test', test);
    setTimeout(() => {
      debugger;
      setAverageCosts('yolo'); // infinite loop happens with array/object values , doesn't happened when single value is set.
    }, 1000);
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

    setTimeout(() => {
      handler(aveCost);
    }, 2000);

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
