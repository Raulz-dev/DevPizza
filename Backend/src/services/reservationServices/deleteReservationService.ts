import { prisma } from "../../lib/prisma";

export async function deleteReservationService(id: number) {
  const exists = await prisma.reservation.findUnique({ where: { id } });
  if (!exists) {
    throw new Error("Reserva não encontrada.");
  }

  const deleted = await prisma.reservation.delete({
    where: { id },
  });

  return deleted;
}
