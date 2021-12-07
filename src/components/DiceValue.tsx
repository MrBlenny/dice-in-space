import React from 'react';
import styles from './DiceValue.module.css';

interface IDiceValueProps {
  value?: number;
}

const phrases = {
  0: [`bero`],
  1: [`bum`],
  2: [`poo`],
  3: [`wee`],
  4: [`floor`],
  5: [`hive`],
  6: [`sticks`],
  7: [`heaven`],
  8: [`mate`],
  9: [`time`],
  10: [`den`],
  11: [`meben`],
  12: [`melve`],
  13: [`hurteen`],
  14: [`burteen`],
  15: [`bifteen`],
  16: [`bixteen`],
  17: [`bum`],
  18: [`bum`],
  19: [`bum`],
  20: [`bum`],
} as any;

export const DiceValue = ({ value }: IDiceValueProps) => {
  const phrase = value != undefined && phrases[value][0];
  return value != undefined && phrase ? (
    <div className={styles.value}>
      <div>{value}</div>
      <div>{phrase}</div>
    </div>
  ) : null;
};
