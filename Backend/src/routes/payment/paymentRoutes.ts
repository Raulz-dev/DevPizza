import { Router } from "express";
import * as paymentController from "../../controllers/PaymentController";

const paymentRoutes = Router();

paymentRoutes.get("/payments", paymentController.getAllPayments);
paymentRoutes.get("/payments/:id", paymentController.getOnePayment);
paymentRoutes.post("/payments", paymentController.createPayment);
paymentRoutes.put("/payments/:id", paymentController.updatePayment);
paymentRoutes.delete("/payments/:id", paymentController.deletePayment);

export default paymentRoutes;
