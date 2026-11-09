type DayLog = {
  date: string;
  workouts?: Workout[];
  isRest?: boolean;
  isSick?: boolean;
};

type Workout = {
  type: "lift" | "ride" | "walk" | "other";
  durationMins: number;
  miles?: number;
  steps?: number;
  volumeLbs?: number;
};

type WorkoutSettings = {
  walkMinDurationMins: number;
};

export type { DayLog, Workout, WorkoutSettings };
