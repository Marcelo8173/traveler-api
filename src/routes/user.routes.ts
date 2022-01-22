import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/users", (request, response) => (
  userController.createNewUser(request, response)
));

export default userRoutes;
