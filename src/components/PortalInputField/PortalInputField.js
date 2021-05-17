import React from 'react';
import ReactDOM from 'react-dom';
import styles from './PortalInputField.module.css';

const PortalInputField = () => {
  return ReactDOM.createPortal(
    <h1 className={styles.Container}>Portal demo</h1>,
    document.getElementById('portal-root')
  );
};

export default PortalInputField;
