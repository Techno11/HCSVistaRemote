const gps = require('get-pixel-screen');

/**
 * An awful way to synchronously wait
 * @param durationMs
 */
function waitSync(durationMs: number) {
  const startMs = Date.now();
  while((startMs + durationMs) > Date.now()) {
    // Do Nothing. This is an absolutely awful way to do this. I should be sent to JS jail.
  }
}

/**
 * Get a BGR hex value at a given screen coordinate
 * @param x
 * @param y
 */
function getPixelBGRHex(x: number, y: number): string {
  let hex = "0";
  while (hex.length < 6 || hex === "0") {
    const color: number = gps.getPixel(x, y);
    hex = color.toString(16);
  }
  return hex;
}

export {
  waitSync, getPixelBGRHex
}