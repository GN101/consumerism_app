import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import styles from './PortalInputColumn.module.css';
import AlternateThemeContext from '../../Context/AlternateTheme-context';

const PortalInputColumn = ({ onClose, children }) => {
  const { theme } = useContext(AlternateThemeContext);

  return ReactDOM.createPortal(
    <div className={styles.Overlay}>
      <div className={styles.Container}>
        <div className={theme ? styles.Form : styles.Form_dark}>
          {children}
          <hr />
          <button onClick={onClose}>close</button>
        </div>
      </div>
    </div>,
    document.getElementById('portal-root')
  );
};

export default PortalInputColumn;
