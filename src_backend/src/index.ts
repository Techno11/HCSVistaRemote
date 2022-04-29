import * as http from 'http';
import {Server as SocketServer, Socket} from 'socket.io';
import express, { Application, Request, Response, NextFunction } from 'express';
import ScreenMachine from "./ScreenMachine";
import VistaSerial from "./VistaSerial";
import ConnectionManager from "./ConnectionManager"
import LightBoard from "./constants/LightBoard";
import AuthEvents from "./events/AuthEvents";
import * as path from 'path';
import ControlEvents from './events/ControlEvents';
import SetupEvents from "./events/SetupEvents";

const app = express();

// Send Frontend
app.use(express.static(path.resolve(__dirname, '../public')));
app.use((req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

// HTTP Server Setup
const server = http.createServer(app);

// Socket server setup
const io = new SocketServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['authorization'],
    credentials: true
  }
});

const connManager = new ConnectionManager();
const screenMachine = new ScreenMachine();
const vistaSerial = new VistaSerial();

// Setup Socket Connector
io.on('connection', async (client: Socket) => {
  let clientAuthString = {code: ''};

  // Register authentication events
  AuthEvents(client, connManager, clientAuthString);

  // Register Control Events
  ControlEvents(client, connManager, screenMachine, vistaSerial, clientAuthString);

  // Register Setup Events
  SetupEvents(client, connManager, screenMachine, vistaSerial, clientAuthString);

  client.on('disconnect', () => {
    connManager.onDisconnect(clientAuthString.code);
    client.disconnect();
  });

  client.on('drip', () => {
    client.emit('drop');
  });
});

// Start the HTTP server
const port = process.env.port ?? '8008'

server.listen(port)
server.on('listening', () => {
  console.log(`✔ Server Listening on port ${port}`)
})
