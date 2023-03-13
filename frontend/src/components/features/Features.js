import styles from "./Features.module.css"
import React, { useState } from "react";
require('./Features.css')


function Features({backgroundAudio, onBackingChange, checkedInstruments, handleInstrumentChange}) {
  const [selectedTrack, setSelectedTrack] = useState(backgroundAudio.orchestron);
  const handleSelect = (value) => {
    onBackingChange(value);
    setSelectedTrack(value)
  };

function InstrumentButton({ label, checked, onChange, name, color }) {
  const style = {
  "background-color": checked ? color : "white"
  }
  let className = styles["toggle-button"] + " " + styles[name] + " "
  if (checked) {
    className += styles["on"]

  } else {
    className += styles["off"]
  }
  return (
    <div>
      <button style={style} className={className} onClick={() => onChange(name, !checked)}>{label} </button>
    </div>
  )
}
  
  return (
    <div>
      <div className='features-title'>Ambience</div>
    <div>
        <button
          className={selectedTrack === backgroundAudio.orchestron ? 'ambience-switch active' : 'ambience-switch'}
          id="orchestron"
          onClick={() => {
            if (selectedTrack === backgroundAudio.orchestron) {
              handleSelect(null);
            } else {
              handleSelect(backgroundAudio.orchestron);
            }
          }}
        >
          {selectedTrack === backgroundAudio.orchestron && 'Orchestron (ON)'}
          {selectedTrack !== backgroundAudio.orchestron && 'Orchestron'}
        </button>
      </div>
      <div>
        <button
          className={selectedTrack === backgroundAudio.cosmicWave ? 'ambience-switch active' : 'ambience-switch'}
          id="cosmic-waves"
          onClick={() => {
            if (selectedTrack === backgroundAudio.cosmicWave) {
              handleSelect(null);
            } else {
              handleSelect(backgroundAudio.cosmicWave);
            }
          }}
        >
          {selectedTrack === backgroundAudio.cosmicWave && 'Cosmic Waves (ON)'}
          {selectedTrack !== backgroundAudio.cosmicWave && 'Cosmic Waves'}
        </button>
      </div>


      <div className='features-title'>Instruments</div>
      <div>
        <InstrumentButton label="Piano" name="piano" checked={checkedInstruments.piano} onChange={handleInstrumentChange} color="#009fe3" />
      </div>
      <div>
        <InstrumentButton label="Strings" name="strings" checked={checkedInstruments.strings} onChange={handleInstrumentChange} color="#009fe3" />
      </div>
      <div>
        <InstrumentButton label="Marimba" name="marimba" checked={checkedInstruments.marimba} onChange={handleInstrumentChange} color="#009fe3" />
      </div>
    </div>
  );
}

export default Features;
