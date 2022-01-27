import { Router } from "express";
import userRoutes from "./user.routes";
import cityRoutes from "./city.routes";

const routes = Router();

routes.use(userRoutes);
routes.use(cityRoutes);

export default routes;
