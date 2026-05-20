"use client";

import { io } from "socket.io-client";

let socket;

export const getSocket = () => {

  if (!socket) {

    socket = io({
      path: "/socket.io",
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log(
        "Socket Connected:",
        socket.id
      );
    });

    socket.on("disconnect", () => {
      console.log("Socket Disconnected");
    });
  }

  return socket;
};