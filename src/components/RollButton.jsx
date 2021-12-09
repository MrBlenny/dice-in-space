import React from 'react';
import styles from './RollButton.module.css';

export const RollButton = ({ onClick }) => {
  return (
    <div className={styles.outer}>
      <div className={styles.back} />
      <button className={styles.button} onClick={onClick}>
        launch
      </button>
    </div>
  );
};
