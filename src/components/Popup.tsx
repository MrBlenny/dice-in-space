import React from 'react';
import { useAudio, useKey } from 'react-use';
import styles from './Popup.module.css';

export const Popup = ({ onClose }: { onClose: () => void }) => {
  useKey(`Escape`, () => {
    onClose();
  });

  const [audio] = useAudio({
    src: `/audio/merry.m4a`,
    autoPlay: true,
  });

  return (
    <div className={styles.outer}>
      {audio}
      <div
        className={styles.popup}
        onClick={() => onClose()}
        style={{ cursor: `pointer` }}
      >
        <h3>JINGLE BELLS</h3>
        <h3>DANIEL SMELLS</h3>
      </div>
    </div>
  );
};
