type Cuestack = {
  console: 1 | 2 | 3 | 4,
  position: number
  name: string
  number: number
  type: CuestackType
  cuestack_data?: number
}

enum CuestackType {
  Cyc,
  Stage,
  Truss,
  Wash,
  BO,
  Other
}

export { CuestackType }
export default Cuestack;