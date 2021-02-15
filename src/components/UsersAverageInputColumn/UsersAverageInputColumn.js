import React from 'react';
import dataInputs from '../../mocks/dataInputs';

const UsersAverageInputColumn = () => {
  const average = dataInputs.reduce((a, b) => {
    for (const [key, value] of Object.entries(b)) {
      if (!a[key]) {
        a[key] = 0;
      }
      a[key] += value / dataInputs.length;
    }
    return a;
  }, []);

  const keys = Object.keys(average);
  const values = Object.values(average);
  const totalCost = values.reduce((a, b) => a + b);

  return (
    <div>
      <h3>User Data averages!</h3>
      <table>
        <tbody>
          {keys.map((key, index) => (
            <tr>
              <td>{key}</td>
              <td>{values[index].toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total Cost</td>
            <td>{totalCost.toFixed(1)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default UsersAverageInputColumn;
