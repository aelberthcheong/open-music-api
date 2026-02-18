import ClientError from "../../shared/exceptions/index.js";
import songRepository from "./songs.repository.js";

export async function createSong(req, res) {
    const { title, year, genre, performer, duration, albumId } = req.body;
    const row = await songRepository.createSong({
        title,
        year,
        genre,
        performer,
        duration,
        albumId,
    });

    res.status(201).json({
        status: "success",
        data: {
            songId: row.id,
        },
    });
}

export async function getAllSong(req, res) {
    const { title, performer } = req.validatedQuery;
    const rows = await songRepository.getAllSong({ title, performer });
    res.status(200).json({
        status: "success",
        data: {
            songs: rows,
        },
    });
}

export async function getSong(req, res) {
    const { id } = req.params;
    const row = await songRepository.getSong(id);

    if (!row) {
        throw ClientError.notFound("Song tidak ditemukan");
    }

    res.status(200).json({
        status: "success",
        data: {
            song: row,
        },
    });
}

export async function editSong(req, res) {
    const { id } = req.params;
    const { title, year, genre, performer, duration, albumId } = req.body;
    const rowCount = await songRepository.editSong({
        id,
        title,
        year,
        genre,
        performer,
        duration,
        albumId,
    });

    if (rowCount === 0) {
        throw ClientError.notFound("Song tidak ditemukan");
    }

    res.status(200).json({
        status: "success",
        message: "Song berhasil diperbarui",
    });
}

export async function deleteSong(req, res) {
    const { id } = req.params;
    const rowCount = await songRepository.deleteSong(id);

    if (rowCount === 0) {
        throw ClientError.notFound("Song tidak ditemukan");
    }

    res.status(200).json({
        status: "success",
        message: "Song berhasil dihapus",
    });
}
