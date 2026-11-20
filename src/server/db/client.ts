import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

function connect(path: string) {
  const client = new Database(path);
  return drizzle({ client });
}

export { connect };
export type Db = ReturnType<typeof connect>;
