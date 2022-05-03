import { Socket } from "socket.io";
import ConnectionManager from "../ConnectionManager";
import ScreenMachine from "../ScreenMachine";
import VistaSerial from "../VistaSerial";
import LightBoard from "../models/LightBoard";

const SetupEvents = (client: Socket, connManager: ConnectionManager, screenMachine: ScreenMachine, vistaSerial: VistaSerial, clientAuthString: {code: string}) => {
  const ua = client.request.headers["user-agent"];
  const ip = client.handshake.address;

  client.on('setup-status', () => {
    if (!connManager.isAuthed(clientAuthString.code, ua, ip)) {
      client.emit('setup-status-response', {success: false, error: "Not Authorized"})
      return;
    }

    client.emit('setup-status-response', {success: true, serial_status: vistaSerial.isReady(), board_status: screenMachine.isReady()});
  })

  client.on('setup-board', (data: {board_num: 0 | 1 | 2 | 3}) => {
    if (!connManager.isAuthed(clientAuthString.code, ua, ip)) {
      client.emit('setup-board-response', {success: false, error: "Not Authorized"})
      return;
    }

    // Can't re-setup a board
    if(screenMachine.isReady()){
      client.emit('setup-board-response', {success: false, error: "Board already setup"});
      return;
    }

    if(typeof data.board_num !== "number") {
      client.emit('setup-board-response', {success: false, error: "Invalid Board Number"});
      return;
    } else {
      if(data.board_num < 0 || data.board_num > 3) {
        client.emit('setup-board-response', {success: false, error: "Invalid Board Number"});
        return;
      } else {
        screenMachine.setupIndvBoard(data.board_num).then(() => {
          client.emit('setup-board-response', {success: true});
        });
      }
    }
  })

  client.on('config-board', () => {
    if (!connManager.isAuthed(clientAuthString.code, ua, ip)) {
      client.emit('config-board-response', {success: false, error: "Not Authorized"})
      return;
    }

    // Can't re-setup a board
    if(!screenMachine.allBoardsLocated()){
      client.emit('config-board-response', {success: false, error: "Not all boards located"});
    } else {
      screenMachine.setupPreLocated();
      client.emit('config-board-response', {success: true});
    }
  })

  client.on('setup-serial', () => {
    if (!connManager.isAuthed(clientAuthString.code, ua, ip)) {
      client.emit('setup-serial-response', {success: false, error: "Not Authorized"})
      return;
    }

    // Can't re-setup a board
    if(vistaSerial.isReady()){
      client.emit('setup-serial-response', {success: false, error: "Board already setup"});
      return;
    }

    // Com9 is the default
    vistaSerial.setup("COM9").then(() => {
      client.emit('setup-serial-response', {success: true});
    });
  })

  client.on('setup-building', ({bldg}: {bldg: LightBoard}) => {
    if (!connManager.isAuthed(clientAuthString.code, ua, ip)) {
      client.emit('setup-building-response', {success: false, error: "Not Authorized"})
      return;
    }

    screenMachine.setBoard(bldg);
    client.emit('setup-building-response', {success: true, bldg})
  })

  client.on('get-building', () => {
    if (!connManager.isAuthed(clientAuthString.code, ua, ip)) {
      client.emit('get-building-response', {success: false, error: "Not Authorized"})
      return;
    }

    client.emit('get-building-response', {success: true, bldg: screenMachine.getBoard()})
  })
}

export default SetupEvents;