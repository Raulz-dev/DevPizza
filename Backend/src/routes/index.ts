import { Router } from "express";
import tableRoutes from "./table/tableRoutes";
import employeeRoutes from "./employee/employeeRoutes";
import reservationRoutes from "./Reservation/reservationRoutes";

const routes = Router();

routes.use(tableRoutes);
routes.use(employeeRoutes);
routes.use(reservationRoutes);

export default routes;
