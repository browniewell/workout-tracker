import { describe, it, expect } from "vitest";
import { setSettings, getSettings } from "./settings";
import type { WorkoutSettings } from "../../core/dayLog";
import { createTestDb } from "./testDb";
import { settings } from "./schema";

const baseSettings: WorkoutSettings = {
  minWalkDurationMins: 20,
  startDate: "2026-11-20",
};

describe("settings db operations", () => {
  it("get settings returns the settings", async () => {
    const db = createTestDb();
    expect(await setSettings(db, baseSettings)).toEqual(1);
    expect(await getSettings(db)).toEqual({ ...baseSettings });
  });
  it("overwrites settings instead of adding a row", async () => {
    const db = createTestDb();
    expect(await setSettings(db, baseSettings)).toEqual(1);
    expect(
      await setSettings(db, { ...baseSettings, minWalkDurationMins: 30 }),
    ).toEqual(1);
    expect((await db.select().from(settings)).length).toEqual(1);
    expect(await getSettings(db)).toEqual({
      ...baseSettings,
      minWalkDurationMins: 30,
    });
  });
  // TODO: I'm not sure if we need this or not. Is this the behavior that we want?
  it("returns undefined if no settings have been saved", async () => {
    const db = createTestDb();
    expect(await getSettings(db)).toEqual(undefined);
  });
});
