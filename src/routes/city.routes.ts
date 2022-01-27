import { Router } from "express";
import CityController from "../controllers/city.controller";
import { ensureAuthentication } from "../middleware/auth.middleware";

const userRoutes = Router();
const cityController = new CityController();

userRoutes.post("/city", ensureAuthentication, (request, response) => (
  cityController.createNewCity(request, response)
));

userRoutes.get("/city", ensureAuthentication, (request, response) => (
  cityController.listAllCities(request, response)
));

export default userRoutes;
