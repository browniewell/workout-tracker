import type { DayLog, Workout } from "./dayLog.js";
import {
  getStatus,
  getStreak,
  type Status,
  type StreakStatus,
} from "./status.js";
import { describe, it, expect } from "vitest";

const today = "2026-11-01";
const yesterday = "2026-10-31";
const tomorrow = "2026-11-02";

const qualifyingWorkout: Workout = {
  type: "lift",
};

const workoutDayLog: DayLog = {
  date: today,
  workouts: [qualifyingWorkout],
};

const emptyDayLog: DayLog = {
  date: today,
};

describe("getStatus", () => {
  it("Returns completed status with one workout", () => {
    expect(getStatus(workoutDayLog, today)).toEqual("Complete");
  });
  it("Returns completed status with multiple workouts", () => {
    expect(
      getStatus(
        { ...workoutDayLog, workouts: [qualifyingWorkout, qualifyingWorkout] },
        today,
      ),
    ).toEqual("Complete");
  });
  it("Returns Pending if log is empty and it is today", () => {
    expect(getStatus(emptyDayLog, today)).toEqual("Pending");
  });
  it("Returns Missed if yesterday's log is empty ", () => {
    expect(getStatus({ ...emptyDayLog, date: yesterday }, today)).toEqual(
      "Missed",
    );
  });
  it("Returns Rest if log specifies rest day", () => {
    expect(getStatus({ ...emptyDayLog, isRest: true }, today)).toEqual("Rest");
  });
  it("Returns Rest if log specifies rest day in the past", () => {
    expect(
      getStatus({ ...emptyDayLog, isRest: true, date: yesterday }, today),
    ).toEqual("Rest");
  });
  it("Returns Sick if log specifies sick day", () => {
    expect(getStatus({ ...emptyDayLog, isSick: true }, today)).toEqual("Sick");
  });
  it("Returns Sick if log specifies sick day in the past", () => {
    expect(
      getStatus({ ...emptyDayLog, isSick: true, date: yesterday }, today),
    ).toEqual("Sick");
  });
  it("Returns Complete if rest day and workout done", () => {
    expect(getStatus({ ...workoutDayLog, isRest: true }, today)).toEqual(
      "Complete",
    );
  });
  it("Returns Complete if sick day and workout done", () => {
    expect(getStatus({ ...workoutDayLog, isSick: true }, today)).toEqual(
      "Complete",
    );
  });
  it("Returns Pending if date is in the future", () => {
    expect(getStatus({ ...emptyDayLog, date: tomorrow }, today)).toEqual(
      "Pending",
    );
  });
});

describe("getStreak", () => {
  it.each<[Status, Status, Status, StreakStatus]>([
    ["Complete", "Complete", "Complete", "On Track"],
    ["Missed", "Missed", "Complete", "On Track"],
    ["Missed", "Missed", "Rest", "On Track"],
    ["Missed", "Missed", "Sick", "On Track"],
    ["Missed", "Rest", "Pending", "On Track"],
    ["Missed", "Sick", "Pending", "On Track"],
    ["Complete", "Missed", "Pending", "At Risk"],
    ["Missed", "Missed", "Pending", "Broken"],
  ])(
    `Get streak status for %s - %s - %s = %s => %s`,
    (tminus2, tminus1, t, result) => {
      expect(getStreak(tminus2, tminus1, t)).toEqual(result);
    },
  );
  it("Handle undefined tminus2", () => {
    expect(getStreak(undefined, "Missed", "Pending")).toEqual("At Risk");
  });
  it("Handle undefined tminus2 and tminus1", () => {
    expect(getStreak(undefined, undefined, "Pending")).toEqual("On Track");
  });
});
