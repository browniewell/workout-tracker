import { describe, it, expect } from "vitest";
import { createTestDb } from "./testDb";
import { addWorkout, deleteWorkout, updateWorkout } from "./workouts";
import { workouts } from "./schema";
import type { Workout } from "../../core/dayLog";

const baseLift: Workout = { type: "lift", durationMins: 30 };
const today = "2026-11-18";

describe("workouts db operations", () => {
  it("Add workout", async () => {
    const db = createTestDb();
    expect(await addWorkout(db, baseLift, today)).toEqual(1);
    expect(await db.select().from(workouts)).toEqual([
      {
        ...baseLift,
        id: 1,
        date: today,
        miles: null,
        steps: null,
        volumeLbs: null,
      },
    ]);
  });
  it("Add 2 workouts", async () => {
    const db = createTestDb();
    expect(await addWorkout(db, baseLift, today)).toEqual(1);
    expect(await db.select().from(workouts)).toEqual([
      {
        ...baseLift,
        id: 1,
        date: today,
        miles: null,
        steps: null,
        volumeLbs: null,
      },
    ]);
    expect(await addWorkout(db, baseLift, today)).toEqual(2);
    expect(await db.select().from(workouts)).toEqual([
      {
        ...baseLift,
        id: 1,
        date: today,
        miles: null,
        steps: null,
        volumeLbs: null,
      },
      {
        ...baseLift,
        id: 2,
        date: today,
        miles: null,
        steps: null,
        volumeLbs: null,
      },
    ]);
  });
  it("Update workout", async () => {
    const db = createTestDb();
    const newMins = 45;
    await addWorkout(db, baseLift, today);
    expect(
      await updateWorkout(db, 1, { ...baseLift, durationMins: newMins }, today),
    ).toEqual(1);
    const rows = await db.select().from(workouts);
    expect(rows.length).toEqual(1);
    expect(rows).toEqual([
      {
        ...baseLift,
        id: 1,
        date: today,
        durationMins: newMins,
        miles: null,
        steps: null,
        volumeLbs: null,
      },
    ]);
  });
  it("Clears nulled out properties on update", async () => {
    const db = createTestDb();
    expect(
      await addWorkout(
        db,
        // TODO: this combination doesn't make sense IRL, but we're verifying that these optional fields have to be set to NULL to clear them.
        { ...baseLift, miles: 10, steps: 2000, volumeLbs: 4000 },
        today,
      ),
    ).toEqual(1);
    expect(await db.select().from(workouts)).toEqual([
      {
        ...baseLift,
        id: 1,
        date: today,
        miles: 10,
        steps: 2000,
        volumeLbs: 4000,
      },
    ]);
    expect(await updateWorkout(db, 1, baseLift, today)).toEqual(1);
    expect(await db.select().from(workouts)).toEqual([
      {
        ...baseLift,
        id: 1,
        date: today,
        miles: null,
        steps: null,
        volumeLbs: null,
      },
    ]);
  });
  it("returns zero changes with attempt to update a workout that doesn't exist", async () => {
    const db = createTestDb();
    await addWorkout(db, baseLift, today);
    expect(
      await updateWorkout(db, 2, { ...baseLift, durationMins: 10 }, today),
    ).toEqual(0);
  });
  it("returns zero changes with attempt to delete a workout that doesn't exist", async () => {
    const db = createTestDb();
    await addWorkout(db, baseLift, today);
    expect(await deleteWorkout(db, 2)).toEqual(0);
  });
  it("Delete workout", async () => {
    const db = createTestDb();
    await addWorkout(db, baseLift, today);
    expect((await db.select().from(workouts)).length).toEqual(1);
    expect(await deleteWorkout(db, 1)).toEqual(1);
    expect((await db.select().from(workouts)).length).toEqual(0);
  });
});
