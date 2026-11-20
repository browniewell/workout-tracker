type DayLog = {
  date: string;
  workouts?: Workout[];
  marker?: "rest" | "sick";
};

type Workout = {
  type: "lift" | "ride" | "walk" | "other";
  durationMins: number;
  miles?: number;
  steps?: number;
  volumeLbs?: number;
};

type WorkoutSettings = {
  minWalkDurationMins: number;
  startDate: string;
};

export type { DayLog, Workout, WorkoutSettings };
