import type { DayLog } from "./dayLog.js";

type Status = "Complete" | "Rest" | "Sick" | "Missed" | "Pending";

type StreakStatus = "On Track" | "At Risk" | "Broken";

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

function getStreak(
  tminus2: Status | undefined,
  tminus1: Status | undefined,
  t: Status,
): StreakStatus {
  if (t === "Complete" || t === "Rest" || t === "Sick") {
    return "On Track";
  }
  if (tminus1 !== "Missed" && t === "Pending") {
    return "On Track";
  }
  if (tminus2 !== "Missed" && tminus1 === "Missed" && t === "Pending") {
    return "At Risk";
  }
  return "Broken";
}

export { getStatus, getStreak };
export type { Status, StreakStatus };
