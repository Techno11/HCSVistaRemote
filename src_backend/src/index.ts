import * as http from 'http';
import {Server as SocketServer, Socket} from 'socket.io';
import express, { Request, Response } from 'express';
import ScreenMachine from "./ScreenMachine";
import VistaSerial from "./VistaSerial";
import ConnectionManager from "./ConnectionManager"
import AuthEvents from "./events/AuthEvents";
import * as path from 'path';
import ControlEvents from './events/ControlEvents';
import SetupEvents from "./events/SetupEvents";
import Os from "os";

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

  client.on('drip', () => {
    client.emit('drop');
  });
});

// Start the HTTP server
const port = process.env.port ?? '8008'

// Get network interfaces
const nics = Os.networkInterfaces();

server.listen(port)
server.on('listening', () => {
  console.log(`✔ HTTP Server Running. Available at:`)
  for(const key in nics) {
    // @ts-ignore
    if(nics.hasOwnProperty(key) && nics[key] && nics[key][0] && nics[key][0].family === "IPv4") {
      // @ts-ignore
      console.log(`${key}: http://${nics[key][0].address }:${port}`)
    }
  }
})
