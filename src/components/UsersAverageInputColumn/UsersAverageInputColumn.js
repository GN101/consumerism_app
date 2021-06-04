import React, { useContext, useEffect, useState } from 'react';
import axios from '../../axios-orders';
import styles from './UserAverageInputColumn.module.css';
import UpdateUserData from '../../Context/UpdateUserData';
import AverageCost from '../../Context/ComparingData';

const UsersAverageInputColumn = () => {
  const { setAverageCosts } = useContext(AverageCost);
  const updatedData = useContext(UpdateUserData);
  const [usersData, setUsersData] = useState();
  const [aveCost, setAveCost] = useState();
  const [inputCategories, setInputCategories] = useState();
  const [totalAveCost, setTotalAveCost] = useState();

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

  useEffect(() => {
    if (usersData) {
      const usersInputs = [];
      const usersDataArr = Object.values(usersData);
      usersDataArr[0].categories.forEach((x) => {
        usersInputs.push({ name: x.name, value: [] });
      });
      for (let i = 0; i < usersDataArr.length; i++) {
        for (let j = 0; j < usersDataArr[i].categories.length; j++) {
          usersInputs[j].value.push(usersDataArr[i].categories[j].value);
        }
      }
      setAveCost(
        usersInputs
          .map((x) => x.value)
          .map(
            (x) =>
              x.reduce((a, b) => parseFloat(a) + parseFloat(b)) /
              usersInputs[0].value.length
          )
      );
      setInputCategories(usersInputs.map((x) => x.name));
    }
  }, [usersData]);

  useEffect(() => {
    if (aveCost) {
      setAverageCosts(aveCost);
      setTotalAveCost(aveCost.reduce((a, b) => a + b));
    }
  }, [aveCost]);

  return null;
  // return totalAveCost ? (
  //   <div>
  //     <h3 className={styles.Title}>Users average Costs!</h3>
  //     <table>
  //       <tbody>
  //         {inputCategories.map((category, index) => (
  //           <tr key={index}>
  //             <td className={styles.Categories}>{category}</td>
  //             <td className={styles.CategoriesValues}>
  //               {aveCost[index].toFixed()}
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //       <tfoot>
  //         <tr className={styles.Sum}>
  //           <td>Total Cost</td>
  //           <td className={styles.SumValue}>{totalAveCost.toFixed()}</td>
  //         </tr>
  //       </tfoot>
  //     </table>
  //   </div>
  // ) : null;
};

export default UsersAverageInputColumn;
