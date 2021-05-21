import React from 'react';
import ReactDOM from 'react-dom';
import styles from './PortalInputColumn.module.css';

const PortalInputColumn = ({ onClose, children }) => {
  return ReactDOM.createPortal(
    <div className={styles.Container}>
      <div className={styles.Form}>
        {children}
        <hr />
        <button onClick={onClose}>close</button>
      </div>
    </div>,
    document.getElementById('portal-root')
  );
};

export default PortalInputColumn;
