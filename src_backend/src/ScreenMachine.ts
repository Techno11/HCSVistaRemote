import E2AConsole from "./models/E2AConsole";
import LightBoard, {LightBoardNames} from "./constants/LightBoard";
import CuestackTrigger from "./models/CuestackTrigger";
import {waitSync} from "./common";
import iohook from "iohook"
const prompt = require('prompt-sync')();


class ScreenMachine {
  private boardType = LightBoard.HHS;
  private consoles = [
    new E2AConsole(0, 0), // Cyc, Stage LEDs
    new E2AConsole(0, 0), // Additional Cyc
    new E2AConsole(0, 0),
    new E2AConsole(0, 0)
  ]

  private boardsLocated = [
    false, false, false, false
  ]

  private ready = false;
  private oldFaderMethod = true;


  /**
   * legacy console setup. not used anymore
   * prompts the user for selecting the faders on the Vista consoles
   * @param board
   */
  public async setup(board: LightBoard) {
    // Store Board Type
    this.boardType = board;
    console.log(`******************************** Setup for the ${LightBoardNames[board]} board ********************************`)
    for(let i = 0; i < this.consoles.length; i++) {
      process.stdout.write(`Please select about the '90%' on the upper-left-most fader of the #${i + 1} console: `);
      this.consoles[i] = await this.getClickCoords();
      console.log(`(${this.consoles[i].x}, ${this.consoles[i].y})`)
    }

    if(this.readYN('\nWould you like to reset all faders? y/n', 'g')) {
      process.stdout.write("Please keep your hand off the mouse during this process! Resetting faders in 3... ");
      waitSync(1000);
      process.stdout.write("2... ")
      waitSync(1000);
      process.stdout.write("1... ")
      waitSync(1000);
      process.stdout.write("Resetting... ")
      this.resetAllFaders();
      console.log('Faders Reset!')
      this.oldFaderMethod = false;
    } else {
      this.assumeAll100();
      console.log('Assuming all faders are at 100%...')
    }
    console.log(`****************************** End Setup for the ${LightBoardNames[board]} board ******************************`)
    this.ready = true;
  }


  /**
   * Find the 100% mark on our pre-located boards
   */
  public setupPreLocated() {
    this.resetAllFaders();
    this.ready = true;
  }

  /**
   * setupIndvBoard queries the user for a position
   * @param boardNum Board to setup
   */
  public async setupIndvBoard(boardNum: 0 | 1 | 2 | 3) {
    this.consoles[boardNum] = await this.getClickCoords();
    this.boardsLocated[boardNum] = true;
  }

  /**
   * Check if all boards have been located
   */
  public allBoardsLocated(): boolean {
    return this.boardsLocated.reduce((a, b) => a && b);
  }

  /**
   * readYN is a recursive method to read a y or n char from the console
   * @param message Message to print
   * @param oldInput Previous input value
   */
  private readYN(message: string, oldInput: string): boolean {
    if(oldInput.length < 1) return true;
    else if(oldInput !== "y" && oldInput !== "n") {
      const newInput = prompt('Would you like to reset all faders? Y/n');
      return this.readYN(message, newInput);
    } else {
      return oldInput === "y";
    }
  }

  /**
   * Command all console to assume that we're at 100%, and fallback to the old method of moving faders
   */
  private assumeAll100() {
    for(let i = 0; i < this.consoles.length; i++) {
      this.consoles[i].assumeAll100();
    }
  }

  /**
   * Command all consoles to reset their faders to 100%
   */
  private resetAllFaders() {
    for(let i = 0; i < this.consoles.length; i++) {
      this.consoles[i].resetAllFaders();
    }
  }

  /**
   * Run an array of commands
   * @param commands Commands to run
   */
  public go(commands: CuestackTrigger[]) {
    for(const command of commands) {
      const board = command.cuestack.console - 1;
      const boardPos = command.cuestack.position;
      const intensity = command.intensity;
      this.consoles[board].commandFader(boardPos, intensity);
    }
  }

  /**
   * asyncronous function to get the coorinates of a click on the screen
   */
  private async getClickCoords(): Promise<E2AConsole> {
    return new Promise<E2AConsole>((resolve) => {
      iohook.on('mouseclick', (data: {button: number, clicks: number, x: number, y: number, type: string}) => {
        iohook.stop();
        resolve(new E2AConsole(data.x, data.y));
      })
      iohook.start();
    })
  }

  /**
   * Returns if we're ready to fire
   */
  public isReady() {
    return this.ready;
  }
}

export default ScreenMachine;