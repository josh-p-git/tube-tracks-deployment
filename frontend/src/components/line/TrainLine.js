import "./TrainLine.css";
import React, { useEffect, useState } from "react";
import Keyboard from "../app/keyboard/Keyboard";

const Tone = require("tone");

function TrainLine({
  lineData,
  checkedLines,
  checkedInstruments,
  isPiano,
  zoom,
}) {
  const stations = {
    victoria: [
      "Brixton Underground Station",
      "Stockwell Underground Station",
      "Vauxhall Underground Station",
      "Pimlico Underground Station",
      "Victoria Underground Station",
      "Green Park Underground Station",
      "Oxford Circus Underground Station",
      "Warren Street Underground Station",
      "Euston Underground Station",
      "King's Cross Underground Station",
      "Highbury Underground Station",
      "Finsbury Park Underground Station",
      "Seven Sisters Underground Station",
      "Tottenham Hale Underground Station",
      "Blackhorse Road Underground Station",
      "Walthamstow Central Underground Station",
    ],
    jubilee: [
      "Stanmore Underground Station",
      "Canons Park Underground Station",
      "Queensbury Underground Station Underground Station",
      "Kingsbury Underground Station Underground Station",
      "Wembley Park Underground Station",
      "Neasden Underground Station",
      "Dollis Hill Underground Station",
      "Willesden Green Underground Station",
      "Kilburn Underground Station",
      "West Hampstead Underground Station",
      "Finchley Road Underground Station",
      "Swiss Cottage Underground Station",
      "St. Johns Wood Underground Station",
      "Baker Street Underground Station",
      "Bond Street Underground Station",
      "Green Park Underground Station",
      "Westminster Underground Station",
      "Waterloo Underground Station",
      "Southwark Underground Station",
      "London Bridge Underground Station",
      "Bermondsey Underground Station",
      "Canada Water Underground Station",
      "Canary Wharf Underground Station",
      "North Greenwich Underground Station",
      "Canning Town Underground Station",
      "West Ham Underground Station",
      "Stratford Underground Station",
    ],
    central: [
      "Ealing Underground Station",
      "West Acton Underground Station",
      "North Acton Underground Station",
      "East Acton Underground Station",
      "White City Underground Station",
      "Shepherd's Bush Underground Station",
      "Holland Park Underground Station",
      "Notting Hill Underground Station",
      "Queensway Underground Station",
      "Lancaster Gate Underground Station",
      "Marble Arch Underground Station",
      "Bond Street Underground Station",
      "Oxford Circus Underground Station",
      "Tottenham Court Underground Station",
      "Holborn Underground Station",
      "Chancery Underground Station",
      "St. Paul's Underground Station",
      "Bank Underground Station",
      "Liverpool Street Underground Station",
      "Bethnal Green Underground Station",
      "Mile End Underground Station",
      "Stratford Underground Station",
      "Leyton Underground Station",
      "LeytonStone Underground Station",
      "Snaresbrook Underground Station",
      "South Woodford Underground Station",
      "Woodford Underground Station",
      "Buckhurst Hill Underground Station",
      "Loughton Underground Station",
      "Debden Underground Station",
      "Theydon Underground Station",
      "Epping Underground Station",
    ],
    metropolitan: [
      "Amersham Underground Station",
      "Chalfont Underground Station",
      "Chorleywood Underground Station",
      "Rickmansworth Underground Station",
      "Moor Park Underground Station",
      "Northwood Underground Station",
      "Northwood Hills Underground Station",
      "Pinner Underground Station",
      "North Harrow Underground Station",
      "Harrow-on-the-Hill Underground Station",
      "Northwick Park Underground Station",
      "Preston Road Underground Station",
      "Wembley Park Underground Station",
      "Willesden Green Underground Station",
      "Finchley Road Underground Station",
      "Baker Street Underground Station",
      "Great Portland Street Underground Station",
      "Euston Square Underground Station",
      "King's Cross Underground Station",
      "Farringdon Underground Station",
      "Barbican Underground Station",
      "Moorgate Underground Station",
      "Liverpool Street Underground Station",
      "Aldgate Underground Station",
    ],
    northern: [
      "High Barnet Underground Station",
      "Totteridge & Whetstone Underground Station",
      "Woodside Park Underground Station",
      "West Finchley Underground Station",
      "Finchley Central Underground Station",
      "East Finchley Underground Station",
      "Highgate Underground Station",
      "Archway Underground Station",
      "Tufnell Park Underground Station",
      "Kentish Town Underground Station",
      "Camden Town Underground Station",
      "Mornington Crescent Underground Station",
      "Euston Underground Station",
      "King's Cross St Pancras Underground Station",
      "Angel Underground Station",
      "Old Street Underground Station",
      "Moorgate Underground Station",
      "Bank Underground Station",
      "London Bridge Underground Station",
      "Borough Underground Station",
      "Elephant & Castle Underground Station",
      "Kennington Underground Station",
      "Oval Underground Station",
      "Stockwell Underground Station",
      "Clapham North Underground Station",
      "Clapham Common Underground Station",
      "Clapham South Underground Station",
      "Balham Underground Station",
      "Tooting Bec Underground Station",
      "Tooting Broadway Underground Station",
      "Colliers Wood Underground Station",
      "South Wimbledon Underground Station",
      "Morden Underground Station",
      "Mill Hill East Underground Station",
      "Edgeware Underground Station",
      "Burnt Oak Underground Station",
      "Colindale Underground Station",
      "Hendon Central Underground Station",
      "Brent Cross Underground Station",
      "Golders Green Underground Station",
      "Hampstead Underground Station",
      "Belsize Park Underground Station",
      "Chalk Farm Underground Station",
      "Warren Street Underground Station",
      "Goodge Street Underground Station",
      "Tottenham Court Road Underground Station",
      "Leicester Square Underground Station",
      "Charing Cross Underground Station",
      "Embankment Underground Station",
      "Waterloo Underground Station",
    ],
    bakerloo: [
      "Harrow & Wealdstone Underground Station",
      "Kenton Underground Station",
      "South Kenton Underground Station",
      "North Wembley Underground Station",
      "Wembley Central Underground Station",
      "Stonebridge Park Underground Station",
      "Harlesden Underground Station",
      "Willesden Junction Underground Station",
      "Kensal Green Underground Station",
      "Queen's Park Underground Station",
      "Kilburn Park Underground Station",
      "Warwick Avenue Underground Station",
      "Paddington Underground Station",
      "Edgware Road Underground Station",
      "Marylebone Underground Station",
      "Baker Street Underground Station",
      "Regent's Park Underground Station",
      "Oxford Circus Underground Station",
      "Piccadilly Circus Underground Station",
      "Charing Cross Underground Station",
      "Embankment Underground Station",
      "Waterloo Underground Station",
      "Lambeth North Underground Station",
      "Elephant & Castle Underground Station",
    ],
    piccadilly: [
      "Uxbridge Underground Station",
      "Hillingdon Underground Station",
      "Ickenham Underground Station",
      "Ruislip Underground Station",
      "Ruislip Manor Underground Station",
      "Eastcote Underground Station",
      "Rayners Lane Underground Station",
      "South Harrow Underground Station",
      "Sudbury Hill Underground Station",
      "Sudbury Town Underground Station",
      "Alperton Underground Station",
      "Park Royal Underground Station",
      "North Ealing Underground Station",
      "Ealing Common Underground Station",
      "Heathrow Underground Station",
      "Hatton Cross Underground Station",
      "Hounslow West Underground Station",
      "Hounslow Central Underground Station",
      "Hounslow East Underground Station",
      "Osterley Underground Station",
      "Boston Manor Underground Station",
      "Southfields Underground Station",
      "South Ealing Underground Station",
      "Acton Town Underground Station",
      "Turnham Green Underground Station",
      "Hammersmith Underground Station",
      "Barons Court Underground Station",
      "Earl's Court Underground Station",
      "Gloucester Road Underground Station",
      "South Kensington Underground Station",
      "Knightsbridge Underground Station",
      "Hyde Park Corner Underground Station",
      "Green Park Underground Station",
      "Piccadilly Circus Underground Station",
      "Leicester Square Underground Station",
      "Covent Garden Underground Station",
      "Holborn Underground Station",
      "Russell Square Underground Station",
      "King's Cross St Pancras Underground Station",
      "Caledonian Road Underground Station",
      "Holloway Road Underground Station",
      "Arsenal Underground Station",
      "Finsbury Park Underground Station",
      "Manor House Underground Station",
      "Turnpike Lane Underground Station",
      "Wood Green Underground Station",
      "Bounds Green Underground Station",
      "Arnos Grove Underground Station",
      "Southgate Underground Station",
      "Oakwood Underground Station",
      "Cockfosters Underground Station",
    ],
    district: [
      "Ealing Broadway Underground Station",
      "Ealing Common Underground Station",
      "Acton Town Underground Station",
      "Chiswick Park Underground Station",
      "Turnham Green Underground Station",
      "Stamford Brook Underground Station",
      "Ravenscourt Park Underground Station",
      "Hammersmith Underground Station",
      "Barons Court Underground Station",
      "West Kensington Underground Station",
      "Earl's Court Underground Station",
      "Gloucester Road Underground Station",
      "South Kensington Underground Station",
      "Sloane Square Underground Station",
      "Victora Underground Station",
      "St James's Park Underground Station",
      "Westminster Underground Station",
      "Embankment Underground Station",
      "Temple Underground Station",
      "Blackfriars Underground Station",
      "Mansion House Underground Station",
      "Cannon Street Underground Station",
      "Monument Underground Station",
      "Tower Hill Underground Station",
      "Aldgate East Underground Station",
      "Whitechapel Underground Station",
      "Stepney Green Underground Station",
      "Mile End Underground Station",
      "Bow Road Underground Station",
      "Bromley-by-Bow Underground Station",
      "West Ham Underground Station",
      "Plaistow Underground Station",
      "Upton Park Underground Station",
      "East Ham Underground Station",
      "Barking Underground Station",
      "Upney Underground Station",
      "Becontree Underground Station",
      "Dagenham Heathway Underground Station",
      "Dagenham East Underground Station",
      "Elm Park Underground Station",
      "Hornchurch Underground Station",
      "Upminster Bridge Underground Station",
      "Upminster Underground Station",
      "Richmond Underground Station",
      "Kew Gardens Underground Station",
      "Gunnersbury Underground Station",
      "Wimbledon Underground Station",
      "Wimbledon Park Underground Station",
      "Southfields Underground Station",
      "East Putney Underground Station",
      "Putney Bridge Underground Station",
      "Parsons Green Underground Station",
      "Fulham Broadway Underground Station",
      "West Brompton Underground Station",
    ],
    hammersmith: [
      "Hammersmith Underground Station",
      "Goldhawk Road Underground Station",
      "Shepherd's Bush Market Underground Station",
      "Wood Lane Underground Station",
      "Latimer Road Underground Station",
      "Ladbroke Grove Underground Station",
      "Westbourne Park Underground Station",
      "Royal Oak Underground Station",
      "Paddington Underground Station",
      "Edgware Road Underground Station",
      "Baker Street Underground Station",
      "Great Portland Street Underground Station",
      "Euston Square Underground Station",
      "King's Cross StPancras Underground Station",
      "Farringdon Underground Station",
      "Barbican Underground Station",
      "Moorgate Underground Station",
      "Liverpool Street Underground Station",
      "Aldgate East Underground Station",
      "Whitechapel  Underground Station",
      "Stepney Green Underground Station",
      "Mile End Underground Station",
      "Bow Road Underground Station",
      "Bromley-by-Bow Underground Station",
      "West Ham Underground Station",
      "Plaistow Underground Station",
      "Upton Park Underground Station",
      "East Ham Underground Station",
      "Barking Underground Station",
    ],
    circle: [
      "Paddington Underground Station",
      "Edgware Road Underground Station",
      "Baker Street Underground Station",
      "Great Portland Street Underground Station",
      "Euston Square Underground Station",
      "King's Cross StPancras Underground Station",
      "Farringdon Underground Station",
      "Barbican Underground Station",
      "Moorgate Underground Station",
      "Liverpool Street Underground Station",
      "Aldgate Underground Station",
      "Tower Hill Underground Station",
      "Monument Underground Station",
      "Cannon Street Underground Station",
      "Mansion House Underground Station",
      "Blackfriars Underground Station",
      "Temple Underground Station",
      "Embankment Underground Station",
      "Westminster Underground Station",
      "St James's Park Underground Station",
      "Victoria Underground Station",
      "Sloane Square Underground Station",
      "South Kensington Underground Station",
      "Gloucester Road Underground Station",
      "High Street Kensington Underground Station",
      "Notting Hill Gate Underground Station",
      "Bayswater Underground Station",
    ],
  };

  const notes = {
    piano: {
      CS3Piano:
        "https://res.cloudinary.com/did9lgedz/video/upload/v1678117938/tube-tracks/C_3_1_z6dqvg.wav",
      DS3Piano:
        "https://res.cloudinary.com/did9lgedz/video/upload/v1678117938/tube-tracks/D_3_1_aghaaz.wav",
      FS3Piano:
        "https://res.cloudinary.com/did9lgedz/video/upload/v1678117939/tube-tracks/F_3_1_xienr0.wav",
      GS3Piano:
        "https://res.cloudinary.com/did9lgedz/video/upload/v1678117939/tube-tracks/G_3_1_atwwuv.wav",
      AS3Piano:
        "https://res.cloudinary.com/did9lgedz/video/upload/v1678117938/tube-tracks/A_3_1_o0knhr.wav",
    },
    strings: {
      CS2Pizz:
        "https://res.cloudinary.com/did9lgedz/video/upload/v1678384968/tube-tracks/improved%20pizz/CS2_-_Pizz_1_fgtvx6.wav",
      DS2Pizz:
        "https://res.cloudinary.com/did9lgedz/video/upload/v1678384967/tube-tracks/improved%20pizz/DS2_-_Pizz_1_icmwmk.wav",
      FS2Pizz:
        "https://res.cloudinary.com/did9lgedz/video/upload/v1678384967/tube-tracks/improved%20pizz/FS2_-_Pizz_1_msynye.wav",
      GS2Pizz:
        "https://res.cloudinary.com/did9lgedz/video/upload/v1678384967/tube-tracks/improved%20pizz/GS2_-_Pizz_1_uzw6fq.wav",
      AS2Pizz:
        "https://res.cloudinary.com/did9lgedz/video/upload/v1678384966/tube-tracks/improved%20pizz/AS2_-_Pizz_1_ksvht7.wav",
    },
    marimba: {
      FSCSChMarimba:
        "https://res.cloudinary.com/did9lgedz/video/upload/v1678387812/tube-tracks/improved%20marimba/FSCSChMarimba1_1_omqkp1.wav",
      GSDSChMarimba:
        "https://res.cloudinary.com/did9lgedz/video/upload/v1678387812/tube-tracks/improved%20marimba/GSDSChMarimba1_1_lnbbwi.wav",
      DSCSClusterMarimba:
        "https://res.cloudinary.com/did9lgedz/video/upload/v1678387812/tube-tracks/improved%20marimba/DSCShMarimba1_1_timwwe.wav",
    },
  };

  const bass = {
    EBass:
      "https://res.cloudinary.com/did9lgedz/video/upload/v1678189276/tube-tracks/Bass%20Samples/E_Bass_bip_1_qzgqbn.wav",
    DSBass:
      "https://res.cloudinary.com/did9lgedz/video/upload/v1678189276/tube-tracks/Bass%20Samples/ES_Bass_bip_1_qj6wgi.wav",
    FSBass:
      "https://res.cloudinary.com/did9lgedz/video/upload/v1678189276/tube-tracks/Bass%20Samples/FS_Bass_bip_1_j6rwcm.wav",
    GSBass:
      "https://res.cloudinary.com/did9lgedz/video/upload/v1678189276/tube-tracks/Bass%20Samples/GS_Bass_bip_1_zam6i0.wav",
    ASBass:
      "https://res.cloudinary.com/did9lgedz/video/upload/v1678190334/tube-tracks/Bass%20Samples/AS_Bass_bip_1_etl9hi.wav",
    BBass:
      "https://res.cloudinary.com/did9lgedz/video/upload/v1678189276/tube-tracks/Bass%20Samples/B_Bass_bip_1_si5hac.wav",
    CSBass:
      "https://res.cloudinary.com/did9lgedz/video/upload/v1678189276/tube-tracks/Bass%20Samples/C_Bass_bip_1_dhhlfd.wav",
  };

  const playBassNote = (note) => {
  const bassPlayer = new Tone.Player(bass[note]).toDestination();
   bassPlayer.autostart = true;
   bassPlayer.loop = false;
   bassPlayer.volume.value = -20;
  };

  const handlePlayKey = (key) => {
    switch (key) {
      case "1":
        playBassNote("DSBass");
        break;
      case "2":
        playBassNote("FSBass");
        break;
      case "3":
        playBassNote("GSBass");
        break;
      case "4":
        playBassNote("ASBass");
        break;
      case "5":
        playBassNote("BBass");
        break;
      case "6":
        playBassNote("CSBass");
        break;
      default:
        break;
    }
  };

  document.addEventListener("keypress", (event) => {
    handlePlayKey(event.key);
  });

  // this is handling picking random notes and also checking to see if instruments have been
  // switched on or not
  function pickRandomKey(obj, checkedInstruments) {
    const categories = Object.keys(obj);
    const availableCategories = categories.filter(
      (category) => checkedInstruments[category]
    );
    const randomCategory =
      availableCategories[
        Math.floor(Math.random() * availableCategories.length)
      ];
    const notesInCategory = obj[randomCategory];
    const notes = Object.keys(notesInCategory);
    const randomNote = notes[Math.floor(Math.random() * notes.length)];
    return notesInCategory[randomNote];
  }

  useEffect(() => {
    const checkExpectedArrival = () => {
      console.log("CHECK FOR TIME MATCH");
      if (lineData) {
        const now = new Date();
        const matchingTrains = [];
        lineData.forEach((train) => {
          const [hours, minutes, seconds] = train.expectedArrival.split(":");
          const expectedArrival = new Date();
          expectedArrival.setHours(hours);
          expectedArrival.setMinutes(minutes);
          expectedArrival.setSeconds(seconds);
          if (expectedArrival.getTime() === now.getTime()) {
            if (checkedLines[train.lineName.toLowerCase()]) {
              console.log(train);
              matchingTrains.push(train);
            } else {
              return null;
            }
            const stationName = train.stationName;
            console.log(stationName);
            const stationEl = document.querySelectorAll(
              `[id^="${stationName}"]`
            );
            console.log(stationEl);
            stationEl.forEach((el) => {
              el.classList.add("pulse");
              setTimeout(() => {
                el.classList.remove("pulse");
              }, 3000);
            });
          }
        });

        matchingTrains.forEach((train, index) => {
          const randomKey = pickRandomKey(notes, checkedInstruments);
          const delay = Math.random() * 1000;
          setTimeout(() => {
            const arrivalPlayer = new Tone.Player(randomKey).toDestination();
            arrivalPlayer.autostart = true;
            arrivalPlayer.volume.value = -8;
          }, index * 500 + delay); // delay each sound by 1 second
        });
      }
    };

    const intervalId = setInterval(() => {
      checkExpectedArrival();
    }, 500);

    return () => clearInterval(intervalId);
  });

  return (
    <div className="train-line" style={{ zoom: zoom }}>
      {Object.keys(stations).map(
        (line) =>
          checkedLines[line] && (
            <div key={line} className={`line ${line}`}>
              <svg viewBox="-1230 0 24400 150">
                <line
                  x1="9000"
                  y1="50"
                  x2="23000"
                  y2="50"
                  className="line-color"
                />
                {stations[line].map((station, index) => (
                  <g key={station}>
                    <circle
                      id={station}
                      className={"station"}
                      cx={
                        ((index + 0.2) / stations[line].length) * 13000 + 9800
                      }
                      cy="50"
                      r="20"
                    />
                    <text
                      className="station-name"
                      x={((index + 0.1) / stations[line].length) * 13000 + 9800}
                      y="90"
                      textAnchor="middle"
                    >
                      {station && (
                        <>
                          {station
                            .split(" ")
                            .filter(
                              (word) =>
                                word !== "Underground" && word !== "Station"
                            )
                            .map((word, i) => (
                              <tspan
                                key={i}
                                x={
                                  ((index + 0.2) / stations[line].length) *
                                    13000 +
                                  9800
                                }
                                dy={`${i === 0 ? 0.5 : 1}em`}
                              >
                                {word}
                              </tspan>
                            ))}
                        </>
                      )}
                    </text>
                  </g>
                ))}
              </svg>

              <div class="line-container">
                <h2 class="line-name">{line}</h2>
                <h2 class="line-name">{line}</h2>
                <h2 class="line-name">{line}</h2>
              </div>
            </div>
          )
      )}
      <Keyboard isPiano={isPiano} playNote={handlePlayKey}></Keyboard>
    </div>
  );
}

export default TrainLine;
