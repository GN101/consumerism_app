import React, { useState } from 'react';
import styles from './WorldDataColumn.module.css';
import mockedWorldData from '../../mocks/mockedWorldData';

const WorldDataColumn = () => {
  const [show, setShow] = useState(false);

  const toggleContent = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const categories = mockedWorldData.map((x) => (x = x.name));
  const values = mockedWorldData.map((x) => (x = x.value));
  const totalCost = values.reduce((a, b) => parseFloat(a) + parseFloat(b));
  const hideFields = show ? styles.Column : styles.Hide;

  return (
    <div className={styles.Container}>
      <button type="button" className={styles.Button} onClick={toggleContent}>
        World Data
      </button>
      {show ? (
        <div className={hideFields}>
          <h3 className={styles.Title}>World Average Expenses</h3>
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
                <td className={styles.SumValue}>{totalCost.toFixed()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default WorldDataColumn;
