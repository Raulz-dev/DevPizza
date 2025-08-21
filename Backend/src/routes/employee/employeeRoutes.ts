import { Router } from "express";
import * as employeeController from "../../controllers/employeeController";

const employeeRoutes = Router();

employeeRoutes.get("/employees", employeeController.getAllEmployees);
employeeRoutes.get("/employees/:id", employeeController.getEmployeeById);
employeeRoutes.post("/employees", employeeController.createEmployee);
employeeRoutes.put("/employees/:id", employeeController.updateEmployee);
employeeRoutes.delete("/employees/:id", employeeController.deleteEmployee);

export default employeeRoutes;
