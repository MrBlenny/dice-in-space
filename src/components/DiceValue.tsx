import React from 'react';
import styles from './DiceValue.module.css';

interface IDiceValueProps {
  value?: number;
}

export const DiceValue = ({ value }: IDiceValueProps) => {
  return value != undefined ? (
    <div className={styles.value}>
      <div>{value}</div>
    </div>
  ) : null;
};
