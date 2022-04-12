import React from "react";
import { useEffect, useState, createContext, ReactChild } from "react";
import VistaSocket from "../common/VistaSocket";

const ws = new VistaSocket(location.hostname + ":8008");

export const SocketContext = createContext(ws);

interface ISocketProvider {
  children: ReactChild;
}

export const SocketProvider = (props: ISocketProvider) => (
  <SocketContext.Provider value={ws}>{props.children}</SocketContext.Provider>
);