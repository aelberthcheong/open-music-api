import { Pool } from "pg";

const dbPool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

export const testConnection = async () => {
    try {
        // tes koneksi. apakah bisa query?
        await dbPool.query("SELECT NOW()");
        console.log(`\x1b[36m[Postgres] Database connected\x1b[0m`);
    } catch (error) {
        console.error("\x1b[31m[Postgres] Database error\x1b[0m", error);
        process.exit(1);
    }
};

export default dbPool;
