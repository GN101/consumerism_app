import React, { useState } from 'react';
import styles from './WorldDataColumn.module.css';
import mockedWorldData from '../../mocks/mockedWorldData';

const WorldDataColumn = () => {
  const [show, setShow] = useState(false);

  const toggleContent = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const categories = Object.keys(mockedWorldData);
  const values = Object.values(mockedWorldData);
  const totalCost = values.reduce((a, b) => parseFloat(a) + parseFloat(b));
  const hideFields = show ? styles.Column : styles.Hide;

  return (
    <div>
      <button type="button" className={styles.Button} onClick={toggleContent}>
        World Data
      </button>
      <div className={hideFields}>
        <h3 className={styles.Title}>World Data</h3>
        <table>
          <tbody>
            {categories.map((categoryName, index) => (
              <tr key={index}>
                <td className={styles.Categories}>{categoryName}</td>
                <td className={styles.Values}>{values[index]}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className={styles.Sum}>
              <td>Total Cost</td>
              <td className={styles.Sumvalue}>{totalCost.toFixed()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default WorldDataColumn;
