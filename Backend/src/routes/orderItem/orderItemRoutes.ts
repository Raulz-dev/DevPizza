import { Router } from "express";
import * as orderItemController from "../../controllers/orderItem";

const orderItemRoutes = Router();

orderItemRoutes.get("/order-items", orderItemController.getAllOrderItems);
orderItemRoutes.get("/order-items/:id", orderItemController.getOneOrderItem);
orderItemRoutes.post("/order-items", orderItemController.createOrderItem);
orderItemRoutes.put("/order-items/:id", orderItemController.updateOrderItem);
orderItemRoutes.delete("/order-items/:id", orderItemController.deleteOrderItem);

export default orderItemRoutes;
