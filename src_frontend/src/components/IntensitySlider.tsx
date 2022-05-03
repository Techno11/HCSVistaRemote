import * as React from 'react';
import {useState} from 'react';
import {Button, ButtonGroup, Grid, Slider, TextField, Typography} from "@mui/material";
import {useVista} from "../hooks/useVista";
import {CuestackTriggerMode} from "../models/CuestackTrigger";
import * as HHS from "../constants/ConsoleEnumsHHS"
import BOType from "../models/BO";

interface IProps {
  onChange: (val: number) => void
  value: number
  labels?: boolean
}


export default function IntensitySlider({onChange, value, labels}: IProps) {

  const marks = [
    {value: 0, label: labels ? 'Off' : ''},
    {value: 25, label: labels ? '25%' : ''},
    {value: 50, label: labels ? '50%' : ''},
    {value: 75, label: labels ? '75%' : ''},
    {value: 100, label: labels ? '100%' : ''},
  ]

  return (
    <Grid container sx={{height: '100%'}} direction={'column'}>
      <Grid item xs={11} sx={{height: '100%', pb: 2}}>
        <Slider
          sx={{height: '100%', mt: 1}}
          orientation="vertical"
          value={value}
          marks={marks}
          onChange={(e, n) => onChange(Array.isArray(n) ? n[0] : n)}
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          type="number"
          variant={"standard"}
          value={value}
          onChange={e => onChange(parseInt(e.target.value))}
          inputProps={{min: 0, max: 100}}
        />
      </Grid>
    </Grid>
  );
}
