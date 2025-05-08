import { SQL } from "bun";

const db = new SQL({
  url: process.env.POSTGRES_URL,
  max: 20, 
  idleTimeout: 30, 
  maxLifetime: 0, 
  connectionTimeout: 30,
});

export default db;