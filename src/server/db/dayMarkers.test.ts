import { describe, expect, it } from "vitest";
import { createTestDb } from "./testDb";
import { clearMarker, setMarker } from "./dayMarkers";
import { dayMarkers } from "./schema";
import { eq } from "drizzle-orm";

const today = "2026-11-18";
const tomorrow = "2026-11-19";

describe("daymarkers db operations", () => {
  it("add rest daymarker", async () => {
    const db = createTestDb();
    expect(await setMarker(db, today, "rest")).toEqual(1);
    expect(await db.select().from(dayMarkers)).toEqual([
      { date: today, type: "rest" },
    ]);
  });
  it("add sick daymarker", async () => {
    const db = createTestDb();
    expect(await setMarker(db, today, "sick")).toEqual(1);
    expect(await db.select().from(dayMarkers)).toEqual([
      { date: today, type: "sick" },
    ]);
  });
  it("Overwrite marker for day that already has one", async () => {
    const db = createTestDb();
    await setMarker(db, today, "rest");
    expect((await db.select().from(dayMarkers)).length).toEqual(1);
    expect(await setMarker(db, today, "sick")).toEqual(1);
    expect(
      await db
        .select({ type: dayMarkers.type })
        .from(dayMarkers)
        .where(eq(dayMarkers.date, today)),
    ).toEqual([{ type: "sick" }]);
  });
  it("Can't clear marker for day that doesn't exist", async () => {
    const db = createTestDb();
    await setMarker(db, today, "rest");
    expect((await db.select().from(dayMarkers)).length).toEqual(1);
    expect(await clearMarker(db, tomorrow)).toEqual(0);
    expect((await db.select().from(dayMarkers)).length).toEqual(1);
  });
  it("Clear marker", async () => {
    const db = createTestDb();
    await setMarker(db, today, "rest");
    expect((await db.select().from(dayMarkers)).length).toEqual(1);
    expect(await clearMarker(db, today)).toEqual(1);
    expect((await db.select().from(dayMarkers)).length).toEqual(0);
  });
});
