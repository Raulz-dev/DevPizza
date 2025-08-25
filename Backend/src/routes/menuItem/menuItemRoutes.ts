import { Router } from "express";
import * as menuItemController from "../../controllers/MenuItemController";

const menuItemRoutes = Router();

menuItemRoutes.get("/menuItems", menuItemController.getAllMenuItems);
menuItemRoutes.get("/menuItems/:id", menuItemController.getMenuItemById);
menuItemRoutes.post("/menuItems", menuItemController.createMenuItem);
menuItemRoutes.put("/menuItems/:id", menuItemController.updateMenuItem);
menuItemRoutes.delete("/menuItems/:id", menuItemController.deleteMenuItem);

export default menuItemRoutes;
