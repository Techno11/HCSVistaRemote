import {io, Socket} from "socket.io-client";
import CuestackTrigger from "../models/CuestackTrigger";

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

  public socketGo(cues: CuestackTrigger[]): Promise<boolean> {
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
}