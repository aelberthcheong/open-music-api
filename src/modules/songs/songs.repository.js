import pool from "../../shared/database/index.js";
import { nanoid } from "nanoid";

class SongRepository {
    async createSong({ title, year, genre, performer, duration, albumId }) {
        const id = `song-${nanoid()}`;
        const query = {
            text: `INSERT INTO songs(id, title, year, genre, performer, duration, album_id) 
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
            values: [
                id,
                title,
                year,
                genre,
                performer,
                duration ?? null,
                albumId ?? null,
            ],
        };
        const result = await pool.query(query);
        return result.rows[0];
    }

    async getAllSong({ title, performer }) {
        let expression = [];
        let values = [];
        let i = 0;

        if (title) {
            values.push(`%${title}%`);
            expression.push(`title ILIKE $${++i}`);
        }

        if (performer) {
            values.push(`%${performer}%`);
            expression.push(`performer ILIKE $${++i}`);
        }

        const query = {
            text: `SELECT id, title, performer FROM songs ${i ? ` WHERE ${expression.join(" AND ")}` : ``}`,
            values: values,
        };
        const result = await pool.query(query);
        return result.rows;
    }

    async getSong(id) {
        const query = {
            text: `SELECT * FROM songs WHERE id = $1`,
            values: [id],
        };
        const result = await pool.query(query);
        return result.rows[0];
    }

    async editSong({ id, title, year, genre, performer, duration, albumId }) {
        const query = {
            text: `UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6 WHERE id = $7`,
            values: [title, year, genre, performer, duration, albumId, id],
        };
        const result = await pool.query(query);
        return result.rowCount;
    }

    async deleteSong(id) {
        const query = {
            text: `DELETE FROM songs WHERE id = $1`,
            values: [id],
        };
        const result = await pool.query(query);
        return result.rowCount;
    }
}

export default new SongRepository();
