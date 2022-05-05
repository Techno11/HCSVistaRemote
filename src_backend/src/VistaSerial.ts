// Configure Vista
import {SerialPort} from "serialport";
import CuestackTrigger, {CuestackTriggerMode} from "./models/CuestackTrigger";
import ScreenMachine from "./ScreenMachine";

class VistaSerial {
  private vistaSerial: SerialPort | null = null;
  private ready = false;


  /**
   * Setup a serial connection to Vista
   * @param port comm port of vista
   */
  public setup(port: string): Promise<void> {
    return new Promise((resolve => {
      this.vistaSerial = new SerialPort({
        path: port,
        baudRate: 9600,
        dataBits: 8,
        parity: 'none',
        stopBits: 1,
      })

      this.vistaSerial.on("error", (err) => {
        console.error("Error writing to vista serial port: ", err)
      })

      this.vistaSerial.on("close", () => {
        console.error("Vista serial port closed!")
      })

      this.vistaSerial.on("data", (data) => {
        // console.log("Vista Data: ", data.toString())
      })

      this.vistaSerial.on("open", () => {
        if(this.vistaSerial) this.vistaSerial.write('\n');
        console.log("✔ Vista Serial Ready");
        resolve();
      })

      this.ready = true;
    }))
  }

  /**
   * Run an array of cuestack commands
   * @param commands commands to run
   */
  public go(commands: CuestackTrigger[]) {
    for(const command of commands) {
      const stack = command.cuestack.number;
      if(command.mode === CuestackTriggerMode.PLAY || command.mode === CuestackTriggerMode.ADVANCE) {
        this.goCuestack(stack);
      } else if(command.mode === CuestackTriggerMode.RELEASE) {
        this.releaseCuestack(stack);
      }
    }
  }

  /**
   * Write to vista to run a cuestack
   * @param num
   */
  private goCuestack(num: number) {
    if(this.vistaSerial) this.vistaSerial.write(`go ${num}\n`);
  }

  /**
   * Write to vista to release a cuestack
   * @param num
   */
  private releaseCuestack(num: number) {
    if(this.vistaSerial) this.vistaSerial.write(`release ${num}\n`);
  }

  /**
   * Check if the serial is ready
   */
  public isReady = () => {
    return this.ready;
  }
}

export default VistaSerial;
