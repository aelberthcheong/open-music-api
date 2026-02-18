import pool from "../../shared/database/index.js";
import { nanoid } from "nanoid";

class AlbumRepository {
    async createAlbum({ name, year }) {
        const id = `album-${nanoid()}`;
        const query = {
            text: `INSERT INTO albums(id, name, year) VALUES ($1, $2, $3) RETURNING id`,
            values: [id, name, year],
        };
        const result = await pool.query(query);
        return result.rows[0];
    }

    async getAlbum(id) {
        const query = {
            text: `
                SELECT 
                    a.id, a.name, a.year,
                    s.id AS song_id, s.title, s.performer
                    FROM albums a 
                    LEFT JOIN songs s ON s.album_id=a.id 
                    WHERE a.id = $1`,
            values: [id],
        };
        const result = await pool.query(query);
        return result.rows;
    }

    async editAlbum({ id, name, year }) {
        const query = {
            text: `UPDATE albums SET name = $1, year = $2 WHERE id = $3`,
            values: [name, year, id],
        };
        const result = await pool.query(query);
        return result.rowCount;
    }

    async deleteAlbum(id) {
        const query = {
            text: `DELETE FROM albums WHERE id = $1`,
            values: [id],
        };
        const result = await pool.query(query);
        return result.rowCount;
    }
}

export default new AlbumRepository();
