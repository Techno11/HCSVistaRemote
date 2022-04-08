import E2AConsole from "./models/E2AConsole";
import LightBoard, {LightBoardNames} from "./constants/LightBoard";
import robot from 'robotjs';
import CuestackTrigger from "./models/CuestackTrigger";
import {waitSync} from "./common";
const iohook = require('iohook');
const prompt = require('prompt-sync')();

let boardType = LightBoard.HHS;
const consoles = [ new E2AConsole(0, 0), // Cyc, Stage LEDs
                    new E2AConsole(0, 0), // Additional Cyc
                    new E2AConsole(0, 0),
                    new E2AConsole(0, 0)
                  ]

let ready = false;
let oldFaderMethod = true;

/**
 * setup prompts the user for selecting the faders on the Vista consoles
 * @param board
 */
async function setup(board: LightBoard) {
  // Store Board Type
  boardType = board;
  console.log(`******************************** Setup for the ${LightBoardNames[board]} board ********************************`)
  for(let i = 0; i < consoles.length; i++) {
    process.stdout.write(`Please select about the '90%' on the upper-left-most fader of the #${i + 1} console: `);
    consoles[i] = await getClickCoords();
    console.log(`(${consoles[i].x}, ${consoles[i].y})`)
  }

  if(readYN('\nWould you like to reset all faders? y/n', 'g')) {
    process.stdout.write("Please keep your hand off the mouse during this process! Resetting faders in 3... ");
    waitSync(1000);
    process.stdout.write("2... ")
    waitSync(1000);
    process.stdout.write("1... ")
    waitSync(1000);
    process.stdout.write("Resetting... ")
    resetAllFaders();
    console.log('Faders Reset!')
    oldFaderMethod = false;
  } else {
    assumeAll100();
    console.log('Assuming all faders are at 100%...')
  }
  console.log(`****************************** End Setup for the ${LightBoardNames[board]} board ******************************`)
  ready = true;
}

/**
 * readYN is a recursive method to read a y or n char from the console
 * @param message Message to print
 * @param oldInput Previous input value
 */
function readYN(message: string, oldInput: string): boolean {
  if(oldInput.length < 1) return true;
  else if(oldInput !== "y" && oldInput !== "n") {
    const newInput = prompt('Would you like to reset all faders? Y/n');
    return readYN(message, newInput);
  } else {
    return oldInput === "y";
  }
}

/**
 * Command all console to assume that we're at 100%, and fallback to the old method of moving faders
 */
function assumeAll100() {
  for(let i = 0; i < consoles.length; i++) {
    consoles[i].assumeAll100();
  }
}

/**
 * Command all consoles to reset their faders to 100%
 */
function resetAllFaders() {
  for(let i = 0; i < consoles.length; i++) {
    consoles[i].resetAllFaders();
  }
}

/**
 * Run an array of commands
 * @param commands Commands to run
 */
function go(commands: CuestackTrigger[]) {
  for(const command of commands) {
    const board = command.cuestack.console;
    const boardPos = command.cuestack.position;
    const intensity = command.intensity;
    consoles[board].commandFader(boardPos, intensity);
  }
}

/**
 * asyncronous function to get the coorinates of a click on the screen
 */
async function getClickCoords(): Promise<E2AConsole> {
  return new Promise<E2AConsole>((resolve) => {
    iohook.on('mouseclick', (data: {button: number, clicks: number, x: number, y: number, type: string}) => {
      iohook.stop();
      resolve(new E2AConsole(data.x, data.y));
    })
    iohook.start();
  })
}

export {
  setup,
  ready,
  go
}