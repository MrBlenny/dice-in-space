import React from 'react';
import styles from './DiceSimModify.module.css';

interface IDiceSimModifyProps {
  gravity: number;
  force: number;
  angle: number;
  setGravity: (val: number) => void;
  setForce: (val: number) => void;
  setAngle: (val: number) => void;
}

export const DiceSimModify = (props: IDiceSimModifyProps) => {
  return (
    <div className={styles.outer}>
      <div className={styles.row}>
        <label className={styles.label}>Gravity</label>
        <input
          type="range"
          value={props.gravity}
          onChange={(e) => props.setGravity(Number(e.target.value))}
          step={0.1}
          max={30}
        />
        <span className={styles.value}>{props.gravity} m/s²</span>
      </div>

      <div className={styles.row}>
        <label className={styles.label}>Force</label>
        <input
          type="range"
          value={props.force}
          onChange={(e) => props.setForce(Number(e.target.value))}
          step={1}
          max={500}
        />
        <span className={styles.value}>{props.force} N</span>
      </div>

      <div className={styles.row}>
        <label className={styles.label}>Angle</label>
        <input
          type="range"
          value={props.angle}
          onChange={(e) => props.setAngle(Number(e.target.value))}
          step={1}
          max={360}
        />
        <span className={styles.value}>{props.angle}°</span>
      </div>
    </div>
  );
};
