import E2AConsole from "./models/E2AConsole";
import LightBoard from "./models/LightBoard";
import CuestackTrigger, {CuestackTriggerMode} from "./models/CuestackTrigger";
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
      // Check if the fader is played already and if the commanded mode is play. If so, set mode to intensity only
      // Currently the scren pixel reader likes to lock up. This is bad, this we will forego this functionality for now
      // if(await this.consoles[board].isFaderPlayed(boardPos) && command.mode === CuestackTriggerMode.PLAY) {
      //   command.mode = CuestackTriggerMode.INTENSITY;
      // }
    }
  }

  /**
   * Run an array of commands
   * @param board board to check
   * @param position position to check
   */
  public isPlayed(board: number, position: number) {
    this.consoles[board].isFaderPlayed(position);
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

  /**
   * Set what building/board we're working with
   * @param bldg building
   */
  public setBoard(bldg: LightBoard) {
    this.boardType = bldg;
  }

  /**
   * Get what building/board we're working with
   */
  public getBoard(): LightBoard {
    return this.boardType;
  }
}

export default ScreenMachine;