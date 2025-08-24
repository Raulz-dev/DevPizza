import { Router } from "express";
import tableRoutes from "./table/tableRoutes";
import employeeRoutes from "./employee/employeeRoutes";
import reservationRoutes from "./Reservation/reservationRoutes";
import categoryRoutes from "./category/categoryRoutes";
import menuItemRoutes from "./menuItem/menuItemRoutes";

const routes = Router();

routes.use(tableRoutes);
routes.use(employeeRoutes);
routes.use(reservationRoutes);
routes.use(categoryRoutes);
routes.use(menuItemRoutes);

export default routes;
