import { Router } from "express";
import * as reservationController from "../../controllers/ReservationController/index";

const reservationRoutes = Router();

reservationRoutes.get(
  "/reservations",
  reservationController.getAllReservations
);

reservationRoutes.get(
  "/reservations/:id",
  reservationController.getOneReservation
);

reservationRoutes.post(
  "/reservations",
  reservationController.createReservation
);

reservationRoutes.put(
  "/reservations/:id",
  reservationController.updateReservation
);

reservationRoutes.delete(
  "/reservations/:id",
  reservationController.deleteReservation
);

export default reservationRoutes;
