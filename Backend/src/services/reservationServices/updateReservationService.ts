import { conflictWindow } from "../../helper/conflictWindow";
import { prisma } from "../../lib/prisma";
import { UpdateReservationDTO } from "../../schema/reservationSchema";

export async function updateReservationService(
  id: number,
  data: UpdateReservationDTO
) {
  const current = await prisma.reservation.findUnique({ where: { id } });
  if (!current) {
    throw new Error("Reserva não encontrada.");
  }

  const nextTableId = data.tableId ?? current.tableId;
  const nextReservedFor = data.reservedFor
    ? new Date(data.reservedFor)
    : current.reservedFor;

  if (isNaN(nextReservedFor.getTime())) {
    throw new Error("Data/hora inválida para 'reservedFor'. Use ISO-8601.");
  }

  if (data.tableId) {
    const table = await prisma.table.findUnique({
      where: { id: data.tableId },
    });
    if (!table) throw new Error("Mesa não encontrada.");
    if (table.status === "BLOCKED")
      throw new Error("Mesa bloqueada para reservas.");
  }

  const { start, end } = conflictWindow(nextReservedFor);
  const conflict = await prisma.reservation.findFirst({
    where: {
      id: { not: id },
      tableId: nextTableId,
      reservedFor: { gte: start, lte: end },
    },
  });
  if (conflict) {
    throw new Error("Já existe reserva para a mesa nesse intervalo.");
  }

  const updated = await prisma.reservation.update({
    where: { id },
    data: {
      tableId: data.tableId,
      customerName: data.customerName,
      phone: data.phone,
      reservedFor: data.reservedFor ? nextReservedFor : undefined,
    },
  });

  return updated;
}
