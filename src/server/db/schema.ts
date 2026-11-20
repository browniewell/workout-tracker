import { sql } from "drizzle-orm";
import { int, sqliteTable, text, real, check } from "drizzle-orm/sqlite-core";

export const workouts = sqliteTable("workouts", {
  id: int().primaryKey({ autoIncrement: true }),
  date: text().notNull(),
  type: text({ enum: ["lift", "walk", "ride", "other"] }).notNull(),
  durationMins: int().notNull(),
  miles: real(),
  steps: int(),
  volumeLbs: int(),
});

export const dayMarkers = sqliteTable("day_markers", {
  date: text().primaryKey(),
  type: text({ enum: ["rest", "sick"] }).notNull(),
});

export const settings = sqliteTable(
  "settings",
  {
    id: int().primaryKey().default(1),
    minWalkDurationMins: int().notNull(),
    startDate: text().notNull(),
  },
  (t) => [check("settings_single_row", sql`${t.id} = 1`)],
);
