import app from "./app.js";
import "dotenv/config";
import { testConnection } from "./shared/database/index.js";

async function init() {
    // Tes koneksi dengan database. pada production, koneksi gagal akan ditangani per-request
    if (process.env.NODE_ENV !== "production") await testConnection();

    const host = process.env.HOST;
    const port = process.env.PORT;

    app.listen(port, host, () => {
        console.log(
            `\x1b[34mServer berjalan pada \x1b[93mhttp://${host}:${port}\x1b[0m`,
        );
    });
}

if (import.meta.main) {
    init();
}
