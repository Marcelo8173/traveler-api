import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const ensureAuthentication = (resquest:Request, response:Response, next:NextFunction) => {
  const authToken = resquest.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      msg: "Token is not provider",
    });
  }

  const [, token] = authToken.split(" ");

  try {
    verify(token, process.env.APP_SECRET || "default");

    return next();
  } catch (error) {
    return response.status(401).json({
      msg: "Token invalid",
    });
  }
};

export { ensureAuthentication };
