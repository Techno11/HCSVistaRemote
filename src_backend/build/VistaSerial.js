"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.go = exports.setup = void 0;
// Configure Vista
const serialport_1 = require("serialport");
const CuestackTrigger_1 = require("./models/CuestackTrigger");
let vistaSerial;
/**
 * Setup a serial connection to Vista
 * @param port comm port of vista
 */
function setup(port) {
    vistaSerial = new serialport_1.SerialPort({
        path: port,
        baudRate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
    });
    vistaSerial.on("error", (err) => {
        console.error("Error writing to vista serial port: ", err);
    });
    vistaSerial.on("close", () => {
        console.error("Vista serial port closed!");
    });
    vistaSerial.on("data", (data) => {
        // console.error("Vista Data: ", data.toString())
    });
    vistaSerial.on("open", () => {
        vistaSerial.write('\n');
        console.log("✔ Vista Serial Ready");
    });
}
exports.setup = setup;
/**
 * Run an array of cuestack commands
 * @param commands commands to run
 */
function go(commands) {
    for (const command of commands) {
        const stack = command.cuestack.number;
        if (command.mode === CuestackTrigger_1.CuestackTriggerMode.PLAY) {
            goCuestack(stack);
        }
        else if (command.mode === CuestackTrigger_1.CuestackTriggerMode.RELEASE) {
            releaseCuestack(stack);
        }
    }
}
exports.go = go;
/**
 * Write to vista to run a cuestack
 * @param num
 */
function goCuestack(num) {
    vistaSerial.write(`go ${num}\n`);
}
/**
 * Write to vista to release a cuestack
 * @param num
 */
function releaseCuestack(num) {
    vistaSerial.write(`release ${num}\n`);
}
