import * as HHS from '../constants/ConsoleEnumsHHS'

enum CuestackTriggerMode {
  PLAY,
  RELEASE,
  INTENSITY
}

type CuestackTrigger = {
  intensity: number
  cuestack: Cuestack
  mode: CuestackTriggerMode
}

export {CuestackTriggerMode};
export default CuestackTrigger;