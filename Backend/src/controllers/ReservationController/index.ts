import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { createReservationService } from "../../services/reservationServices/createReservationService";
import { deleteReservationService } from "../../services/reservationServices/deleteReservationService";
import { getOneReservationService } from "../../services/reservationServices/getOneReservationService";
import { updateReservationService } from "../../services/reservationServices/updateReservationService";
import {
  createReservationSchema,
  updateReservationSchema,
} from "../../schema/reservationSchema";

export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await prisma.reservation.findMany();
    return res.status(200).json(reservations);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao buscar reservas!" });
  }
};

export const createReservation = async (req: Request, res: Response) => {
  try {
    const validation = createReservationSchema.safeParse({ body: req.body });
    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }

    const reservation = await createReservationService(validation.data.body);

    return res.status(201).json(reservation);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao criar reserva!" });
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const reservation = await deleteReservationService(+id);

    return res.status(200).json(reservation);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao deletar reserva!" });
  }
};

export const getOneReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const reservation = await getOneReservationService(+id);

    return res.status(200).json(reservation);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao achar reserva!" });
  }
};

export const updateReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const validation = updateReservationSchema.safeParse({
      params: { id },
      body: req.body,
    });

    if (!validation.success) {
      return res.status(400).json({ error: validation.error.format() });
    }

    const reservation = await updateReservationService(
      +id,
      validation.data.body
    );

    return res.status(200).json(reservation);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Erro ao atualizar reserva!" });
  }
};
