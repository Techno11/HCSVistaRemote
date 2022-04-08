"use strict";
// Connection manager is a primative memory database that manages how many connections once connection code can have
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.disconnect = exports.connect = void 0;
// TODO: clean up old auths?
const connections = {};
/**
 * Disconnect marks a user as disconnected
 * @param code code to disconnect
 */
function disconnect(code) {
    connections[code].connected = false;
    connections[code].timeout = setTimeout(() => {
        console.log("A client has disconnected. Their code will be clear in 1 hour!");
        delete connections[code];
    }, 60 * 60 * 1000);
}
exports.disconnect = disconnect;
/**
 * Connect checks if the connection code is active already, and check if we're clear to connect
 * @param code Connection code
 * @param userAgent Connection user agent
 */
function connect(code, userAgent) {
    if (connections[code] && !connections[code].connected && connections[code].user_agent === userAgent) {
        // Mark Connection as connected
        connections[code].connected = true;
        // Clear Timeout
        if (connections[code].timeout)
            clearTimeout(connections[code].timeout);
        return true;
    }
    else {
        return false;
    }
}
exports.connect = connect;
/**
 * Auth generates an authorization code for a new connection
 * @param userAgent Connection user agent
 */
function auth(userAgent) {
    const newCode = getConnectionCode();
    console.log(`New Connection, Authorization Code is '${newCode}'. Code is active for 30 seconds!`);
    connections[newCode] = {
        connected: false,
        user_agent: userAgent,
        // Clear auth token if not used in 30 seconds
        timeout: setTimeout(() => {
            console.log(`Authorization Code ${newCode} not used in time. Clearing...`);
            delete connections[newCode];
        }, 30 * 1000)
    };
    return newCode;
}
exports.auth = auth;
/**
 * getConnectionCode randomly generates a connection code
 */
function getConnectionCode() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
    let out = "";
    for (let i = 0; i < 6; i++) {
        // Select a random character from our array of characters
        out += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    return out;
}
