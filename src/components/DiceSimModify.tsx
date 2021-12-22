import React from 'react';
import styles from './DiceSimModify.module.css';
import Slider from 'rc-slider';

interface IDiceSimModifyProps {
  gravity: number;
  force: number;
  angle: number;
  edit: boolean;
  setGravity: (val: number) => void;
  setForce: (val: number) => void;
  setAngle: (val: number) => void;
  setEdit: (val: boolean) => void;
}

export const DiceSimModify = (props: IDiceSimModifyProps) => {
  return (
    <div className={styles.outer}>
      <div className={styles.items}>
        <div className={styles.item}>
          <label
            className={`${styles.label} ${!props.edit && styles.disabled}`}
          >
            Gravity
          </label>
          <span className={`${styles.value} ${!props.edit && styles.disabled}`}>
            {props.gravity} m/s²
          </span>
          <Slider
            disabled={!props.edit}
            value={props.gravity}
            onChange={props.setGravity}
            step={0.1}
            max={30}
          />
        </div>

        <div className={styles.item}>
          <label
            className={`${styles.label} ${!props.edit && styles.disabled}`}
          >
            Force
          </label>
          <span className={`${styles.value} ${!props.edit && styles.disabled}`}>
            {props.edit ? `${props.force}N` : `random`}
          </span>
          <Slider
            disabled={!props.edit}
            value={props.force}
            onChange={props.setForce}
            step={1}
            max={500}
          />
        </div>

        <div className={styles.item}>
          <label
            className={`${styles.label} ${!props.edit && styles.disabled}`}
          >
            Angle
          </label>
          <span className={`${styles.value} ${!props.edit && styles.disabled}`}>
            {props.edit ? `${props.angle}°` : `random`}
          </span>
          <Slider
            disabled={!props.edit}
            value={props.angle}
            onChange={props.setAngle}
            step={1}
            max={360}
          />
        </div>
      </div>
      <div
        className={styles.buttonRow}
        onClick={() => props.setEdit(!props.edit)}
      >
        <button>{props.edit ? `RESET` : `EDIT`}</button>
      </div>
    </div>
  );
};
