import { Router } from "express";
import * as categoryController from "../../controllers/CategoryController";

const categoryRoutes = Router();

categoryRoutes.get("/categories", categoryController.getAllCategories);
categoryRoutes.get("/categories/:id", categoryController.getCategoryById);
categoryRoutes.post("/categories", categoryController.createCategory);
categoryRoutes.put("/categories/:id", categoryController.updateCategory);
categoryRoutes.delete("/categories/:id", categoryController.deleteCategory);

export default categoryRoutes;
