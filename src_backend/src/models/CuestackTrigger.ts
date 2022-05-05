import Cuestack from "./Cuestack";

enum CuestackTriggerMode {
  PLAY,
  RELEASE,
  INTENSITY,
  ADVANCE
}

type CuestackTrigger = {
  intensity: number
  cuestack: Cuestack
  mode: CuestackTriggerMode
}

export {CuestackTriggerMode};
export default CuestackTrigger;