import pool from "../../shared/database/index.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

class UserRepository {
    async createUser({ username, password, fullname }) {
        const id = `user-${nanoid()}`;
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;
        const pq = {
            text: `INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
            values: [
                id,
                username,
                hashedPassword,
                fullname,
                createdAt,
                updatedAt,
            ],
        };
        const result = await pool.query(pq);
        return result.rows[0];
    }

    async usernameExists(username) {
        // average time O(n/2) => O(n)
        // optimal nya, buat index (b-tree) agar average time O(log n)
        const pq = {
            text: `SELECT username FROM users WHERE username = $1 LIMIT 1`,
            values: [username],
        };
        const result = await pool.query(pq);
        return result.rows.length > 0;
    }
}

export default new UserRepository();
