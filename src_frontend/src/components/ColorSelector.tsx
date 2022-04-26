import * as React from 'react';
import {useState} from 'react';
import {Button, ButtonGroup, Grid, Slider, TextField, Typography} from "@mui/material";
import Color from "../models/Color";
import {getPOTYCss, getRainbowCssString, getRedBlueCss} from "../constants/CssHelpers";

export type ColorChange = {
  color: Color
  intensity: number
}

interface IProps {
  onChange: (data: ColorChange) => void
  value: ColorChange
  title: string
  cyc?: boolean
}

export default function ColorSelector(props: IProps) {

  const {onChange, value: {color, intensity}, cyc, title} = props;

  const marks = [
    {value: 0, label: 'Off'},
    {value: 25, label: '25%'},
    {value: 50, label: '50%'},
    {value: 75, label: '75%'},
    {value: 100, label: '100%'},
  ]

  const onColorChange = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>, val: Color) => {
    event.preventDefault();
    onChange({color: val, intensity: intensity});
  }

  const onIntensityChange = (val: number | number[]) => {
    val = Array.isArray(val) ? val[0] : val;
    onChange({color: color, intensity: val});
  }

  return (
    <>
      <Typography variant={"h4"}><b><u>{title}</u></b></Typography>
      <Grid container direction={'row'}>
        <Grid item xs={cyc ? 4 : 6}>
          <ButtonGroup orientation={"vertical"}>
            <Button
              disabled={color === Color.RED}
              sx={{
                backgroundColor: 'red',
                color: 'white',
                border: (color === Color.RED) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.RED)}
            >
              Red
            </Button>
            <Button
              disabled={color === Color.GREEN}
              sx={{
                backgroundColor: 'green',
                color: 'white',
                border: (color === Color.GREEN) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.GREEN)}
            >
              Green
            </Button>
            <Button
              disabled={color === Color.BLUE}
              sx={{
                backgroundColor: 'blue',
                color: 'white',
                border: (color === Color.BLUE) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.BLUE)}
            >
              Blue
            </Button>
            <Button
              disabled={color === Color.PINK}
              sx={{
                backgroundColor: 'pink',
                color: 'black',
                border: (color === Color.PINK) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.PINK)}
            >
              Pink
            </Button>
            <Button
              disabled={color === Color.YELLOW}
              sx={{
                backgroundColor: 'yellow',
                color: 'black',
                border: (color === Color.YELLOW) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.YELLOW)}
            >
              Yellow
            </Button>
            <Button
              disabled={color === Color.TEAL}
              sx={{
                backgroundColor: 'teal',
                color: 'white',
                border: (color === Color.TEAL) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.TEAL)}
            >
              Teal
            </Button>
            <Button
              disabled={color === Color.MAGENTA}
              sx={{
                backgroundColor: 'magenta',
                color: 'white',
                border: (color === Color.MAGENTA) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.MAGENTA)}
            >
              Magenta
            </Button>
            <Button
              disabled={color === Color.PURPLE}
              sx={{
                backgroundColor: 'purple',
                color: 'white',
                border: (color === Color.PURPLE) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.PURPLE)}
            >
              Purple
            </Button>
            <Button
              disabled={color === Color.ORANGE}
              sx={{
                backgroundColor: 'orange',
                color: 'black',
                border: (color === Color.ORANGE) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.ORANGE)}
            >
              Orange
            </Button>
            <Button
              disabled={color === Color.WHITE}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                border: (color === Color.WHITE) ? "4px solid black !important" : "2px solid lightgrey"
              }}
              onClick={(e) => onColorChange(e, Color.WHITE)}
            >
              White
            </Button>
            <Button
              disabled={color === Color.OFF}
              sx={{backgroundColor: 'black', color: 'white', width: 1}}
              onClick={(e) => onColorChange(e, Color.OFF)}
            >
              Off
            </Button>
          </ButtonGroup>
        </Grid>
        {cyc &&
        <Grid item xs={4}>
          <ButtonGroup orientation={"vertical"}>
            <Button
              disabled={color === Color.RAINBOW}
              sx={{
                background: getRainbowCssString(),
                color: 'white',
                border: (color === Color.RAINBOW) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.RAINBOW)}
            >
              Rainbow
            </Button>
            <Button
              disabled={color === Color.RB}
              sx={{
                background: getRedBlueCss(),
                color: 'white',
                border: (color === Color.RB) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.RB)}
            >
              R | B
            </Button>
            <Button
              disabled={color === Color.TWINKLE}
              sx={{
                backgroundColor: 'gray',
                color: 'white',
                border: (color === Color.TWINKLE) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.TWINKLE)}
            >
              Twinkle
            </Button>
            <Button
              disabled={color === Color.ROYGBIV}
              sx={{
                backgroundColor: 'gray',
                color: 'black',
                border: (color === Color.ROYGBIV) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.ROYGBIV)}
            >
              ROYGBIV
            </Button>
            <Button
              disabled={color === Color.SPAZZY}
              sx={{
                backgroundColor: 'gray',
                color: 'black',
                border: (color === Color.SPAZZY) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.SPAZZY)}
            >
              Spazzy
            </Button>
            <Button
              disabled={color === Color.RSPAZZY}
              sx={{
                backgroundColor: 'red',
                color: 'white',
                border: (color === Color.RSPAZZY) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.RSPAZZY)}
            >
              R Spazzy
            </Button>
            <Button
              disabled={color === Color.GSPAZZY}
              sx={{
                backgroundColor: 'green',
                color: 'white',
                border: (color === Color.GSPAZZY) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.GSPAZZY)}
            >
              G Spazzy
            </Button>
            <Button
              disabled={color === Color.BSPAZZY}
              sx={{
                backgroundColor: 'blue',
                color: 'white',
                border: (color === Color.BSPAZZY) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.BSPAZZY)}
            >
              B Spazzy
            </Button>
            <Button
              disabled={color === Color.PSPAZZY}
              sx={{
                backgroundColor: 'purple',
                color: 'white',
                border: (color === Color.PSPAZZY) ? "4px solid black !important" : ""
              }}
              onClick={(e) => onColorChange(e, Color.PSPAZZY)}
            >
              P Spazzy
            </Button>
            <Button
              disabled={color === Color.POTY}
              sx={{
                background: getPOTYCss(),
                color: 'white',
                border: (color === Color.POTY) ? "4px solid black !important" : "2px solid lightgrey"
              }}
              onClick={(e) => onColorChange(e, Color.POTY)}
            >
              POTY
            </Button>
          </ButtonGroup>
        </Grid>
        }
        <Grid item xs={cyc ? 4 : 6}>
          <Grid container sx={{height: '100%'}} direction={'column'}>
            <Grid item xs={11} sx={{height: '100%', pb: 2}}>
              <Slider
                sx={{height: '100%'}}
                orientation="vertical"
                value={intensity}
                marks={marks}
                onChange={(e, n) => onIntensityChange(n)}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                type="number"
                variant={"standard"}
                sx={{px: 2}}
                value={intensity}
                onChange={e => onIntensityChange(parseInt(e.target.value))}
                inputProps={{min: 0, max: 100}}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
