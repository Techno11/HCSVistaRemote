"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const robotjs_1 = __importDefault(require("robotjs"));
const common_1 = require("../common");
// distance between faders
const horizontalFaderOnCenterDistance = 50;
// distance between banks horizontally
const horizontalFaderBankEndFaderDistance = 100;
// distance between top and bottle banks
const verticalFaderBankOnCenterDistance = 300;
// colors of the center of the fader, from left to right. Hexidecimal, BGR
const centerFaderColors = ["2d2d2f", "2b2a2d", "29292a", "262628", "242326", "222123", "201f22", "1e1e21", "1e1d20", "1e1b1c", "1b1a1d", "1a191b"];
// the "center" of the fader is 3 pixels off from when you middle click to position the fader
const centerFaderVerticalOffset = -3;
// height, in pixels of a fader
const faderHeight = 76;
class E2AConsole {
    constructor(x, y) {
        this.faderStates = [
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        ];
        this.x = x;
        this.y = y;
    }
    /**
     * Set all fader states to 100%
     */
    assumeAll100() {
        this.faderStates = [
            100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
            100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        ];
    }
    /**
     * Sets a fader to a specific rough percent
     * @param fader fader to set, 0-indexed
     * @param percent percent to set
     */
    commandFader(fader, percent) {
        // Record mouse starting position
        const startPos = robotjs_1.default.getMousePos();
        // Check if we have a change
        if (percent === this.faderStates[fader])
            return; // no change
        if (percent > 100)
            percent = 100;
        if (percent < 0)
            percent = 0;
        let realX, realY;
        if (fader < 5) {
            realX = this.x + (horizontalFaderOnCenterDistance * fader);
            realY = this.y;
        }
        else if (fader < 10) {
            realX = this.x + (horizontalFaderOnCenterDistance * (fader - 1)) + horizontalFaderBankEndFaderDistance;
            realY = this.y;
        }
        else if (fader < 15) {
            realX = this.x + (horizontalFaderOnCenterDistance * (fader - 10));
            realY = this.y + verticalFaderBankOnCenterDistance;
        }
        else {
            realX = this.x + (horizontalFaderOnCenterDistance * (fader - 11)) + horizontalFaderBankEndFaderDistance;
            realY = this.y + verticalFaderBankOnCenterDistance;
        }
        // Run Fader
        this.runFader(percent, realX, realY);
        // Update Fader Position
        this.faderStates[fader] = percent;
        // Reset position to start position
        robotjs_1.default.moveMouse(startPos.x, startPos.y);
    }
    /**
     * Calculate and run a fader to a position
     * @param percent percentage
     * @param x x location of fader
     * @param y y location of fader
     * @private
     */
    runFader(percent, x, y) {
        // y is the '100' percent location of the fader
        const pos = faderHeight - Math.round(faderHeight * (percent / 100));
        robotjs_1.default.moveMouse(x, y + pos); // This moves the mouse to the '100' percent mark
        robotjs_1.default.mouseClick("middle");
    }
    /**
     * Calculate and run a fader to a position
     * @param oldPercent old percentage
     * @param newPercent new percentage
     * @param x x location of fader
     * @param y y location of fader
     * @private
     */
    runFaderOld(oldPercent, newPercent, x, y) {
        robotjs_1.default.moveMouse(x, y);
        robotjs_1.default.mouseClick('right');
        // 0-100 can be compleated in 255 up/down movements, so we convert everything to that
        const oldArrow = 255 * (oldPercent / 100);
        const newArrow = 255 * (newPercent / 100);
        // Calculate delta
        const delta = Math.abs(oldArrow - newArrow);
        const slow = delta % 26;
        const quick = ((delta - slow) / 255) * 26;
        if (newArrow > oldArrow) {
            for (let i = 0; i < quick; i++)
                robotjs_1.default.keyTap('pageup');
            for (let i = 0; i < slow; i++)
                robotjs_1.default.keyTap('up');
        }
        else {
            for (let i = 0; i < quick; i++)
                robotjs_1.default.keyTap('pagedown');
            for (let i = 0; i < slow; i++)
                robotjs_1.default.keyTap('down');
        }
    }
    /**
     * Reset All Faders to 100
     */
    resetAllFaders() {
        this.find100();
        for (let i = 0; i < this.faderStates.length; i++) {
            this.commandFader(i, 100);
        }
    }
    /**
     * Find 100% Position for a console
     */
    find100() {
        let searched = 0;
        while (true) {
            // Prevent endlessly searching for fader if we've searched the entire height of a fader
            // if(searched > faderHeight) break;
            // Move mouse to new position
            robotjs_1.default.moveMouse(this.x, this.y);
            // Middle click to make fader jump there
            robotjs_1.default.mouseClick("middle");
            // Wait for fader to render
            (0, common_1.waitSync)(25);
            // Get Pixel Hex Value
            const hex = (0, common_1.getPixelBGRHex)(this.x, this.y + centerFaderVerticalOffset);
            // Check that fader still moved
            if (centerFaderColors.includes(hex)) {
                this.y--;
                searched++;
            }
            else {
                break;
            }
        }
        if (searched < faderHeight) {
            // If we get here, assume we found the top!
            robotjs_1.default.moveMouse(this.x, this.y + faderHeight);
            robotjs_1.default.mouseClick("middle");
        }
        else {
            console.log('Failed to setup console, couldn\'t find 100%');
        }
    }
}
exports.default = E2AConsole;
