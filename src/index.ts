/* eslint-disable no-console */
import express, { json } from "express";
import routes from "./routes";
import "reflect-metadata";
import "./config/database/connection";
import { rateLimitUse } from "./middleware/rateLimit.middleware";

const server = express();

server.use(json());
server.use(rateLimitUse);
server.use(routes);
server.listen(8080, () => {
  console.log("api is running in port 8080");
});
