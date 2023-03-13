import React, { useState, useEffect } from "react";
import styles from "./Homepage.module.css";
import TrainLine from "../line/TrainLine";
import TrackList from "../trackList/TrackList";
import AudioControl from "../app/audioControl/AudioControl";
import Features from "../features/Features";
const Tone = require("tone");

const Homepage = ({ lineData, handleIsRunningChange }) => {
  const [zoom, setZoom] = useState(1.1);

  const backgroundAudio = {
    orchestron:
      "https://res.cloudinary.com/did9lgedz/video/upload/v1678200859/tube-tracks/Backing_Track_1_von8kt.wav",
    cosmicWave:
      "https://res.cloudinary.com/did9lgedz/video/upload/v1678202659/tube-tracks/Backing_Track_2_l2ibki.wav",
  };
  const [backingTrack, setBackingTrack] = useState();

  const [player, setPlayer] = useState(null);

  const [isRunning, setIsRunning] = useState(false);

  const [isPiano, setIsPiano] = useState(false);
  const [note, setNote] = useState(null);

  const handlePiano = () => {
    setIsPiano(!isPiano);
  };
  const handlePlayNote = (note) => {
    setNote(note);
  };

  const handleZoomIn = () => {
    setZoom(zoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoom(zoom - 0.1);
  };

  useEffect(() => {
    if (player) {
      player.stop();
      player.dispose();
    }

    const newPlayer = new Tone.Player(backingTrack).toDestination();
    newPlayer.loop = true;
    newPlayer.autostart = true;
    newPlayer.volume.value = -20;

    setPlayer(newPlayer);

    return () => {
      newPlayer.stop();
      newPlayer.dispose();
    };
  }, [backingTrack]);

  const [checkedLines, setCheckedLines] = useState({
    victoria: true,
    jubilee: true,
    central: true,
    metropolitan: true,
    northern: true,
    bakerloo: true,
    piccadilly: true,
    district: true,
    hammersmith: true,
    circle: true,
  });

  const [checkedInstruments, setCheckedInstruments] = useState({
    piano: true,
    strings: true,
    marimba: true,
  });

  const handleStop = () => {
    setIsRunning(false);
    handleIsRunningChange(false);
    setBackingTrack(null);
  };

  const handleStart = () => {
    setIsRunning(true);
    handleIsRunningChange(true);
    setBackingTrack(backgroundAudio.orchestron);
  };

  const handleCheckboxChange = (line, isChecked) => {
    setCheckedLines({ ...checkedLines, [line]: isChecked });
  };

  const handleBackingChange = (value) => {
    setBackingTrack(value);
  };

  const handleInstrumentChange = (instrument, isChecked) => {
    setCheckedInstruments({ ...checkedInstruments, [instrument]: isChecked });
  };
  console.log(checkedInstruments);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <a href="/">
            <img src="/images/logo.webp" alt="logo"></img>
          </a>
        </div>
        <div className={styles.strapline}>
          Tube Tracks <span>TfL Arrival Data Sonification</span>
        </div>

        <div className={styles.instructions}>
          <AudioControl
            stop={handleStop}
            start={handleStart}
            initialVisible={isPiano}
            toggle={handlePiano}
            playNote={handlePlayNote}
          />
        </div>
      </div>
      <div className={styles.zoomButtons}>
        <div onClick={handleZoomIn}>
          <img src="/images/zoomin.png" alt="zoom in"></img>
        </div>
        <div onClick={handleZoomOut}>
          <img src="/images/zoomout.png" alt="zoom out"></img>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.tracksNfeatures}>
          <div className={styles.tracks}>
            <h1>Track List</h1>
            <TrackList
              handleCheckboxChange={handleCheckboxChange}
              checkedLines={checkedLines}
            />
          </div>
          <div className={styles.features}>
            <h1>Features</h1>
            <Features
              backgroundAudio={backgroundAudio}
              onBackingChange={handleBackingChange}
              checkedInstruments={checkedInstruments}
              handleInstrumentChange={handleInstrumentChange}
            />
          </div>
        </div>

        {isRunning ? (
          <div className={styles.theMap}>
            <TrainLine
              checkedLines={checkedLines}
              lineData={lineData}
              checkedInstruments={checkedInstruments}
              isPiano={isPiano}
              zoom={zoom}
            />
          </div>
        ) : (
          <div className={styles.jumbo}>
            <h2>
              Welcome to Tube Tracks, the TfL Tube Arrival Data Sonification
              App!
            </h2>
            <div className={styles.description}>
              <h3>
                Maker's Academy Final Project by a group of 4 students - Alex,
                Terry, Josh and Abbas
              </h3>
              <p>
                This app comes up with the answer for a question you didn't
                realise you had!
              </p>
              <p>
                Forget about what the meaning of life is, how about 'What would{" "}
                <b>live</b> London Tube arrival data sound like?'.
              </p>
              <p>
                Well look no further, when you press play you will be greeted by
                an Orchestron and the luscious tones of sampled instruments
                being triggered by <b>live</b> Tfl Tube Arrival Data.
              </p>
              <p>
                Have a play around, turn instruments on and off, turn lines on
                and off, and also why not try our interactive keyboard on the top right
                to add a bit of upright bass!
              </p>
              <p>
                Bored of the Orchestron? Try Cosmic Wave, an alternative but
                suspiciously similar drone to accompany the Tfl madness.
              </p>
              <p>
                Disclaimer: your auditory experience is entirely down to
                TfL....a member of the infamous British transport system. You
                have been warned!
              </p>
              <p>Enjoy,</p>
              <p>
                <b>Auditory Analytics</b>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Homepage;
