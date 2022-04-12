// Connection manager is a primative memory database that manages how many connections once connection code can have

interface ClientAuth {
  authenticated: boolean,
  user_agent: string,
  ip: string,
  timeout: NodeJS.Timeout,
}

const connections = {} as {[key: string]: ClientAuth};

/**
 * Disconnect marks a user as disconnected
 * @param code code to disconnect
 */
function onDisconnect(code: string) {
  if(connections[code]) {
    connections[code].timeout = setTimeout(() => {
      delete connections[code];
    }, 1000 * 60 * 60);
  }
}

/**
 * Checks if the connection code is active already, and check if we're clear to authenticate
 * @param code Connection code
 * @param userAgent Connection user agent
 * @param ip Connection ip address
 */
function onAuth(code: string, userAgent: string, ip: string): boolean {
  if(connections[code] && connections[code].user_agent === userAgent && connections[code].ip === ip) {
    // Mark Connection as connected
    connections[code].authenticated = true;
    // Clear Timeout
    if(connections[code].timeout) clearTimeout(connections[code].timeout);
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
function requestAuth(userAgent: string, ip: string): string {
  const newCode = getConnectionCode();
  console.log(`New Connection, Authorization Code is '${newCode}'. Code is active for 30 seconds!`)
  connections[newCode] = {
    authenticated: false,
    user_agent: userAgent,
    ip: ip,

    // Clear auth token if not used in 30 seconds
    timeout: setTimeout(() => {
      console.log(`Authorization Code ${newCode} not used in time. Clearing...`)
      delete connections[newCode];
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
function isAuthed(code: string, ua: string | undefined, ip: string | undefined) {
  return connections[code] && connections[code].ip === ip && connections[code].user_agent === ua && connections[code].authenticated;
}

/**
 * getConnectionCode randomly generates a connection code
 */
function getConnectionCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
  let out = "";
  for(let i = 0; i < 6; i++) {
    // Select a random character from our array of characters
    out += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return out;
}

export {
  requestAuth,
  onDisconnect,
  onAuth,
  isAuthed
}