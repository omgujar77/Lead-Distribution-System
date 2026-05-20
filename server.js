import next from "next";

import http from "http";

import { initSocket } from "./lib/socket.js";


const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });

const handler = app.getRequestHandler();

const port = 3000;


app.prepare().then(() => {

  const server = http.createServer(
    (req, res) => {
      handler(req, res);
    }
  );

  initSocket(server);

  server.listen(port, () => {

    console.log(
      `> Ready on http://localhost:${port}`
    );
  });
});