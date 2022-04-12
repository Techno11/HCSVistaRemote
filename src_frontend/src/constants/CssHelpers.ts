function getRainbowCssString () {
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

function getRainbowCssStringReverse () {
  return "linear-gradient(\n" +
    "        270deg,\n" +
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

function getRedBlueCss () {
  return "linear-gradient(\n" +
    "        90deg,\n" +
    "        rgba(255, 0, 0, 1) 0%,\n" +
    "        rgba(0, 0, 255, 1) 100%\n" +
    "    );"
}

function getPOTYCss () {
  return "linear-gradient(\n" +
    "        90deg,\n" +
    "        rgba(100, 0, 100, 1) 10%,\n" +
    "        rgba(253, 88, 0, 1) 38%,\n" +
    "        rgba(0, 128, 128, 1) 60%,\n" +
    "        rgba(255, 204, 0, 1) 90%\n" +
    "    );"
}


export {getRainbowCssString, getRainbowCssStringReverse, getRedBlueCss, getPOTYCss}