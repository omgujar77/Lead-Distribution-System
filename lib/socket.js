import { Server } from "socket.io";

let io;

export function initSocket(server) {

  if (!global.io) {

    global.io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    global.io.on(
      "connection",
      (socket) => {

        console.log(
          "Client connected:",
          socket.id
        );

        socket.on(
          "disconnect",
          () => {

            console.log(
              "Client disconnected"
            );
          }
        );
      }
    );
  }

  io = global.io;

  return io;
}

export function getIO() {

  return global.io;
}