import * as React from 'react';
import {useState} from 'react';
import {Grid, IconButton, Slider, TextField, Typography} from "@mui/material";
import "./components.css"
import ZoneStates from "../models/ZoneStates";
import ZoneState from "../models/ZoneState";

interface IProps {
  onChange: (state: ZoneStates) => void,
  value: ZoneStates
}

export default function WashEditor(props: IProps) {

  const {onChange, value: zoneStates} = props;

  const marks = [
    {value: 0, label: 'Off'},
    {value: 25, label: '25%'},
    {value: 50, label: '50%'},
    {value: 75, label: '75%'},
    {value: 100, label: '100%'},
  ]

  const [activeButton, setActiveButton] = useState<keyof typeof zoneStates>("wash")
  
  const iconButtonSx = (state: ZoneState, first: boolean, activeBtn: keyof typeof zoneStates) => {
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

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, btn: keyof typeof zoneStates) => {
    e.preventDefault();
    setActiveButton(btn);
    const newState = {...zoneStates[btn]};
    newState.enabled = !newState.enabled;
    const newStates = {...zoneStates};
    newStates[btn] = newState;
    onChange(newStates);
  }

  const onSlide = (intensity: number | number[]) => {
    if (Array.isArray(intensity)) intensity = intensity[0] ?? 100;
    const newState = {...zoneStates[activeButton], intensity};
    const newStates = {...zoneStates};
    newStates[activeButton] = newState;
    onChange(newStates);
  }

  return (
    <>
      <Typography variant={"h4"}><b><u>Wash</u></b></Typography>
      <Grid container direction={'row'}>
        <Grid item xs={4}>
          <Grid container direction={"column"}>
            <Grid item>
              <div style={{marginBottom: "10px", textAlign: "center"}}>
                <IconButton onClick={e => onClick(e, "z7")} sx={iconButtonSx(zoneStates.z7, true, activeButton)} >Z7</IconButton>
                <IconButton onClick={e => onClick(e, "z8")} sx={iconButtonSx(zoneStates.z8, false, activeButton)}>Z8</IconButton>
                <IconButton onClick={e => onClick(e, "z9")} sx={iconButtonSx(zoneStates.z9, false, activeButton)}>Z9</IconButton>
              </div>
            </Grid>
            <Grid item>
              <div style={{marginBottom: "10px", textAlign: "center"}}>
                <IconButton onClick={e => onClick(e, "UsSp")} sx={iconButtonSx(zoneStates.UsSp, true, activeButton)}>US SP</IconButton>
              </div>
            </Grid>
            <Grid item>
              <div style={{marginBottom: "10px", textAlign: "center"}}>
                <IconButton onClick={e => onClick(e, "z4")} sx={iconButtonSx(zoneStates.z4, true, activeButton)}>Z4</IconButton>
                <IconButton onClick={e => onClick(e, "z5")} sx={iconButtonSx(zoneStates.z5, false, activeButton)}>Z5</IconButton>
                <IconButton onClick={e => onClick(e, "z6")} sx={iconButtonSx(zoneStates.z6, false, activeButton)}>Z6</IconButton>
              </div>
            </Grid>
            <Grid item>
              <div style={{marginBottom: "10px", textAlign: "center"}}>
                <IconButton onClick={e => onClick(e, "MsSp")} sx={iconButtonSx(zoneStates.MsSp, true, activeButton)}>MS SP</IconButton>
              </div>
            </Grid>
            <Grid>
              <div style={{marginBottom: "10px", textAlign: "center"}}>
                <IconButton onClick={e => onClick(e, "z1")} sx={iconButtonSx(zoneStates.z1, true, activeButton)}>Z1</IconButton>
                <IconButton onClick={e => onClick(e, "z2")} sx={iconButtonSx(zoneStates.z2, false, activeButton)}>Z2</IconButton>
                <IconButton onClick={e => onClick(e, "z3")} sx={iconButtonSx(zoneStates.z3, false, activeButton)}>Z3</IconButton>
              </div>
            </Grid>
            <Grid item>
              <div style={{marginBottom: "10px", textAlign: "center"}}>
                <IconButton onClick={e => onClick(e, "DsSp")} sx={iconButtonSx(zoneStates.DsSp, true, activeButton)}>DS SP</IconButton>
              </div>
            </Grid>
            <Grid item>
              <div style={{marginBottom: "10px", textAlign: "center"}}>
                <IconButton onClick={e => onClick(e, "wash")} sx={iconButtonSx(zoneStates.wash, true, activeButton)}>Wash</IconButton>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container sx={{height: '100%'}} direction={'column'}>
            <Grid item xs={11} sx={{height: '100%', pb: 2}}>
              <Slider
                sx={{height: '100%'}}
                orientation="vertical"
                value={zoneStates[activeButton].intensity}
                marks={marks}
                onChange={(e, n) => onSlide(n)}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                type="number"
                variant={"standard"}
                sx={{px: 2}}
                value={zoneStates[activeButton].intensity}
                inputProps={{min: 0, max: 100}}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
