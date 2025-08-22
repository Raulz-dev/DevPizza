import { prisma } from "../../lib/prisma";

export async function getOneReservationService(id: number) {
  const reservation = await prisma.reservation.findUnique({
    where: { id },
    include: {
      table: {
        select: {
          id: true,
          number: true,
          status: true,
        },
      },
    },
  });

  if (!reservation) {
    throw new Error("Reserva não encontrada.");
  }

  return reservation;
}
