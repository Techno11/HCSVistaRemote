import * as React from 'react';
import {Checkbox, FormLabel, Grid} from "@mui/material";
import Color from "../models/Color";
import {ColorButtonGroup} from "./ColorButton";
import IntensitySlider from "./IntensitySlider";
import BuildingBoard from "../models/BuildingBoard";

export type ColorChange = {
  color: Color
  intensity: number
  spazzy?: boolean
}

interface IProps {
  onChange: (data: ColorChange) => void
  value: ColorChange
  building: BuildingBoard
  cyc?: boolean
  truss?: boolean
  mover?: boolean
}

export default function ColorSelector(props: IProps) {

  const {onChange, value: {color, intensity, spazzy}, building, cyc, truss, mover} = props;

  const genericColors = [
    {name: "Red", color: Color.RED},
    {name: "Green", color: Color.GREEN},
    {name: "Blue", color: Color.BLUE},
    {name: !mover ? "Pink" : "N/A", color: !mover ? Color.PINK : Color.SPECIAL},
    {name: "Yello", color: Color.YELLOW},
    {name: "Teal", color: Color.TEAL},
    {name: "Magen", color: Color.MAGENTA},
    {name: "Purple", color: Color.PURPLE},
    {name: "Orange", color: Color.ORANGE},
    {name: "White", color: Color.WHITE},
    {name: "Off", color: Color.OFF},
  ]

  const cycColorsHHS = [
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

  const cycColorsPAC = [
    {name: "R|B", color: Color.RB},
    {name: "R|O", color: Color.RO},
    {name: "B|G", color: Color.BG},
    {name: "OPY", color: Color.OPY},
    {name: "BRGPY", color: Color.BRGPY},
    {name: "ROYGBIV", color: Color.ROYGBIV},
    {name: "RWB", color: Color.RWB},
    {name: "SPAZZY", color: Color.SPAZZY},
    {name: "RAINBOW", color: Color.RAINBOW},
    {name: "SPECIAL", color: Color.SPECIAL},
  ]

  const trussColors = [
    {name: "Red|Blu", color: Color.RB},
    {name: "Pur|Ora", color: Color.PO},
    {name: "Tel|Pur", color: Color.TP},
    {name: "Blu|Gre", color: Color.BG},
  ]

  const onColorChange = (val: Color) => {
    onChange({color: val, intensity: intensity, spazzy: spazzy});
  }

  const onIntensityChange = (val: number) => {
    onChange({color: color, intensity: val, spazzy: spazzy});
  }

  const onSpazzyChange = (checked: boolean) => {
    onChange({color: color, intensity: intensity, spazzy: checked});
  }

  return (
    <>
      {/* Grid of Buttons/Intensity */}
      <Grid container direction={'row'} spacing={1}>

        {/* Always Renders, "Generic" Colors */}
        <Grid item >
          <ColorButtonGroup colors={genericColors} onChange={onColorChange} currentColor={color} />
        </Grid>

        {/* Intensity Slider */}
        {!truss && // Hide Intensity when truss is visible
          <Grid item>
            <IntensitySlider onChange={onIntensityChange} value={intensity} labels={false} />
          </Grid>
        }

        {/* Renders only when "truss" prop is true */}
        {truss &&
          <Grid item xs={6}>
            <ColorButtonGroup colors={trussColors} onChange={onColorChange} currentColor={color} />
          </Grid>
        }

        {/* Renders only when "cyc" prop is true */}
        {cyc &&
          <Grid item>
            <ColorButtonGroup
              colors={building === BuildingBoard.HHS ? cycColorsHHS : cycColorsPAC}
              onChange={onColorChange} currentColor={color}
            />
          </Grid>
        }
      </Grid>
      {(mover || truss) &&
        <FormLabel>
          <Checkbox onChange={e => onSpazzyChange(e.target.checked)} checked={!!spazzy} />
          {mover ? "Special" : "Spazzy"}
        </FormLabel>
      }
    </>
  );
}
