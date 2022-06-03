import * as React from 'react';
import {useState} from 'react';
import {Grid, IconButton, Slider, TextField, Typography} from "@mui/material";
import "./components.css"
import ZoneStates from "../models/ZoneStates";
import ZoneState from "../models/ZoneState";
import IntensitySlider from "./IntensitySlider";
import WashZone from "../models/WashZone";
import BuildingBoard from "../models/BuildingBoard";

interface IProps {
  onChange: (state: ZoneStates) => void,
  value: ZoneStates
  board: BuildingBoard
}

export default function WashEditor(props: IProps) {

  const {onChange, value: zoneStates, board} = props;

  const [activeButton, setActiveButton] = useState<WashZone>("wash")

  /**
   * Calculate the SX prop of a wash button
   * @param state state of the zone this button represents
   * @param first if this is the first button of the row
   * @param activeBtn if this is the active button
   * activeBtn must be passed in so as a prop so this is triggered on state changes
   */
  const iconButtonSx = (state: ZoneState, first: boolean, activeBtn: WashZone) => {
    const eightBitIntensity = (state.intensity / 100) * 255;
    const whiteBlack = eightBitIntensity > 127 ? 'black' : 'white';
    return ({
      ml: first ? 0 : 2,
      background: `rgb(${eightBitIntensity}, ${eightBitIntensity}, ${eightBitIntensity})`,
      color: whiteBlack,
      border: state.enabled ? "2px solid green" : "2px solid red",
      animation: activeBtn === state.name ? `border-blink-${state.enabled ? 'green' : 'red'} .3s step-end infinite alternate` : null
    })
  }

  /**
   * Handle onClick event of a wash button
   * @param e click event
   * @param btn what button is being clicked
   */
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, btn: WashZone) => {
    e.preventDefault();
    // Copy state
    const newState = {...zoneStates[btn]}
    const newStates = {...zoneStates};
    // Only toggle on/off if this is already the active button
    if(activeButton === btn) {
      // Invert state
      newState.enabled = !newState.enabled;
      // Update copy
      newStates[btn] = newState;
      // Emit change emitter (only when there is a change)
      onChange(newStates);
    }
    // Update active button
    setActiveButton(btn);
  }

  /**
   * Handle the slide event of the wash
   * @param intensity
   */
  const onSlide = (intensity: number | number[]) => {
    // Make sure we're getting the correct data
    if (Array.isArray(intensity)) intensity = intensity[0] ?? 100;
    // Copy STate
    const newState = {...zoneStates[activeButton], intensity};
    const newStates = {...zoneStates};
    // Update State
    newStates[activeButton] = newState;
    // Emit change emitter
    onChange(newStates);
  }

  return (
    <>
      <Grid container direction={'row'} sx={{height: '100%'}}>
        <Grid item xs={10}>
          {/* Zones 7-9 (Only at HS) */}
          {board === BuildingBoard.HHS &&
            <div style={{marginBottom: "10px", textAlign: "center"}}>
              <IconButton onClick={e => onClick(e, "z7")} sx={iconButtonSx(zoneStates.z7, true, activeButton)} >Z7</IconButton>
              <IconButton onClick={e => onClick(e, "z8")} sx={iconButtonSx(zoneStates.z8, false, activeButton)}>Z8</IconButton>
              <IconButton onClick={e => onClick(e, "z9")} sx={iconButtonSx(zoneStates.z9, false, activeButton)}>Z9</IconButton>
            </div>
          }

          {/* Upstage Special */}
          <div style={{marginBottom: "10px", textAlign: "center"}}>
            <IconButton onClick={e => onClick(e, "UsSp")} sx={iconButtonSx(zoneStates.UsSp, true, activeButton)}>US SP</IconButton>
          </div>

          {/* Zones 4-6 */}
          <div style={{marginBottom: "10px", textAlign: "center"}}>
            <IconButton onClick={e => onClick(e, "z4")} sx={iconButtonSx(zoneStates.z4, true, activeButton)}>Z4</IconButton>
            <IconButton onClick={e => onClick(e, "z5")} sx={iconButtonSx(zoneStates.z5, false, activeButton)}>Z5</IconButton>
            <IconButton onClick={e => onClick(e, "z6")} sx={iconButtonSx(zoneStates.z6, false, activeButton)}>Z6</IconButton>
          </div>

          {/* Midstage Special */}
          <div style={{marginBottom: "10px", textAlign: "center"}}>
            <IconButton onClick={e => onClick(e, "MsSp")} sx={iconButtonSx(zoneStates.MsSp, true, activeButton)}>MS SP</IconButton>
          </div>

          {/* Zones 1-3 */}
          <div style={{marginBottom: "10px", textAlign: "center"}}>
            <IconButton onClick={e => onClick(e, "z1")} sx={iconButtonSx(zoneStates.z1, true, activeButton)}>Z1</IconButton>
            <IconButton onClick={e => onClick(e, "z2")} sx={iconButtonSx(zoneStates.z2, false, activeButton)}>Z2</IconButton>
            <IconButton onClick={e => onClick(e, "z3")} sx={iconButtonSx(zoneStates.z3, false, activeButton)}>Z3</IconButton>
          </div>

          {/* Downstage Special (Only at HS) */}
          {board === BuildingBoard.HHS &&
            <div style={{marginBottom: "10px", textAlign: "center"}}>
              <IconButton onClick={e => onClick(e, "DsSp")} sx={iconButtonSx(zoneStates.DsSp, true, activeButton)}>DS SP</IconButton>
            </div>
          }

          {/* Apron (Only at PAC) */}
          {board === BuildingBoard.PAC &&
            <div style={{marginBottom: "10px", textAlign: "center"}}>
              <IconButton onClick={e => onClick(e, "Apron")} sx={iconButtonSx(zoneStates.Apron, true, activeButton)}>Apron</IconButton>
            </div>
          }

          {/* Wash */}
          <div style={{marginBottom: "10px", textAlign: "center"}}>
            <IconButton onClick={e => onClick(e, "wash")} sx={iconButtonSx(zoneStates.wash, true, activeButton)}>Wash</IconButton>
          </div>
        </Grid>
        <Grid item xs={2}>
          <IntensitySlider onChange={onSlide} value={zoneStates[activeButton].intensity} />
        </Grid>
      </Grid>
    </>
  );
}
