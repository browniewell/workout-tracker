import { eq } from "drizzle-orm";
import type { Workout } from "../../core/dayLog";
import type { Db } from "./client";
import { workouts } from "./schema";

async function addWorkout(db: Db, workout: Workout, date: string) {
  const result = await db.insert(workouts).values({
    date: date,
    type: workout.type,
    durationMins: workout.durationMins,
    miles: workout.miles,
    steps: workout.steps,
    volumeLbs: workout.volumeLbs,
  });
  return result.lastInsertRowid;
}

async function updateWorkout(
  db: Db,
  id: number,
  workout: Workout,
  date: string,
) {
  const result = await db
    .update(workouts)
    .set({
      date: date,
      type: workout.type,
      durationMins: workout.durationMins,
      miles: workout.miles === undefined ? null : workout.miles,
      steps: workout.steps === undefined ? null : workout.steps,
      volumeLbs: workout.volumeLbs === undefined ? null : workout.volumeLbs,
    })
    .where(eq(workouts.id, id));

  return result.changes;
}

async function deleteWorkout(db: Db, id: number) {
  const result = await db.delete(workouts).where(eq(workouts.id, id));
  return result.changes;
}

export { addWorkout, updateWorkout, deleteWorkout };
