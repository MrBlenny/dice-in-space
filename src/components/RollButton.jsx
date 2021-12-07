import React from 'react';
import styles from './RollButton.module.css';

export const RollButton = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      Launch
    </button>
  );
};
