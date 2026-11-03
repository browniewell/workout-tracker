import type { DayLog } from "./dayLog.js";

type Status = "Complete" | "Rest" | "Sick" | "Missed" | "Pending";

function getStatus(log: DayLog, today: string): Status {
  if ((log.workouts?.length ?? 0) > 0) {
    return "Complete";
  }
  if (log.isRest) {
    return "Rest";
  }
  if (log.isSick) {
    return "Sick";
  }

  if (log.date >= today) {
    return "Pending";
  }

  return "Missed";
}

export { getStatus };
export type { Status };
