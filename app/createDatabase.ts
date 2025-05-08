import sql from "./components/postgres.ts";

const tokens = await sql`CREATE TABLE IF NOT EXISTS tokens (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const apps = await sql`CREATE TABLE IF NOT EXISTS apps (
    id SERIAL PRIMARY KEY,
    app VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;
