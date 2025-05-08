import { randomUUIDv7 } from "bun";
import sql from "./components/postgres.ts";

await sql`CREATE TABLE IF NOT EXISTS keys (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const key = randomUUIDv7();

console.log(key);

console.log("Key Generated!");


console.log(import.meta.dir);