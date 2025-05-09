import { randomUUIDv7 } from "bun";
import sql from "./components/postgres.ts";

const key = randomUUIDv7();

const saveKey = await sql`INSERT INTO tokens (token) VALUES (${key});`;


console.log("Key Generated! Please keep your key somewhere safe. Your new key: " + key + "\n");