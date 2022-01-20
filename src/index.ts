/* eslint-disable no-console */
import express, { json } from "express";
import routes from "./routes";

const server = express();

server.use(json());
server.use(routes);
server.listen(8080, () => {
  console.log("api is running in port 8080");
});
