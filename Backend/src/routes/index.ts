import { Router } from "express";
import tableRoutes from "./table/tableRoutes";
import employeeRoutes from "./employee/employeeRoutes";
import reservationRoutes from "./Reservation/reservationRoutes";
import categoryRoutes from "./category/categoryRoutes";
import menuItemRoutes from "./menuItem/menuItemRoutes";
import orderRoutes from "./order/orderRoutes";
import paymentRoutes from "./payment/paymentRoutes";
import orderItemRoutes from "./orderItem/orderItemRoutes";
import authRoutes from "./auth/authRoutes";
import { authMiddleware, requireRole } from "../middleware/authToken";

const routes = Router();

routes.use(authRoutes);

routes.use(authMiddleware);

routes.use(tableRoutes);
routes.use(reservationRoutes);
routes.use(categoryRoutes);
routes.use(menuItemRoutes);
routes.use(orderRoutes);
routes.use(paymentRoutes);
routes.use(orderItemRoutes);
routes.use(requireRole("MANAGER"), employeeRoutes);

export default routes;
