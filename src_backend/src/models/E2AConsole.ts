import robot from 'robotjs';
import {getPixelBGRHex, waitSync} from "../common";

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
  public x: number;
  public y: number;

  private faderStates = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  ]

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Set all fader states to 100%
   */
  public assumeAll100() {
    this.faderStates = [
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
    ]
  }

  /**
   * Sets a fader to a specific rough percent
   * @param fader fader to set, 0-indexed
   * @param percent percent to set
   */
  public commandFader(fader: number, percent: number) {
    // Record mouse starting position
    const startPos = robot.getMousePos();
    // Check if we have a change
    if(percent === this.faderStates[fader]) return; // no change
    if(percent > 100) percent = 100;
    if(percent < 0) percent = 0;
    let realX: number, realY: number;
    if(fader < 5) {
      realX = this.x + (horizontalFaderOnCenterDistance * fader);
      realY = this.y;
    } else if (fader < 10) {
      realX = this.x + (horizontalFaderOnCenterDistance * (fader - 1)) + horizontalFaderBankEndFaderDistance;
      realY = this.y;
    } else if (fader < 15) {
      realX = this.x + (horizontalFaderOnCenterDistance * (fader - 10));
      realY = this.y + verticalFaderBankOnCenterDistance;
    } else {
      realX = this.x + (horizontalFaderOnCenterDistance * (fader - 11)) + horizontalFaderBankEndFaderDistance;
      realY = this.y + verticalFaderBankOnCenterDistance;
    }
    // Run Fader
    this.runFader(percent, realX, realY);
    // Update Fader Position
    this.faderStates[fader] = percent;
    // Reset position to start position
    robot.moveMouse(startPos.x, startPos.y);
  }

  /**
   * Calculate and run a fader to a position
   * @param percent percentage
   * @param x x location of fader
   * @param y y location of fader
   * @private
   */
  private runFader(percent: number, x: number, y: number) {
    // y is the '100' percent location of the fader
    const pos = faderHeight - Math.round(faderHeight * (percent/100));
    robot.moveMouse(x, y + pos); // This moves the mouse to the '100' percent mark
    robot.mouseClick("middle");
  }

  /**
   * Calculate and run a fader to a position
   * @param oldPercent old percentage
   * @param newPercent new percentage
   * @param x x location of fader
   * @param y y location of fader
   * @private
   */
  private runFaderOld(oldPercent: number, newPercent: number, x: number, y: number) {
    robot.moveMouse(x, y);
    robot.mouseClick('right');
    // 0-100 can be compleated in 255 up/down movements, so we convert everything to that
    const oldArrow = 255 * (oldPercent/100);
    const newArrow = 255 * (newPercent/100);
    // Calculate delta
    const delta = Math.abs(oldArrow - newArrow);
    const slow = delta % 26;
    const quick = ((delta - slow) / 255) * 26;
    if(newArrow > oldArrow) {
      for(let i = 0; i < quick; i++) robot.keyTap('pageup');
      for(let i = 0; i < slow; i++) robot.keyTap('up');
    } else {
      for(let i = 0; i < quick; i++) robot.keyTap('pagedown');
      for(let i = 0; i < slow; i++) robot.keyTap('down');
    }
  }

  /**
   * Reset All Faders to 100
   */
  public resetAllFaders() {
    this.find100();
    for(let i = 0; i < this.faderStates.length; i++) {
      this.commandFader(i, 100);
    }
  }

  /**
   * Find 100% Position for a console
   */
  private find100() {
    let searched = 0;
    while (true) {
      // Prevent endlessly searching for fader if we've searched the entire height of a fader
      // if(searched > faderHeight) break;
      // Move mouse to new position
      robot.moveMouse(this.x, this.y);
      // Middle click to make fader jump there
      robot.mouseClick("middle");
      // Wait for fader to render
      waitSync(25);
      // Get Pixel Hex Value
      const hex = getPixelBGRHex(this.x, this.y + centerFaderVerticalOffset);
      // Check that fader still moved
      if(centerFaderColors.includes(hex)) {
        this.y--;
        searched++;
      } else {
        break;
      }
    }
    if(searched < faderHeight) {
      // If we get here, assume we found the top!
      robot.moveMouse(this.x, this.y + faderHeight);
      robot.mouseClick("middle");
    } else {
      console.log('Failed to setup console, couldn\'t find 100%')
    }
  }
}

export default E2AConsole;