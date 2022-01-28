import { Router } from "express";
import LocationController from "../controllers/location.controller";
import { ensureAuthentication } from "../middleware/auth.middleware";

const userRoutes = Router();
const locationController = new LocationController();

userRoutes.post("/location", ensureAuthentication, (request, response) => (
  locationController.createNewLocation(request, response)
));

export default userRoutes;
