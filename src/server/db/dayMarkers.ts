import { eq } from "drizzle-orm";
import type { Db } from "./client";
import { dayMarkers } from "./schema";

async function setMarker(db: Db, date: string, marker: "rest" | "sick") {
  const result = await db
    .insert(dayMarkers)
    .values({
      date: date,
      type: marker,
    })
    .onConflictDoUpdate({
      target: dayMarkers.date,
      set: { type: marker },
    });
  return result.changes;
}

async function clearMarker(db: Db, date: string) {
  const result = await db.delete(dayMarkers).where(eq(dayMarkers.date, date));
  return result.changes;
}

export { setMarker, clearMarker };
