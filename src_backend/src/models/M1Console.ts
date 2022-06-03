import robot from 'robotjs';
import {getPixelBGR_unsafe, getPixelBGRHex, waitSync} from "../common";

// distance between faders
const horizontalFaderOnCenterDistance = 50;
// distance between banks horizontally
const horizontalFaderBankEndFaderDistance = 100;
// distance between top and bottom banks
const verticalFaderBankOnCenterDistance = 300;
// colors of the center of the fader, from left to right. Hexidecimal, BGR
const centerFaderColors = ["2d2d2f", "2b2a2d", "29292a", "262628", "242326", "222123", "201f22", "1e1e21", "1e1d20", "1e1b1c", "1b1a1d", "1a191b"];
// colors of the center of the "play" button when green. Hexidecimal, BGR
const centerPlayGreen = ["20d038", "2cd139", "29ce36", "2cd138", "21bf31"]
// colors of the center of the "play" button when red. Hexidecimal, BGR
const centerPlayRed = ["3c35ea", "3c35eb", "3932e8", "3c35eb", "342dd7"]
// combined colors for searching
const centerPlayColorAll = [...centerPlayGreen, ...centerPlayRed]
// distance between 100% and the color of the play button
const playButtonOffset = 35
// the "center" of the fader is 3 pixels off from when you middle click to position the fader
const centerFaderVerticalOffset = -3;
// height, in pixels of a fader
const faderHeight = 76;


export default class M1Console implements ConsoleBase {
  public x: number;
  public y: number;

  private faderStates = [
    -1, -1, -1, -1, -1
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
      100, 100, 100, 100, 100
    ]
  }

  /**
   * Sets a fader to a specific rough percent
   * @param fader fader to set, 0-indexed
   */
  private getFaderPos(fader: number): {x: number, y: number} {
    const realX = this.x + (horizontalFaderOnCenterDistance * fader);
    const realY = this.y;
    return {x: realX, y: realY};
  }

  /**
   * Sets a fader to a specific rough percent
   * @param fader fader to set, 0-indexed
   * @param percent percent to set
   */
  public commandFader(fader: number, percent: number) {
    // Check if we have a change
    if(percent === this.faderStates[fader]) return; // no change
    if(percent > 100) percent = 100;
    if(percent < 0) percent = 0;
    // Locate fader position
    const faderPos = this.getFaderPos(fader);

    // Run Fader
    this.runFader(percent, faderPos.x, faderPos.y);
    // Update Fader Position
    this.faderStates[fader] = percent;
  }

  /**
   * Determine if a fader's stack is played or not
   * @param fader fader to set, 0-indexed
   */
  public isFaderPlayed(fader: number): Promise<boolean> {
    return new Promise(async (resolve) => {
      // Locate fader
      const pos = this.getFaderPos(fader);
      console.log("checking fader at ", pos)
      // Get color at location
      const hex = await getPixelBGRHex(pos.x, pos.y - playButtonOffset, 100);
      console.log("read hex", hex)
      // Check if the position is in our array of "played" colors
      if(hex) resolve(centerPlayGreen.includes(hex));
      // If no hex, just return
      resolve(false);
    })
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
    // Search for 100%
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
      const hex = getPixelBGR_unsafe(this.x, this.y + centerFaderVerticalOffset);
      // Check that fader still moved
      if(centerFaderColors.includes(hex)) {
        this.y--;
        searched++;
      } else { // we found it!
        break;
      }
    }
    // Search for center of fader and locate the "color" portion of the play icon
    searched = 0;
    const originalX = this.x;
    while (true) {
      // Prevent endlessly searching for play button
      if(searched > 100) {
        this.x = originalX;
        break;
      }
      // Get Pixel Hex Value
      const hex = getPixelBGR_unsafe(this.x, this.y - playButtonOffset);
      // Check that we haven't found the button yet
      if(!centerPlayColorAll.includes(hex)) {
        // we shouldn't need to move very from where we clicked to find it...
        if(searched > 20) this.x--;
        else this.x++;
        searched++;
      } else { // we found it!
        break;
      }
    }
  }
}