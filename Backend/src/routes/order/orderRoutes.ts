import { Router } from "express";
import * as orderController from "../../controllers/OrderController";

const orderRoutes = Router();

orderRoutes.get("/orders", orderController.getAllOrders);
orderRoutes.get("/orders/:id", orderController.getOneOrder);
orderRoutes.post("/orders", orderController.createOrder);
orderRoutes.put("/orders/:id", orderController.updateOrder);
orderRoutes.delete("/orders/:id", orderController.deleteOrder);

export default orderRoutes;
