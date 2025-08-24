import { Router } from "express";
import * as menuItemController from "../../controllers/MenuItemController";

const menuItemRoutes = Router();

menuItemRoutes.get("/menu-items", menuItemController.getAllMenuItems);
menuItemRoutes.get("/menu-items/:id", menuItemController.getMenuItemById);
menuItemRoutes.post("/menu-items", menuItemController.createMenuItem);
menuItemRoutes.put("/menu-items/:id", menuItemController.updateMenuItem);
menuItemRoutes.delete("/menu-items/:id", menuItemController.deleteMenuItem);

export default menuItemRoutes;
