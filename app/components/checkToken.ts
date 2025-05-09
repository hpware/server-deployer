import sql from "./postgres.ts";

const checkToken = async (token: string) => {
    const result = await sql`SELECT * FROM tokens WHERE token = ${token};`;
    return result.length > 0;
};

export default checkToken;