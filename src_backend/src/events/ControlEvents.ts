import { Socket } from "socket.io";
import ConnectionManager from "../ConnectionManager";
import ScreenMachine from "../ScreenMachine";
import VistaSerial from "../VistaSerial";

const ControlEvents = (client: Socket, connManager: ConnectionManager, screenMachine: ScreenMachine, vistaSerial: VistaSerial, clientAuthString: {code: string}) => {
  const ua = client.request.headers["user-agent"];
  const ip = client.handshake.address;

  client.on('go', (cues: string) => {
    if (!connManager.isAuthed(clientAuthString.code, ua, ip)) {
      client.emit('go-response', {success: false, error: "Not Authorized"})
      return;
    }
    if (!screenMachine.isReady()) {
      client.emit('go-response', {success: false, error: "Not Ready"})
    } else {
      if (Array.isArray(cues)) {
        // Set consoles
        screenMachine.go(cues);
        // Once the consoles are set, we can tell vista to go
        vistaSerial.go(cues);
        // Emit Successful
        client.emit('go-response', {success: true})
        // Emit this event to the rest of our clients (and exclude the emitter)
        connManager.emitToAuthedClients("board-update", cues, client.id);
        // Store Board State
        connManager.updateBoard(cues);
      } else {
        client.emit('go-response', {success: false, error: "Invalid Data"})
      }
    }
  });

  client.on('get-board-state', () => {
    if (!connManager.isAuthed(clientAuthString.code, ua, ip)) {
      client.emit('get-board-state-response', {success: false, error: "Not Authorized"})
      return;
    }
    // Emit board state back to client
    client.emit("get-board-state-response", {success: true, state: connManager.getBoardState()});
  })
}

export default ControlEvents;