// Connection manager is a primative memory database that manages how many connections once connection code can have

import {Socket} from "socket.io";

interface ClientAuth {
  authenticated: boolean,
  user_agent: string,
  ip: string,
  timeout: NodeJS.Timeout,
  socket?: Socket
}

class ConnectionManager {


  private connections = {} as {[key: string]: ClientAuth};

  /**
   * Disconnect marks a user as disconnected
   * @param code code to disconnect
   */
  public onDisconnect(code: string) {
    if(this.connections[code]) {
      this.connections[code].timeout = setTimeout(() => {
        delete this.connections[code];
      }, 1000 * 60 * 60);
    }
  }

  /**
   * Checks if the connection code is active already, and check if we're clear to authenticate
   * @param code Connection code
   * @param userAgent Connection user agent
   * @param ip Connection ip address
   * @param client Socket of authenticating user
   */
  public onAuth(code: string, userAgent: string, ip: string, client: Socket): boolean {
    if(this.connections[code] && this.connections[code].user_agent === userAgent && this.connections[code].ip === ip) {
      // Mark Connection as connected
      this.connections[code].authenticated = true;
      // Update Socket
      this.connections[code].socket = client;
      // Clear Timeout
      if(this.connections[code].timeout) clearTimeout(this.connections[code].timeout);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Generate an authorization code for a new connection
   * @param userAgent Connection user agent
   * @param ip Connection ip address
   */
  public requestAuth(userAgent: string, ip: string): string {
    const newCode = this.getConnectionCode();
    console.log(`New Connection, Authorization Code is '${newCode}'. Code is active for 30 seconds!`)
    this.connections[newCode] = {
      authenticated: false,
      user_agent: userAgent,
      ip: ip,

      // Clear auth token if not used in 30 seconds
      timeout: setTimeout(() => {
        console.log(`Authorization Code ${newCode} not used in time. Clearing...`)
        delete this.connections[newCode];
      }, 30 * 1000)
    }
    return newCode;
  }

  /**
   * Returns is code is authorized or not
   * @param code code to check
   * @param ua user agent of requesting user
   * @param ip ip address of requesting user
   */
  public isAuthed(code: string, ua: string | undefined, ip: string | undefined) {
    return this.connections[code] && this.connections[code].ip === ip && this.connections[code].user_agent === ua && this.connections[code].authenticated;
  }

  /**
   * getConnectionCode randomly generates a connection code
   */
  private getConnectionCode(): string {
    const chars = "0123456789";
    let out = "";
    for(let i = 0; i < 6; i++) {
      // Select a random character from our array of characters
      out += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return out;
  }

  /**
   * Emit a payload to all authed clients
   * @param event Event key
   * @param payload Payload to send
   * @param exclude A socket ID to exclude
   */
  public emitToAuthedClients(event: string, payload?: any, exclude?: string) {
    for(const key in this.connections) {
      // Has Own Property Check
      if(!this.connections.hasOwnProperty(key)) continue;
      // Introduce shorthand
      const currentConn = this.connections[key];
      // If we have no socket, we cannot emit
      if(!currentConn.socket) continue;
      // if this ID is excluded, we don't emit
      if(exclude &&  currentConn.socket.id === exclude) continue;
      // emit event
      currentConn.socket.emit(event, payload);
    }
  }
}

export default ConnectionManager;