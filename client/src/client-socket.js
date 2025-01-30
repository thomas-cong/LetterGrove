import socketIOClient from "socket.io-client";
import { post } from "./utilities";
const endpoint = window.location.hostname + ":" + window.location.port;
const socket = socketIOClient(endpoint);

socket.on("connect", () => {
  post("/api/initsocket", { socketid: socket.id });
});

let disconnectHandler = null;

socket.on("disconnect", () => {
  if (disconnectHandler) {
    disconnectHandler();
  }
});

export { socket };

// Function to set the disconnect handler from components
export const setDisconnectHandler = (handler) => {
  disconnectHandler = handler;
};