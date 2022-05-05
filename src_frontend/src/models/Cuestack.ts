import Wash from "./Wash";
import Color from "./Color";
import BO from "./BO";

type Cuestack = {
  console: 1 | 2 | 3 | 4,
  position: number
  name: string
  number: number
  type: CuestackType
  cuestack_data?: Color | Wash | BO
}

enum CuestackType {
  Cyc,
  Stage,
  Truss,
  Wash,
  BO,
  House,
  Baby,
  Other
}

export { CuestackType }
export default Cuestack;