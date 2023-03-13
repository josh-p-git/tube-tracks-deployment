import React, { useState } from "react";

import styles from "./PianoControl.module.css";

const PianoControl = ({ initialVisible, toggle }) => {
  const [visible, setVisible] = useState(initialVisible);

  return (
    <>
      <div class={styles.keyboard}>
        <div className={styles.keyboard}>
          <img
            src="/images/keyboard.png"
            alt="play some notes"
            onClick={toggle}
          ></img>
        </div>
      </div>
    </>
  );
};

export default PianoControl;
