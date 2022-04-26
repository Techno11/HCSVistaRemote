import * as http from 'http';
import {Server as SocketServer, Socket} from 'socket.io';
import express from 'express';
import * as ScreenMachine from "./ScreenMachine";
import * as VistaSerial from "./VistaSerial";
import * as ConnectionManager from "./ConnectionManager"
import LightBoard from "./constants/LightBoard";

const app = express();
/* middleware */
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['authorization'],
    credentials: true
  }
});

// Setup Socket Connector
io.on('connection', async (client: Socket) => {
  let clientAuthString = {code: ''};
  const ua = client.request.headers["user-agent"];
  const ip = client.handshake.address;

  client.on('disconnect', () => {
    ConnectionManager.onDisconnect(clientAuthString.code);
    client.disconnect();
  });

  client.on('drip', () => {
    client.emit('drop');
  });

  // Client can check if they're authed
  client.on('authed', () => {
    client.emit('authed-response', {auth: ConnectionManager.isAuthed(clientAuthString.code, ua, ip)});
  });

  // Client can register themselves and request an auth token
  client.on('request-auth', () => {
    if (ua) {
      clientAuthString.code = ConnectionManager.requestAuth(ua, ip);
      client.emit('request-auth-response', {ready: true})
    } else {
      client.emit('request-auth-response', {ready: false, error: "Invalid Request"})
    }
  })

  // client submitting their auth toke for verification
  client.on('auth', (code) => {
    if (ua) {
      const authed = ConnectionManager.onAuth(code, ua, ip);
      if (authed) {
        client.emit('auth-response', {auth: true})
      } else {
        client.emit('auth-response', {auth: false, error: "Invalid Code"})
      }
    } else {
      client.emit('auth-response', {auth: false, error: "Invalid Request or Incorrect Key"})
    }
  })

  client.on('go', (cues: string) => {
    if (!ConnectionManager.isAuthed(clientAuthString.code, ua, ip)) {
      client.emit('go-response', {success: false, error: "Not Authorized"})
      return;
    }
    if (!ScreenMachine.ready) {
      client.emit('go-response', {success: false, error: "Not Ready"})
    } else {
      if (Array.isArray(cues)) {
        // Set consoles
        ScreenMachine.go(cues);
        // Once the consoles are set, we can tell vista to go
        VistaSerial.go(cues);
        // Emit Successful
        client.emit('go-response', {success: true})
      } else {
        client.emit('go-response', {success: false, error: "Invalid Data"})
      }
    }
  })
  /* handle any room setups on connections, or listen for another message (like an indetify message) and do it there instead*/
});

// Setup Clicker
ScreenMachine.setup(LightBoard.HHS).then(() => {

  // Setup Vista Serial Interface
  VistaSerial.setup("COM9");

  // Once the Lightboard is configured, start the HTTP server
  const port = process.env.port ?? '8008'

  server.listen(port)
  server.on('listening', () => {
    console.log(`✔ Server Listening on port ${port}`)
  })

});

