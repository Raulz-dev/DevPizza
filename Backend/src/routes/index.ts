import { Router } from "express";
import tableRoutes from "./table/tableRoutes";
import employeeRoutes from "./employee/employeeRoutes";

const routes = Router();

routes.use(tableRoutes);
routes.use(employeeRoutes);

export default routes;
