"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPixelBGRHex = exports.waitSync = void 0;
const gps = require('get-pixel-screen');
/**
 * An awful way to synchronously wait
 * @param durationMs
 */
function waitSync(durationMs) {
    const startMs = Date.now();
    while ((startMs + durationMs) > Date.now()) {
        // Do Nothing. This is an absolutely awful way to do this. I should be sent to JS jail.
    }
}
exports.waitSync = waitSync;
/**
 * Get a BGR hex value at a given screen coordinate
 * @param x
 * @param y
 */
function getPixelBGRHex(x, y) {
    let hex = "0";
    while (hex.length < 6 || hex === "0") {
        const color = gps.getPixel(x, y);
        hex = color.toString(16);
    }
    return hex;
}
exports.getPixelBGRHex = getPixelBGRHex;
