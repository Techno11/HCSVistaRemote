import {io, Socket} from "socket.io-client";
import CuestackTrigger from "../models/CuestackTrigger";
import BuildingBoard from "../models/BuildingBoard";

const rateLimit = 50; // how many MS to wait between sending requests to avoid spamming

export default class VistaSocket {
  private _socket: Socket;
  private _lastReq: number = 0;

  constructor(path: string) {
    this._socket = io(path);
  }

  /**
   * Check if socket is authenticated
   */
  public socketAuthed(): Promise<boolean> {
    return new Promise((resolve => {
      this._socket.on("authed-response", (json: any) => {
        resolve(json.auth);
      });
      this._socket.emit("authed");
    }))
  }

  /**
   * Request an authentication code
   */
  public socketRequestAuth(): Promise<boolean> {
    return new Promise((resolve => {
      this._socket.on("request-auth-response", (json: any) => {
        resolve(json.ready);
      });
      this._socket.emit("request-auth");
    }))
  }

  /**
   * Authenticate socket with Code
   * @param code auth code
   */
  public socketAuth(code: string): Promise<boolean> {
    return new Promise((resolve => {
      this._socket.on("auth-response", (json: any) => {
        resolve(json.auth);
      });
      this._socket.emit("auth", code);
    }))
  }

  /**
   * Command a sequence of cues to execute
   * @param cues cues to execute
   */
  public go(cues: CuestackTrigger[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if(Date.now() - this._lastReq >  rateLimit) {
        this._socket.on("go-response", json => {
          resolve(json.success)
        })
        this._socket.emit("go", cues);
        this._lastReq = Date.now();
      } else {
        reject();
      }
    })
  }

  /**
   * Request the system status
   */
  public status(): Promise<{serial_status: boolean, board_status: boolean}> {
    return new Promise((resolve, reject) => {
      this._socket.on("setup-status-response", json => {
        if(json.success) resolve(json);
        else reject();
      })
      this._socket.emit("setup-status");
    })
  }

  /**
   * Trigger a console setup
   */
  public setupBoard(boardNum: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this._socket.on("setup-board-response", json => {
        if(json.success) resolve();
        else reject(json.error);
      })
      this._socket.emit("setup-board", {board_num: boardNum});
    })
  }

  /**
   * Trigger the calibration
   */
  public calibrateBoards(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._socket.on("config-board-response", json => {
        if(json.success) resolve();
        else reject(json.error);
      })
      this._socket.emit("config-board");
    })
  }

  /**
   * Trigger the serial configuration
   */
  public setupSerial(): Promise<void> {
    return new Promise((resolve, reject) => {
      this._socket.on("setup-serial-response", json => {
        if(json.success) resolve();
        else reject(json.error);
      })
      this._socket.emit("setup-serial");
    })
  }

  /**
   * Send building configuration
   */
  public setBuilding(bldg: BuildingBoard): Promise<void> {
    return new Promise((resolve, reject) => {
      this._socket.on("setup-building-response", json => {
        if(json.success) resolve();
        else reject(json.error);
      })
      this._socket.emit("setup-building", {bldg});
    })
  }

  /**
   * Get building configuration
   */
  public getBuilding(): Promise<BuildingBoard> {
    return new Promise((resolve, reject) => {
      this._socket.on("get-building-response", json => {
        if(json.success) resolve(json.bldg);
        else reject(json.error);
      })
      this._socket.emit("get-building");
    })
  }

  /**
   * Remove all listeners for the board-update event
   */
  public unregisterBoardEvent() {
    this._socket.off("board-update");
  }

  /**
   * Add a listener for the board-update event
   */
  public registerBoardEvent(listener: (args: any) => void) {
    this._socket.on("board-update", listener);
  }
}