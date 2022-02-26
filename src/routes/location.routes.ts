import { Router } from "express";
import LocationController from "../controllers/location.controller";
import { ensureAuthentication } from "../middleware/auth.middleware";

const userRoutes = Router();
const locationController = new LocationController();

userRoutes.post("/location", ensureAuthentication, (request, response) => (
  locationController.createNewLocation(request, response)
));

userRoutes.get("/location", ensureAuthentication, (request, response) => (
  locationController.listAllLocations(request, response)
));

userRoutes.get("/location/categories", ensureAuthentication, (request, response) => {
  locationController.listAllCategories(request, response);
});

export default userRoutes;
