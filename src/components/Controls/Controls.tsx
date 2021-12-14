import { ChangeEvent, ChangeEventHandler, useState } from "react";
import "./Controls.css";

interface ControlsPropsType {
  values: any;
  setValues: any;
  onGameReset: any
}

export default function Controls({values, setValues, onGameReset}: ControlsPropsType) {
  const pixelSize = 10;

  const [enabled, setEnabled] = useState(false);

  const valueChange = (e: any) => {
    console.log('', e.target.id);
    const valuesCopy = {...values};
    valuesCopy[e.target.id] = parseInt(e.target.value);
    setValues(valuesCopy);
  }
  return (
    <div className="controls" style={{
      left: pixelSize * (values.boardCols) + 4,
      top: 0,
      height: pixelSize * (values.boardLines) + 4
    }}>
      <h4>Controls</h4>
      <button onClick={onGameReset}>Restart</button>
      <div className="inputGroup">
        <label>Lines</label>
        <input onBlur={() => {setEnabled(false)}} disabled={!enabled} id='boardLines' type="number" value={values.boardLines} onChange={valueChange}/>
      </div>
      <div className="inputGroup">
        <label>Columns</label>
        <input onBlur={() => {setEnabled(false)}} disabled={!enabled} id='boardCols' type="number" value={values.boardCols} onChange={valueChange}/>
      </div>
      <div className="inputGroup">
        <label>Step interval (ms)</label>
        <input onBlur={() => {setEnabled(false)}} disabled={!enabled} id='intervalMs' type="number" value={values.intervalMs} onChange={valueChange}/>
      </div>

      <button onClick={() => {setEnabled(!enabled)}}>
        {enabled? "Disable":"Enable"} Config
      </button>
    </div>
  )
}