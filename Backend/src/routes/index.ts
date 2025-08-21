import { Router } from "express";
import tableRoutes from "./table/tableRoutes";

const routes = Router();

routes.use(tableRoutes);

export default routes;
