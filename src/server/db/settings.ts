import type { WorkoutSettings } from "../../core/dayLog";
import type { Db } from "./client";
import { settings } from "./schema";

async function setSettings(db: Db, newSettings: WorkoutSettings) {
  const result = await db
    .insert(settings)
    .values(newSettings)
    .onConflictDoUpdate({
      target: settings.id,
      set: newSettings,
    });
  return result.changes;
}

async function getSettings(db: Db) {
  const rows = await db
    .select({
      minWalkDurationMins: settings.minWalkDurationMins,
      startDate: settings.startDate,
    })
    .from(settings);
  return rows[0];
}

export { setSettings, getSettings };
