import {Socket} from "socket.io-client";

/**
 * Check if socket is authenticated
 * @param socket
 */
function socketAuthed(socket: Socket): Promise<boolean> {
  return new Promise((resolve => {
    socket.on("authed-response", (json: any) => {
      resolve(json.auth);
    });
    socket.emit("authed");
  }))
}

/**
 * Request an authentication code
 * @param socket
 */
function socketRequestAuth(socket: Socket): Promise<boolean> {
  return new Promise((resolve => {
    socket.on("request-auth-response", (json: any) => {
      resolve(json.ready);
    });
    socket.emit("request-auth");
  }))
}

/**
 * Authenticate socket with Code
 * @param socket
 * @param code auth code
 */
function socketAuth(socket: Socket, code: string): Promise<boolean> {
  return new Promise((resolve => {
    socket.on("auth-response", (json: any) => {
      resolve(json.auth);
    });
    socket.emit("auth", code);
  }))
}

export {socketAuthed, socketRequestAuth, socketAuth}