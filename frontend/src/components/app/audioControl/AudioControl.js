import React from "react";

import styles from "./AudioControl.module.css";

const PlayStop = ({ stop, start, initialVisible, toggle }) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.playnpause}>
          <img src="/images/play.png" alt="play button" onClick={start}></img>
        </div>
        <div className={styles.playnpause}>
          <img src="/images/stop.png" alt="pause button" onClick={stop}></img>
        </div>
        <div className={styles.instruct}>Press play, and have fun!</div>
        <div class={styles.volume}>
          {" "}
          <div className={styles.keyboard}>
            <img
              src="/images/image.png"
              alt="play button"
              onClick={toggle}
            ></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayStop;
