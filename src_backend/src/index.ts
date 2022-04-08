import * as http from 'http';
import {Server as SocketServer, Socket} from 'socket.io';
import express from 'express';
import * as ScreenMachine from "./ScreenMachine";
import * as VistaSerial from "./VistaSerial";
import * as ConnectionManager from "./ConnectionManager"
import LightBoard from "./constants/LightBoard";
import CuestackTrigger from "./models/CuestackTrigger";

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
  let clientAuthString = "";
  let authed = false;

  client.on('disconnect', () => {
    client.disconnect();
  });

  client.on('drip', () => {
    client.emit('drop');
  });

  // Client can check if they're authed
  client.on('authed', () => {
    client.emit('authed-response', {auth: authed});
  });

  // Client can register themselves and request an auth token
  client.on('request-auth', () => {
    const ua = client.request.headers["user-agent"];
    if(ua) {
      clientAuthString = ConnectionManager.auth(ua);
      client.emit('request-auth-response', {ready: true})
    } else {
      client.emit('request-auth-response', {ready: false, error: "Invalid Request"})
    }
  })

  // client submitting their auth toke for verification
  client.on('auth', (code) => {
    const ua = client.request.headers["user-agent"];
    if(ua) {
      authed = ConnectionManager.connect(code, ua);
      if(authed) {
        client.emit('auth-response', {auth: true})
      } else {
        client.emit('auth-response', {auth: false, error: "Invalid Code"})
      }
    } else {
      client.emit('auth-response', {auth: false, error: "Invalid Request"})
    }
  })

  client.on('go', (raw: string) => {
    if(!authed) {
      client.emit('go-response', {success: false, error: "Not Authorized"})
      return;
    }
    if(!ScreenMachine.ready) {
      client.emit('go-response', {success: false, error: "Not Ready"})
    } else {
      // Parse JSON
      try {
        const cues = JSON.parse(raw);
        if(Array.isArray(cues)) {
          // Set consoles
          ScreenMachine.go(cues);
          // Once the consoles are set, we can tell vista to go
          VistaSerial.go(cues);
          // Emit Successful
          client.emit('go-response', {success: true})
        } else {
          client.emit('go-response', {success: false, error: "Invalid Data"})
        }
      } catch {
        client.emit('go-response', {success: false, error: "Unparsable Data"})
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

