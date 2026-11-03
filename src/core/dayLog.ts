type DayLog = {
  date: string;
  workouts?: Workout[];
  isRest?: boolean;
  isSick?: boolean;
};

type Workout = {
  type: "lift" | "ride" | "walk" | "other";
  duration?: number;
  miles?: number;
  steps?: number;
  volume?: number;
};

export type { DayLog, Workout };
