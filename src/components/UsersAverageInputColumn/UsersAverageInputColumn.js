import React, { useEffect, useState } from 'react';
import axios from '../../axios-orders';

const UsersAverageInputColumn = () => {
  const [usersData, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/userData.json');
        setData(response.data);
      } catch (e) {
        console.log(`Failure getting user input form - Error: ${e}`);
      }
    };
    fetchData();
  }, []);

  const usersDataArr = Object.values(usersData);

  if (usersDataArr.length > 0) {
    const usersInputs = [];
    for (let i = 0; i < usersDataArr.length; i++) {
      usersInputs.push(usersDataArr[i].categories);
    }

    const average = usersInputs.reduce((a, b) => {
      for (const [key, value] of Object.entries(b)) {
        if (!a[key]) {
          a[key] = 0;
        }
        a[key] += value / usersInputs.length;
      }
      return a;
    }, []);

    const inputCategories = Object.keys(average);
    const aveCost = Object.values(average);
    const totalAveCost = aveCost.reduce((a, b) => a + b);

    return (
      <div>
        <h3>User Data averages!</h3>
        <table>
          <tbody>
            {inputCategories.map((category, index) => (
              <tr>
                <td>{category}</td>
                <td>{aveCost[index].toFixed()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total Cost</td>
              <td>{totalAveCost.toFixed()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  } else {
    return <div>loading</div>; //this gives a warning but I need it cause Async fetchData response [] and breaks code. does pretyfiy "malakizete"?
  }
};

export default UsersAverageInputColumn;
