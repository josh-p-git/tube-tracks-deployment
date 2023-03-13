import styles from "./TrackList.module.css";
console.log(styles)
function TrackButton({ label, checked, onChange, name, color }) {
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


function TrackList({ handleCheckboxChange, checkedLines }) {
  return (
    <div>
      <TrackButton label="Victoria" name="victoria" checked={checkedLines.victoria} onChange={handleCheckboxChange} color="#009fe3" />

      <div>
        <TrackButton label="Jubilee" name="jubilee" checked={checkedLines.jubilee} onChange={handleCheckboxChange} color="#6a7278" />
      </div>

      <div>
        <TrackButton label="Central" name="central" checked={checkedLines.central} onChange={handleCheckboxChange} color="#dc241f" />
      </div>

      <div>
        <TrackButton label="Metropolitan" name="metropolitan" checked={checkedLines.metropolitan} onChange={handleCheckboxChange} color="#751056" />
      </div>

      <div>
        <TrackButton label="Northern" name="northern" checked={checkedLines.northern} onChange={handleCheckboxChange} color="#000" />
      </div>

      <div>
        <TrackButton label="Bakerloo" name="bakerloo" checked={checkedLines.bakerloo} onChange={handleCheckboxChange} color="#b26300" />
      </div>

      <div>
        <TrackButton label="Piccadilly" name="piccadilly" checked={checkedLines.piccadilly} onChange={handleCheckboxChange} color="#0019a8" />
      </div>

      <div>
        <TrackButton label="District" name="district" checked={checkedLines.district} onChange={handleCheckboxChange} color="#007229" />
      </div>

      <div>
        <TrackButton label="Hammersmith & City" name="hammmersmith" checked={checkedLines.hammersmith} onChange={handleCheckboxChange} color="#F3A9BB" />
      </div>

      <div>
        <TrackButton label="Circle" name="circle" checked={checkedLines.circle} onChange={handleCheckboxChange} color="#FFD300" />
      </div>

    </div>
  );
}

export default TrackList;
