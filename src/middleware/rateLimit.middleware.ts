import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

export const rateLimitUse = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 2,
  keyGenerator(request:Request): string { return request.ip; },
  handler(_, response:Response): Response {
    return response.status(429).json({
      msg: "To many request",
    });
  },
});
