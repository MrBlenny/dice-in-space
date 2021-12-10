import React from 'react';
import styles from './DiceValue.module.css';

interface IDiceValueProps {
  value?: number;
}

export const DiceValue = ({ value }: IDiceValueProps) => {
  if (value === undefined) {
    return null;
  }
  return (
    <div className={styles.value}>
      <div className={styles.hexagon}>
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="485.688px"
          height="485.688px"
          viewBox="0 0 485.688 485.688"
        >
          <g>
            <path
              d="M364.269,453.155H121.416L0,242.844L121.416,32.533h242.853l121.419,210.312L364.269,453.155z M131.905,434.997h221.878
			l110.939-192.152L353.783,50.691H131.905L20.966,242.844L131.905,434.997z"
            />
          </g>
        </svg>
      </div>
      <div>{value}</div>
    </div>
  );
};
