import React, { useEffect, useState } from "react";
import styles from "./Keyboard.module.css";

const Keyboard = ({ isPiano, playNote, activeNumber }) => {
  const [pianoStyle, setPianoStyle] = useState({});
  useEffect(() => {
    function handlePiano() {
      isPiano ? setPianoStyle(`${styles.vis}`) : setPianoStyle(`${styles.hid}`);
    }
    handlePiano();
  }, [isPiano]);

  const handleClick = (note) => {
    playNote(note);
  };

  return (
    <div className={`${pianoStyle}`}>
      <div className={styles.keyboard}>
        <div className={styles.key} onClick={() => handleClick("1")}></div>
        <div className={styles.key} onClick={() => handleClick("2")}></div>
        <div className={styles.key} onClick={() => handleClick("3")}></div>
        <div className={styles.key} onClick={() => handleClick("4")}></div>
        <div className={styles.key} onClick={() => handleClick("5")}></div>
        <div className={styles.key} onClick={() => handleClick("6")}></div>
        <div className={styles.key}></div>
        <div className={`${styles.blackKey} ${styles.blackKey1}`}></div>
        <div className={`${styles.blackKey} ${styles.blackKey2}`}></div>
        <div className={`${styles.blackKey} ${styles.blackKey3}`}></div>
        <div className={`${styles.blackKey} ${styles.blackKey4}`}></div>
        <div className={`${styles.blackKey} ${styles.blackKey5}`}></div>
      </div>
    </div>
  );
};

export default Keyboard;
