import { randomUUIDv7 } from "bun";
import sql from "./components/postgres.ts";

const key = randomUUIDv7();

const saveKey = await sql`INSERT INTO tokens (token) VALUES (${key});`;

console.log(key);

console.log("Key Generated!");


console.log(import.meta.dir);