import { conflictWindow } from "../../helper/conflictWindow";
import { prisma } from "../../lib/prisma";
import { CreateReservationDTO } from "../../schema/reservationSchema";

export async function createReservationService(data: CreateReservationDTO) {
  const reservedFor = new Date(data.reservedFor);
  if (isNaN(reservedFor.getTime())) {
    throw new Error("Data/hora inválida para reserva");
  }

  const table = await prisma.table.findUnique({ where: { id: data.tableId } });
  if (!table) throw new Error("Mesa não encontrada.");
  if (table.status === "BLOCKED")
    throw new Error("Mesa bloqueada para reservas.");

  const { start, end } = conflictWindow(reservedFor);

  const conflict = await prisma.reservation.findFirst({
    where: {
      tableId: data.tableId,
      reservedFor: { gte: start, lte: end },
    },
  });

  if (conflict)
    throw new Error("Já existe reserva para a mesa nesse intervalo.");

  const reservation = prisma.reservation.create({
    data: {
      tableId: data.tableId,
      customerName: data.customerName,
      phone: data.phone,
      reservedFor,
    },
  });
  return reservation;
}
