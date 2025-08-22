
const RESERVATION_WINDOW_MINUTES = Number(
  process.env.RESERVATION_WINDOW_MINUTES ?? 90
);
export function conflictWindow(date: Date) {
  const start = new Date(date);
  const end = new Date(date);
  start.setMinutes(start.getMinutes() - RESERVATION_WINDOW_MINUTES);
  end.setMinutes(end.getMinutes() + RESERVATION_WINDOW_MINUTES);
  return { start, end };
}