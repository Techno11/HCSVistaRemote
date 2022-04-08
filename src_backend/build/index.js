"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const socket_io_1 = require("socket.io");
const express_1 = __importDefault(require("express"));
const ScreenMachine = __importStar(require("./ScreenMachine"));
const VistaSerial = __importStar(require("./VistaSerial"));
const ConnectionManager = __importStar(require("./ConnectionManager"));
const LightBoard_1 = __importDefault(require("./constants/LightBoard"));
const app = (0, express_1.default)();
/* middleware */
const server = http.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['authorization'],
        credentials: true
    }
});
// Setup Socket Connector
io.on('connection', async (client) => {
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
        client.emit('authed-response', { auth: authed });
    });
    // Client can register themselves and request an auth token
    client.on('request-auth', () => {
        const ua = client.request.headers["user-agent"];
        if (ua) {
            clientAuthString = ConnectionManager.auth(ua);
            client.emit('request-auth-response', { ready: true });
        }
        else {
            client.emit('request-auth-response', { ready: false, error: "Invalid Request" });
        }
    });
    // client submitting their auth toke for verification
    client.on('auth', (code) => {
        const ua = client.request.headers["user-agent"];
        if (ua) {
            authed = ConnectionManager.connect(code, ua);
            if (authed) {
                client.emit('auth-response', { auth: true });
            }
            else {
                client.emit('auth-response', { auth: false, error: "Invalid Code" });
            }
        }
        else {
            client.emit('auth-response', { auth: false, error: "Invalid Request" });
        }
    });
    client.on('go', (raw) => {
        if (!authed) {
            client.emit('go-response', { success: false, error: "Not Authorized" });
            return;
        }
        if (!ScreenMachine.ready) {
            client.emit('go-response', { success: false, error: "Not Ready" });
        }
        else {
            // Parse JSON
            try {
                const cues = JSON.parse(raw);
                if (Array.isArray(cues)) {
                    // Set consoles
                    ScreenMachine.go(cues);
                    // Once the consoles are set, we can tell vista to go
                    VistaSerial.go(cues);
                    // Emit Successful
                    client.emit('go-response', { success: true });
                }
                else {
                    client.emit('go-response', { success: false, error: "Invalid Data" });
                }
            }
            catch (_a) {
                client.emit('go-response', { success: false, error: "Unparsable Data" });
            }
        }
    });
    /* handle any room setups on connections, or listen for another message (like an indetify message) and do it there instead*/
});
// Setup Clicker
ScreenMachine.setup(LightBoard_1.default.HHS).then(() => {
    var _a;
    // Setup Vista Serial Interface
    VistaSerial.setup("COM9");
    // Once the Lightboard is configured, start the HTTP server
    const port = (_a = process.env.port) !== null && _a !== void 0 ? _a : '8008';
    server.listen(port);
    server.on('listening', () => {
        console.log(`✔ Server Listening on port ${port}`);
    });
});
