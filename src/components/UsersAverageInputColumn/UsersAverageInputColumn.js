import React from 'react';
import dataInputs from '../../mocks/dataInputs';

const UsersAverageInputColumn = () => {
  // const key = 'clothes';
  // const average =
  //   dataInputs.reduce((a, b) => (dataInputs[0][key] += b[key])) /
  //   dataInputs.length;
  // const result = Object.keys(dataInputs[0]).forEach((key) => average(key));
  // console.log(result);
  // console.log(dataInputs[1]['clothes']);

  const average2 = dataInputs.reduce((basket, fruit) => {
    for (const [key, value] of Object.entries(fruit)) {
      if (!basket[key]) {
        basket[key] = 0;
      }
      basket[key] += value;
    }

    return basket;
  }, {});
  console.log(average2);

  return <div> {2} </div>;

  // let filteredData = data.filter(({ gender }) => gender == 'female'),
  // avg = filteredData.reduce((r, c) => r + c.age, 0) / filteredData.length;
};

export default UsersAverageInputColumn;
