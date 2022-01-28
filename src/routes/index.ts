import { Router } from "express";
import userRoutes from "./user.routes";
import cityRoutes from "./city.routes";
import locationRoutes from "./location.routes";

const routes = Router();

routes.use(userRoutes);
routes.use(cityRoutes);
routes.use(locationRoutes);

export default routes;
