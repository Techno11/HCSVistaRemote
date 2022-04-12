import { SocketContext } from "../providers/SocketProvider";
import { useContext } from "react";

export const useVista = () => {
  return useContext(SocketContext);
};