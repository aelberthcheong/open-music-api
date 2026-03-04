import pool from "../../shared/database/index.js";
import { nanoid } from "nanoid";

import SongRepository from "../../modules/songs/repository.js";
import ClientError from "../../shared/exceptions/client-error.js";

class PlaylistRepositories {
    async createPlaylist(name, owner) {
        const id = `playlist-${nanoid(16)}`;
        const { rows } = await pool.query(
            `INSERT INTO playlists VALUES ($1, $2, $3) RETURNING id`,
            [id, name, owner],
        );
        return rows[0].id;
    }

    async getAllPlaylist() {
        const { rows } = await pool.query(
            `SELECT playlists.id, playlists.name, users.username FROM playlists INNER JOIN users ON playlists.owner = users.id`,
        );
        return rows;
    }

    async deletePlaylist(id) {
        const { rowCount } = await pool.query(
            `DELETE FROM playlists WHERE id = $1`,
            [id],
        );
        return rowCount > 0;
    }

    async addSongToPlaylist(playlistId, songId) {
        const id = `playlist_songs-${nanoid(16)}`;
        if (!(await SongRepository.getSong(songId))) {
            throw ClientError.notFound("song not found");
        }

        const { rows } = await pool.query(
            `INSERT INTO playlist_songs VALUES ($1, $2, $3) RETURNING id`,
            [id, playlistId, songId],
        );
        return rows[0].id;
    }

    async getSongsInPlaylist(playlistId) {
        const { rows } = await pool.query(
            `SELECT 
                playlists.id AS id, 
                playlists.name AS name, 
                users.username AS username,
                songs.id AS song_id,
                songs.title,
                songs.performer
            FROM playlists 
            INNER JOIN users ON playlists.owner = users.id 
            LEFT JOIN playlist_songs ON playlists.id = playlist_songs.playlist_id
            LEFT JOIN songs ON playlist_songs.song_id = songs.id
            WHERE playlists.id = $1;`,
            [playlistId],
        );
        if (!rows.length) {
            return null;
        }

        return {
            id: rows[0].id,
            name: rows[0].name,
            username: rows[0].username,
            songs: rows
                .filter((row) => row !== null)
                .map((row) => ({
                    id: row.song_id,
                    title: row.title,
                    performer: row.performer,
                })),
        };
    }

    async deleteSongfromPlaylist(playlistId, songId) {
        const { rowCount } = await pool.query(
            `DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2`,
            [playlistId, songId],
        );
        return rowCount > 0;
    }

    async getPlaylistById(playlistId) {
        const { rows } = await pool.query(
            `SELECT * FROM playlists WHERE id = $1`,
            [playlistId],
        );
        return rows[0];
    }
}

export default new PlaylistRepositories();
