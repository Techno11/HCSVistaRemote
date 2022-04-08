// Configure Vista
import {SerialPort} from "serialport";
import CuestackTrigger, {CuestackTriggerMode} from "./models/CuestackTrigger";

let vistaSerial: SerialPort;

/**
 * Setup a serial connection to Vista
 * @param port comm port of vista
 */
function setup(port: string) {
  vistaSerial = new SerialPort({
    path: port,
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
  })

  vistaSerial.on("error", (err) => {
    console.error("Error writing to vista serial port: ", err)
  })

  vistaSerial.on("close", () => {
    console.error("Vista serial port closed!")
  })

  vistaSerial.on("data", (data) => {
    // console.error("Vista Data: ", data.toString())
  })

  vistaSerial.on("open", () => {
    vistaSerial.write('\n');
    console.log("✔ Vista Serial Ready");
  })
}

/**
 * Run an array of cuestack commands
 * @param commands commands to run
 */
function go(commands: CuestackTrigger[]) {
  for(const command of commands) {
    const stack = command.cuestack.number;
    if(command.mode === CuestackTriggerMode.PLAY) {
      goCuestack(stack);
    } else if(command.mode === CuestackTriggerMode.RELEASE) {
      releaseCuestack(stack);
    }
  }
}

/**
 * Write to vista to run a cuestack
 * @param num
 */
function goCuestack(num: number) {
  vistaSerial.write(`go ${num}\n`);
}

/**
 * Write to vista to release a cuestack
 * @param num
 */
function releaseCuestack(num: number) {
  vistaSerial.write(`release ${num}\n`);
}

export {setup, go}