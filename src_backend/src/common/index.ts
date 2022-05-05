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
 * @param timeout max time to wait
 */
function getPixelBGRHex(x: number, y: number, timeout: number): Promise<string | undefined> {
  return Promise.race([getPixelBGRAsync_unsafe(x, y), waitAsync(timeout)]);
}

function waitAsync(ms: number): Promise<undefined> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Get a BGR hex value at a given screen coordinate. Unsafe as this could hang indefinitely
 * @param x
 * @param y
 */
function getPixelBGRAsync_unsafe(x: number, y: number): Promise<string> {
  return new Promise(resolve => {
    let hex = "0";
    while (hex.length < 6 || hex === "0") {
      const color: number = gps.getPixel(x, y);
      hex = color.toString(16);
    }
    resolve(hex);
  })
}

/**
 * Get a BGR hex value at a given screen coordinate. Unsafe as this could hang indefinitely
 * @param x
 * @param y
 */
function getPixelBGR_unsafe(x: number, y: number): string {
  let hex = "0";
  while (hex.length < 6 || hex === "0") {
    const color: number = gps.getPixel(x, y);
    hex = color.toString(16);
  }
  return hex;
}

export {
  waitSync, getPixelBGRHex, getPixelBGR_unsafe
}