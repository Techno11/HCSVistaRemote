import * as React from 'react';
import {Box, Button, ButtonGroup, LinearProgress, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {useVista} from "../hooks/useVista";
import Color from "../models/Color";
import {getPOTYCss, getRainbowCssString, getRedBlueCss} from "../constants/CssHelpers";

interface IProps {
  onClick: (color: Color) => void,
  currentColor: Color,
  desiredColor: Color,
  text: string
}

export function ColorButton({onClick, currentColor, desiredColor, text}: IProps) {

  const colors =
    desiredColor === Color.RED ? { bg: 'red', fg: 'white', border: 'black' } :
    desiredColor === Color.GREEN ? { bg: 'green', fg: 'white', border: 'black' } :
    desiredColor === Color.BLUE ? { bg: 'blue', fg: 'white', border: 'black' } :
    desiredColor === Color.PINK ? { bg: 'pink', fg: 'white', border: 'black' } :
    desiredColor === Color.YELLOW ? { bg: 'yellow', fg: 'black', border: 'black' } :
    desiredColor === Color.TEAL ? { bg: 'teal', fg: 'white', border: 'black' } :
    desiredColor === Color.MAGENTA ? { bg: 'magenta', fg: 'white', border: 'black' } :
    desiredColor === Color.PURPLE ? { bg: 'purple', fg: 'white', border: 'black' } :
    desiredColor === Color.ORANGE ? { bg: 'orange', fg: 'black', border: 'black' } :
    desiredColor === Color.WHITE ? { bg: 'white', fg: 'black', border: 'black' } :
    desiredColor === Color.OFF ? { bg: 'black', fg: 'white', border: 'lightgrey' } :
    desiredColor === Color.RAINBOW ? { bg: getRainbowCssString(), fg: 'white', border: 'black' } :
    desiredColor === Color.RB ? { bg: getRedBlueCss(), fg: 'white', border: 'black' } :
    desiredColor === Color.TWINKLE ? { bg: 'gray', fg: 'white', border: 'black' } :
    desiredColor === Color.ROYGBIV ? { bg: 'gray', fg: 'white', border: 'black' } :
    desiredColor === Color.SPAZZY ? { bg: 'gray', fg: 'white', border: 'black' } :
    desiredColor === Color.RSPAZZY ? { bg: 'red', fg: 'white', border: 'black' } :
    desiredColor === Color.GSPAZZY ? { bg: 'green', fg: 'white', border: 'black' } :
    desiredColor === Color.BSPAZZY ? { bg: 'blue', fg: 'white', border: 'black' } :
    desiredColor === Color.PSPAZZY ? { bg: 'purple', fg: 'white', border: 'black' } :
    desiredColor === Color.POTY ? { bg: getPOTYCss(), fg: 'white', border: 'black' } :
                                  { bg: 'grey', fg: 'white', border: 'black' };

  const onColorChange = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onClick(desiredColor);
  }
  return (
    <Button
      size={"small"}
      disabled={currentColor === desiredColor}
      sx={{
        background: colors.bg,
        color: colors.fg,
        border: (currentColor === desiredColor) ? `4px solid ${colors.border} !important` : "4px solid rgba(0, 0, 0, 0)"
      }}
      onClick={(e) => onColorChange(e)}
    >
      {text}
    </Button>
  );
}

interface IPropsGrp {
  colors: {name: string, color: Color}[],
  onChange: (val: Color) => void,
  currentColor: Color
}

export function ColorButtonGroup({colors, onChange, currentColor} : IPropsGrp) {
  return (
    <>
      <ButtonGroup orientation={"vertical"}>
        {colors.map(btn => (
          <ColorButton onClick={onChange} currentColor={currentColor} desiredColor={btn.color} text={btn.name} key={btn.color} />
        ))}
      </ButtonGroup>
    </>
  )
}
