import React from 'react';
import styles from './DiceSelector.module.css';

interface IDiceSelectorProps {
  diceType: string;
  setDiceType: (diceType: string) => void;
  planet: string;
  setPlanet: (diceType: string) => void;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const dice = [`6`, `8`, `10`, `12`, `20`];
export const planets = [
  `jupiter`,
  `mars`,
  `mercury`,
  `moon`,
  `neptune`,
  `saturn`,
];

export const DiceSelector = ({
  diceType,
  setDiceType,
  planet,
  setPlanet,
}: IDiceSelectorProps) => {
  return (
    <div className={styles.diceSelector}>
      I want to launch a
      <select
        className={styles.select}
        value={diceType}
        onChange={(e) => setDiceType(e.target.value)}
      >
        {dice.map((die) => (
          <option className={styles.option} value={die} key={die}>
            D{die}
          </option>
        ))}
      </select>
      {` `}
      on{` `}
      <select
        className={styles.select}
        value={planet}
        onChange={(e) => setPlanet(e.target.value)}
      >
        {planets.map((planet) => (
          <option className={styles.option} value={planet} key={planet}>
            {capitalize(planet)}
          </option>
        ))}
      </select>
    </div>
  );
};
