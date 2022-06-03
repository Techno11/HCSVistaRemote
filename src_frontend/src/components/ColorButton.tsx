import * as React from 'react';
import { Button, ButtonGroup } from "@mui/material";
import Color from "../models/Color";
import {
  getBlueGreenCss, getBRGPYCss, getOTYCss,
  getPOTYCss,
  getPurpleOrangeCss,
  getRainbowCssString, getRainbowCssStringReverse,
  getRedBlueCss, getRedOrangeCss, getRWBCss,
  getTealPurpleCss
} from "../constants/CssHelpers";

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
    desiredColor === Color.ROYGBIV ? { bg: getRainbowCssStringReverse(), fg: 'white', border: 'black' } :
    desiredColor === Color.RB ? { bg: getRedBlueCss(), fg: 'white', border: 'black' } :
    desiredColor === Color.TWINKLE ? { bg: 'gray', fg: 'white', border: 'black' } :
    desiredColor === Color.SPAZZY ? { bg: 'gray', fg: 'white', border: 'black' } :
    desiredColor === Color.RSPAZZY ? { bg: 'red', fg: 'white', border: 'black' } :
    desiredColor === Color.GSPAZZY ? { bg: 'green', fg: 'white', border: 'black' } :
    desiredColor === Color.BSPAZZY ? { bg: 'blue', fg: 'white', border: 'black' } :
    desiredColor === Color.PSPAZZY ? { bg: 'purple', fg: 'white', border: 'black' } :
    desiredColor === Color.POTY ? { bg: getPOTYCss(), fg: 'white', border: 'black' } :
    desiredColor === Color.PO ? { bg: getPurpleOrangeCss(), fg: 'white', border: 'black' } :
    desiredColor === Color.TP ? { bg: getTealPurpleCss(), fg: 'white', border: 'black' } :
    desiredColor === Color.BG ? { bg: getBlueGreenCss(), fg: 'white', border: 'black' } :
    desiredColor === Color.RO ? { bg: getRedOrangeCss(), fg: 'white', border: 'black' } :
    desiredColor === Color.OPY ? { bg: getOTYCss(), fg: 'white', border: 'black' } :
    desiredColor === Color.BRGPY ? { bg: getBRGPYCss(), fg: 'white', border: 'black' } :
    desiredColor === Color.RWB ? { bg: getRWBCss(), fg: 'black', border: 'black' } :
                                  { bg: 'grey', fg: 'white', border: 'black' };

  const onColorChange = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // If button exists/isn't disabled
    if(text !== "N/A") onClick(desiredColor);
  }
  return (
    <Button
      size={"small"}
      disabled={currentColor === desiredColor || text === "N/A"}
      sx={{
        background: colors.bg,
        color: colors.fg,
        width: "100%",
        border: (currentColor === desiredColor) ? `4px solid ${colors.border} !important` : "4px solid rgba(0, 0, 0, 0)"
      }}
      onClick={onColorChange}
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
