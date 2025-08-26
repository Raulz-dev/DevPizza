import { Router } from "express";
import tableRoutes from "./table/tableRoutes";
import employeeRoutes from "./employee/employeeRoutes";
import reservationRoutes from "./Reservation/reservationRoutes";
import categoryRoutes from "./category/categoryRoutes";
import menuItemRoutes from "./menuItem/menuItemRoutes";
import orderRoutes from "./order/orderRoutes";
import paymentRoutes from "./payment/paymentRoutes";
import orderItemRoutes from "./orderItem/orderItemRoutes";

const routes = Router();

routes.use(tableRoutes);
routes.use(employeeRoutes);
routes.use(reservationRoutes);
routes.use(categoryRoutes);
routes.use(menuItemRoutes);
routes.use(orderRoutes);
routes.use(paymentRoutes);
routes.use(orderItemRoutes);

export default routes;
