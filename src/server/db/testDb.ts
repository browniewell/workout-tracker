import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { connect } from "./client";

function createTestDb() {
  const db = connect(":memory:");
  migrate(db, { migrationsFolder: "drizzle" });
  return db;
}

export { createTestDb };
