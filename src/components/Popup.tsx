import React, { useState } from 'react';
// import { useTimeoutFn } from 'react-use';
import styles from './Popup.module.css';

export const Popup = () => {
  const [show, setShow] = useState(false);
  // useTimeoutFn(() => {
  //   setShow(true);
  // }, 3500);
  if (!show) {
    return null;
  }
  return (
    <div className={styles.outer}>
      <div className={styles.popup}>
        <h3>little d,</h3>
        <p>
          we know you love playing d&d (although maybe not with punks like us)
          and we know you love gravity. we hope you like this combination of the
          two, lovingly made for you.
          <button className={styles.button} onClick={() => setShow(false)}>
            yeah yeah, let me play with some planets
          </button>
        </p>
      </div>
    </div>
  );
};
