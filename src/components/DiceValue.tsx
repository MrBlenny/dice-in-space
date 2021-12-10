import React from 'react';
import styles from './DiceValue.module.css';

interface IDiceValueProps {
  value?: number;
  diceType: string;
}

export const DiceValue = ({ value, diceType }: IDiceValueProps) => {
  return (
    <div className={styles.value}>
      <img className={styles.type} src={`/dice/${diceType}.png`} />
      <div>{value === undefined ? `d${diceType}` : value}</div>
    </div>
  );
};
