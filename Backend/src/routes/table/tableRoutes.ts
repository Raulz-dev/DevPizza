import { Router } from "express";
import * as tableController from "../../controllers/tableController";

const tableRoutes = Router();

tableRoutes.get("/tables", tableController.getAllTables);

tableRoutes.get("/tables/:id", tableController.getOneTable);

tableRoutes.post("/tables", tableController.createTables);

tableRoutes.put("/tables/:id", tableController.updateTable);

tableRoutes.delete("/tables/:id", tableController.deleteTable);

export default tableRoutes;
