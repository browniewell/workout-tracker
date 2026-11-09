import type { DayLog, Workout, WorkoutSettings } from "./dayLog.js";
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
const nonzeroDurationMessage = "Workout duration must be greater than zero";

const qualifyingWorkout: Workout = {
  type: "lift",
  durationMins: 25,
};

const workoutSettings: WorkoutSettings = {
  walkMinDurationMins: 20,
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
    expect(getStatus(workoutDayLog, today, workoutSettings)).toEqual(
      "Complete",
    );
  });
  it("Returns completed status with multiple workouts", () => {
    expect(
      getStatus(
        { ...workoutDayLog, workouts: [qualifyingWorkout, qualifyingWorkout] },
        today,
        workoutSettings,
      ),
    ).toEqual("Complete");
  });
  it("Returns Pending for non qualifying walk today", () => {
    expect(
      getStatus(
        { ...workoutDayLog, workouts: [{ type: "walk", durationMins: 19 }] },
        today,
        workoutSettings,
      ),
    ).toEqual("Pending");
  });
  it("Returns Missed for non qualifying walk yesterday", () => {
    expect(
      getStatus(
        {
          ...workoutDayLog,
          date: yesterday,
          workouts: [{ type: "walk", durationMins: 19 }],
        },
        today,
        workoutSettings,
      ),
    ).toEqual("Missed");
  });
  it("Returns Complete for walk duration equal to minimum", () => {
    expect(
      getStatus(
        { ...workoutDayLog, workouts: [{ type: "walk", durationMins: 20 }] },
        today,
        workoutSettings,
      ),
    ).toEqual("Complete");
  });
  it("Throws error for lift with no duration", () => {
    expect(() =>
      getStatus(
        {
          ...workoutDayLog,
          workouts: [{ type: "lift", durationMins: 0 }],
        },
        today,
        workoutSettings,
      ),
    ).toThrow(nonzeroDurationMessage);
  });
  it("Throws error for ride with no duration", () => {
    expect(() =>
      getStatus(
        {
          ...workoutDayLog,
          workouts: [{ type: "ride", durationMins: 0 }],
        },
        today,
        workoutSettings,
      ),
    ).toThrow(nonzeroDurationMessage);
  });
  it("Throws error for other with no duration", () => {
    expect(() =>
      getStatus(
        {
          ...workoutDayLog,
          workouts: [{ type: "other", durationMins: 0 }],
        },
        today,
        workoutSettings,
      ),
    ).toThrow(nonzeroDurationMessage);
  });
  it("Throws error for negative duration", () => {
    expect(() =>
      getStatus(
        {
          ...workoutDayLog,
          workouts: [{ type: "lift", durationMins: -5 }],
        },
        today,
        workoutSettings,
      ),
    ).toThrow(nonzeroDurationMessage);
  });
  it("Returns Complete for lift with any duration", () => {
    expect(
      getStatus(
        {
          ...workoutDayLog,
          workouts: [{ type: "lift", durationMins: 1 }],
        },
        today,
        workoutSettings,
      ),
    ).toEqual("Complete");
  });
  it("Returns Complete for ride with any duration", () => {
    expect(
      getStatus(
        {
          ...workoutDayLog,
          workouts: [{ type: "ride", durationMins: 1 }],
        },
        today,
        workoutSettings,
      ),
    ).toEqual("Complete");
  });
  it("Returns Complete for other with any duration", () => {
    expect(
      getStatus(
        {
          ...workoutDayLog,
          workouts: [{ type: "other", durationMins: 1 }],
        },
        today,
        workoutSettings,
      ),
    ).toEqual("Complete");
  });

  it("Returns Complete for lift with any duration and non qualifying walk", () => {
    expect(
      getStatus(
        {
          ...workoutDayLog,
          workouts: [
            { type: "lift", durationMins: 1 },
            { type: "walk", durationMins: 5 },
          ],
        },
        today,
        workoutSettings,
      ),
    ).toEqual("Complete");
  });
  it("Returns Complete for non qualifying walk and lift with any duration", () => {
    expect(
      getStatus(
        {
          ...workoutDayLog,
          workouts: [
            { type: "walk", durationMins: 5 },
            { type: "lift", durationMins: 1 },
          ],
        },
        today,
        workoutSettings,
      ),
    ).toEqual("Complete");
  });
  // TODO: At some point we may need to reject invalid duration values, even if they come after a qualifying workout
  it("Returns Complete for lift with any duration and invalid walk duration", () => {
    expect(
      getStatus(
        {
          ...workoutDayLog,
          workouts: [
            { type: "lift", durationMins: 1 },
            { type: "walk", durationMins: 0 },
          ],
        },
        today,
        workoutSettings,
      ),
    ).toEqual("Complete");
  });
  it("Returns Rest for non qualifying walk and rest day", () => {
    expect(
      getStatus(
        {
          ...workoutDayLog,
          workouts: [{ type: "walk", durationMins: 5 }],
          isRest: true,
        },
        today,
        workoutSettings,
      ),
    ).toEqual("Rest");
  });
  it("Returns Sick for non qualifying walk and sick day", () => {
    expect(
      getStatus(
        {
          ...workoutDayLog,
          workouts: [{ type: "walk", durationMins: 5 }],
          isSick: true,
        },
        today,
        workoutSettings,
      ),
    ).toEqual("Sick");
  });

  it("Returns Pending if log is empty and it is today", () => {
    expect(getStatus(emptyDayLog, today, workoutSettings)).toEqual("Pending");
  });
  it("Returns Missed if yesterday's log is empty ", () => {
    expect(
      getStatus({ ...emptyDayLog, date: yesterday }, today, workoutSettings),
    ).toEqual("Missed");
  });
  it("Returns Rest if log specifies rest day", () => {
    expect(
      getStatus({ ...emptyDayLog, isRest: true }, today, workoutSettings),
    ).toEqual("Rest");
  });
  it("Returns Rest if log specifies rest day in the past", () => {
    expect(
      getStatus(
        { ...emptyDayLog, isRest: true, date: yesterday },
        today,
        workoutSettings,
      ),
    ).toEqual("Rest");
  });
  it("Returns Sick if log specifies sick day", () => {
    expect(
      getStatus({ ...emptyDayLog, isSick: true }, today, workoutSettings),
    ).toEqual("Sick");
  });
  it("Returns Sick if log specifies sick day in the past", () => {
    expect(
      getStatus(
        { ...emptyDayLog, isSick: true, date: yesterday },
        today,
        workoutSettings,
      ),
    ).toEqual("Sick");
  });
  it("Returns Complete if rest day and workout done", () => {
    expect(
      getStatus({ ...workoutDayLog, isRest: true }, today, workoutSettings),
    ).toEqual("Complete");
  });
  it("Returns Complete if sick day and workout done", () => {
    expect(
      getStatus({ ...workoutDayLog, isSick: true }, today, workoutSettings),
    ).toEqual("Complete");
  });
  it("Returns Pending if date is in the future", () => {
    expect(
      getStatus({ ...emptyDayLog, date: tomorrow }, today, workoutSettings),
    ).toEqual("Pending");
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
