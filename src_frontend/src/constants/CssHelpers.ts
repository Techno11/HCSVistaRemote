function getRainbowCssString() {
  return "linear-gradient(\n" +
    "        90deg,\n" +
    "        rgba(255, 0, 0, 1) 0%,\n" +
    "        rgba(255, 154, 0, 1) 10%,\n" +
    "        rgba(208, 222, 33, 1) 20%,\n" +
    "        rgba(79, 220, 74, 1) 30%,\n" +
    "        rgba(63, 218, 216, 1) 40%,\n" +
    "        rgba(47, 201, 226, 1) 50%,\n" +
    "        rgba(28, 127, 238, 1) 60%,\n" +
    "        rgba(95, 21, 242, 1) 70%,\n" +
    "        rgba(186, 12, 248, 1) 80%,\n" +
    "        rgba(251, 7, 217, 1) 90%,\n" +
    "        rgba(255, 0, 0, 1) 100%\n" +
    "    );"
}

function getRainbowCssStringReverse() {
  return "linear-gradient(\n" +
    "        90deg,\n" +
    "        rgba(255, 0, 0, 1) 0%,\n" +
    "        rgba(251, 7, 217, 1) 10%,\n" +
    "        rgba(186, 12, 248, 1) 20%,\n" +
    "        rgba(95, 21, 242, 1) 30%,\n" +
    "        rgba(28, 127, 238, 1) 40%,\n" +
    "        rgba(47, 201, 226, 1) 50%,\n" +
    "        rgba(63, 218, 216, 1) 60%,\n" +
    "        rgba(79, 220, 74, 1) 70%,\n" +
    "        rgba(208, 222, 33, 1) 80%,\n" +
    "        rgba(255, 154, 0, 1) 90%,\n" +
    "        rgba(255, 0, 0, 1) 100%\n" +
    "    );"
}

function getRedBlueCss() {
  return getGradiant(255, 0, 0, 0, 0, 255)
}

function getPurpleOrangeCss() {
  return getGradiant(100, 0, 100, 255, 154, 0)
}

function getTealPurpleCss() {
  return getGradiant(255, 0, 0, 100, 0, 100)
}

function getBlueGreenCss() {
  return getGradiant(0, 0, 255, 0, 128, 0)
}

function getRedOrangeCss() {
  return getGradiant(255, 0, 0, 255, 154, 0)
}

function getGradiant(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number) {
  return "linear-gradient(\n" +
    "        90deg,\n" +
    `        rgba(${r1}, ${g1}, ${b1}, 1) 0%,\n` +
    `        rgba(${r2}, ${g2}, ${b2}, 1) 100%\n` +
    "    );"
}

function getPOTYCss() {
  return "linear-gradient(\n" +
    "        90deg,\n" +
    "        rgba(100, 0, 100, 1) 10%,\n" +
    "        rgba(253, 88, 0, 1) 38%,\n" +
    "        rgba(0, 128, 128, 1) 60%,\n" +
    "        rgba(255, 204, 0, 1) 90%\n" +
    "    );"
}

function getOTYCss() {
  return "linear-gradient(\n" +
    "        90deg,\n" +
    "        rgba(253, 88, 0, 1) 10%,\n" +
    "        rgba(100, 0, 100, 1) 50%,\n" +
    "        rgba(255, 204, 0, 1) 90%\n" +
    "    );"
}

function getBRGPYCss() {
  return "linear-gradient(\n" +
    "        90deg,\n" +
    "        rgba(0, 0, 255, 1) 10%,\n" +
    "        rgba(255, 0, 0, 1) 30%,\n" +
    "        green 50%,\n" +
    "        rgba(100, 0, 100, 1) 70%,\n" +
    "        rgba(255, 204, 0, 1) 90%\n" +
    "    );"
}

function getRWBCss() {
  return "linear-gradient(\n" +
    "        90deg,\n" +
    "        rgba(255, 0, 0, 1) 10%,\n" +
    "        rgba(255, 255, 255, 1) 50%,\n" +
    "        rgba(0, 0, 255, 1) 90%\n" +
    "    );"
}


export {
  getRainbowCssString,
  getRainbowCssStringReverse,
  getRedBlueCss,
  getPOTYCss,
  getOTYCss,
  getBRGPYCss,
  getRWBCss,
  getBlueGreenCss,
  getPurpleOrangeCss,
  getRedOrangeCss,
  getTealPurpleCss
}