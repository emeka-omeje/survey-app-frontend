import React from 'react';
import styles from './spinIcon.module.css'; // Import CSS file for styling

const SpinIcon: React.FC = () => {
  return (
    <div data-testid="spinner-item" className={styles.spinner_container}>
      <div className={styles.spinner2}></div>
    </div>
  );
}

export default SpinIcon;