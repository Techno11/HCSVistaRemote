import * as React from 'react';
import {Grid} from "@mui/material";
import Color from "../models/Color";
import {ColorButtonGroup} from "./ColorButton";
import IntensitySlider from "./IntensitySlider";

export type ColorChange = {
  color: Color
  intensity: number
}

interface IProps {
  onChange: (data: ColorChange) => void
  value: ColorChange
  cyc?: boolean
}

export default function ColorSelector(props: IProps) {

  const {onChange, value: {color, intensity}, cyc} = props;

  const genericColors = [
    {name: "Red", color: Color.RED},
    {name: "Green", color: Color.GREEN},
    {name: "Blue", color: Color.BLUE},
    {name: "Pink", color: Color.PINK},
    {name: "Yellow", color: Color.YELLOW},
    {name: "Teal", color: Color.TEAL},
    {name: "Magenta", color: Color.MAGENTA},
    {name: "Purple", color: Color.PURPLE},
    {name: "Orange", color: Color.ORANGE},
    {name: "White", color: Color.WHITE},
    {name: "Off", color: Color.OFF},
  ]

  const cycColors = [
    {name: "Rainbow", color: Color.RAINBOW},
    {name: "R|B", color: Color.RB},
    {name: "Twinkle", color: Color.TWINKLE},
    {name: "ROYGBIV", color: Color.ROYGBIV},
    {name: "Spazzy", color: Color.SPAZZY},
    {name: "R Spazzy", color: Color.RSPAZZY},
    {name: "G Spazzy", color: Color.GSPAZZY},
    {name: "B Spazzy", color: Color.BSPAZZY},
    {name: "P Spazzy", color: Color.PSPAZZY},
    {name: "POTY", color: Color.POTY},
  ]

  const onColorChange = (val: Color) => {
    onChange({color: val, intensity: intensity});
  }

  const onIntensityChange = (val: number) => {
    onChange({color: color, intensity: val});
  }

  return (
    <>
      {/* Grid of Buttons/Intensity */}
      <Grid container direction={'row'}>

        {/* Always Renders, "Generic" Colors */}
        <Grid item xs={cyc ? 4.5 : 9}>
          <ColorButtonGroup colors={genericColors} onChange={onColorChange} currentColor={color} />
        </Grid>

        {/* Intensity Slider */}
        <Grid item xs={3}>
          <IntensitySlider onChange={onIntensityChange} value={intensity} labels={false} />
        </Grid>

        {/* Renders only when "cyc" prop is true */}
        {cyc &&
          <Grid item xs={4.5}>
            <ColorButtonGroup colors={cycColors} onChange={onColorChange} currentColor={color} />
          </Grid>
        }
      </Grid>
    </>
  );
}
