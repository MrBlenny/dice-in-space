import React from 'react';
import styles from './DiceSelector.module.css';

interface IDiceSelectorProps {
  diceType: string;
  setDiceType: (diceType: string) => void;
}

const dice = [`6`, `8`, `10`, `12`, `20`];

export const DiceSelector = ({ diceType, setDiceType }: IDiceSelectorProps) => {
  return (
    <div className={styles.diceSelector}>
      {dice.map((item) => (
        <div
          className={styles.dice}
          key={item}
          style={diceType === item ? { background: `blue` } : {}}
          onClick={() => setDiceType(item)}
        >
          D{item}
        </div>
      ))}
    </div>
  );
};
