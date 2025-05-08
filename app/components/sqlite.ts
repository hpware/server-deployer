// DO NOT USE THIS COMPONENT!

import { Database } from "bun:sqlite";
import { join } from "path";
import { mkdir } from "fs/promises";

const dbDir = join(process.cwd(), "var");
await mkdir(dbDir, { recursive: true });

const dbPath = join(dbDir, "database.sqlite");
const db = new Database(dbPath);
