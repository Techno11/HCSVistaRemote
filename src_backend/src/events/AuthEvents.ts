import { Socket } from "socket.io";
import ConnectionManager from "../ConnectionManager";

const AuthEvents = (client: Socket, connManager: ConnectionManager, clientAuthString: {code: string}) => {
  const ua = client.request.headers["user-agent"];
  const ip = client.handshake.address;

  // Client can check if they're authed
  client.on('authed', () => {
    client.emit('authed-response', {auth: connManager.isAuthed(clientAuthString.code, ua, ip)});
  });

  // Client can register themselves and request an auth token
  client.on('request-auth', () => {
    if (ua) {
      clientAuthString.code = connManager.requestAuth(ua, ip);
      client.emit('request-auth-response', {ready: true})
    } else {
      client.emit('request-auth-response', {ready: false, error: "Invalid Request"})
    }
  })

  // client submitting their auth toke for verification
  client.on('auth', (code) => {
    if (ua) {
      const authed = connManager.onAuth(code, ua, ip);
      if (authed) {
        clientAuthString.code = code;
        client.emit('auth-response', {auth: true})
      } else {
        client.emit('auth-response', {auth: false, error: "Invalid Code"})
      }
    } else {
      client.emit('auth-response', {auth: false, error: "Invalid Request or Incorrect Key"})
    }
  })
}

export default AuthEvents;