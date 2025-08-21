
import { Router } from "express";
import {
  getAllTables,
  getOneTable,
  createTables,
  updateTable,
  deleteTable,
} from "../../controllers/tableController";

const tableRoutes = Router();

tableRoutes.get("/tables", getAllTables);
tableRoutes.get("/tables/:id", getOneTable);
tableRoutes.post("/tables", createTables);
tableRoutes.put("/tables/:id", updateTable);
tableRoutes.delete("/tables/:id", deleteTable);

export default tableRoutes;
