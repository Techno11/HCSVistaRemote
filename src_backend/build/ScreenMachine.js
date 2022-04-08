"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.go = exports.ready = exports.setup = void 0;
const E2AConsole_1 = __importDefault(require("./models/E2AConsole"));
const LightBoard_1 = __importStar(require("./constants/LightBoard"));
const common_1 = require("./common");
const iohook = require('iohook');
const prompt = require('prompt-sync')();
let boardType = LightBoard_1.default.HHS;
const consoles = [new E2AConsole_1.default(0, 0),
    new E2AConsole_1.default(0, 0),
    new E2AConsole_1.default(0, 0),
    new E2AConsole_1.default(0, 0)
];
let ready = false;
exports.ready = ready;
let oldFaderMethod = true;
/**
 * setup prompts the user for selecting the faders on the Vista consoles
 * @param board
 */
async function setup(board) {
    // Store Board Type
    boardType = board;
    console.log(`******************************** Setup for the ${LightBoard_1.LightBoardNames[board]} board ********************************`);
    for (let i = 0; i < consoles.length; i++) {
        process.stdout.write(`Please select about the '90%' on the upper-left-most fader of the #${i + 1} console: `);
        consoles[i] = await getClickCoords();
        console.log(`(${consoles[i].x}, ${consoles[i].y})`);
    }
    if (readYN('\nWould you like to reset all faders? y/n', 'g')) {
        process.stdout.write("Please keep your hand off the mouse during this process! Resetting faders in 3... ");
        (0, common_1.waitSync)(1000);
        process.stdout.write("2... ");
        (0, common_1.waitSync)(1000);
        process.stdout.write("1... ");
        (0, common_1.waitSync)(1000);
        process.stdout.write("Resetting... ");
        resetAllFaders();
        console.log('Faders Reset!');
        oldFaderMethod = false;
    }
    else {
        assumeAll100();
        console.log('Assuming all faders are at 100%...');
    }
    console.log(`****************************** End Setup for the ${LightBoard_1.LightBoardNames[board]} board ******************************`);
    exports.ready = ready = true;
}
exports.setup = setup;
/**
 * readYN is a recursive method to read a y or n char from the console
 * @param message Message to print
 * @param oldInput Previous input value
 */
function readYN(message, oldInput) {
    if (oldInput.length < 1)
        return true;
    else if (oldInput !== "y" && oldInput !== "n") {
        const newInput = prompt('Would you like to reset all faders? Y/n');
        return readYN(message, newInput);
    }
    else {
        return oldInput === "y";
    }
}
/**
 * Command all console to assume that we're at 100%, and fallback to the old method of moving faders
 */
function assumeAll100() {
    for (let i = 0; i < consoles.length; i++) {
        consoles[i].assumeAll100();
    }
}
/**
 * Command all consoles to reset their faders to 100%
 */
function resetAllFaders() {
    for (let i = 0; i < consoles.length; i++) {
        consoles[i].resetAllFaders();
    }
}
/**
 * Run an array of commands
 * @param commands Commands to run
 */
function go(commands) {
    for (const command of commands) {
        const board = command.cuestack.console;
        const boardPos = command.cuestack.position;
        const intensity = command.intensity;
        consoles[board].commandFader(boardPos, intensity);
    }
}
exports.go = go;
/**
 * asyncronous function to get the coorinates of a click on the screen
 */
async function getClickCoords() {
    return new Promise((resolve) => {
        iohook.on('mouseclick', (data) => {
            iohook.stop();
            resolve(new E2AConsole_1.default(data.x, data.y));
        });
        iohook.start();
    });
}
