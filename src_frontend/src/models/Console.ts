import Cuestack from "./Cuestack";
import WashZone from "./WashZone";
import BOType from "./BO";
import Color from "./Color";

type Console = {
  cyc: (color: Color) => Cuestack,
  stage: (color: Color) => Cuestack,
  wash: (zone: WashZone) => Cuestack,
  bo: (mode: BOType) => Cuestack,
  truss?: (color: Color) => Cuestack,
  mover?: (color: Color) => Cuestack,
  board: Board
}

export type Board = {[key: string]: Cuestack};

export default Console;