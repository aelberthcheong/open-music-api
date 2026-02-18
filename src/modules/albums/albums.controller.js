import ClientError from "../../shared/exceptions/index.js";
import albumRepository from "./albums.repository.js";

export async function createAlbum(req, res) {
    const { name, year } = req.body;
    const row = await albumRepository.createAlbum({
        name,
        year,
    });

    res.status(201).json({
        status: "success",
        data: {
            albumId: row.id,
        },
    });
}

export async function getAlbum(req, res) {
    const { id } = req.params;
    const rows = await albumRepository.getAlbum(id);

    if (rows.length === 0) {
        throw ClientError.notFound("Album tidak ditemukan");
    }

    const album = {
        id: rows[0].id,
        name: rows[0].name,
        year: rows[0].year,
        songs: rows[0].song_id
            ? rows.map((r) => ({
                  id: r.song_id,
                  title: r.title,
                  performer: r.performer,
              }))
            : [],
    };

    res.status(200).json({
        status: "success",
        data: {
            album,
        },
    });
}

export async function editAlbum(req, res) {
    const { id } = req.params;
    const { name, year } = req.body;
    const rowCount = await albumRepository.editAlbum({ id, name, year });

    if (rowCount === 0) {
        throw ClientError.notFound("Album tidak ditemukan");
    }

    res.status(200).json({
        status: "success",
        message: "Album berhasil diperbarui",
    });
}

export async function deleteAlbum(req, res) {
    const { id } = req.params;
    const rowCount = await albumRepository.deleteAlbum(id);

    if (rowCount === 0) {
        throw ClientError.notFound("Album tidak ditemukan");
    }

    res.status(200).json({
        status: "success",
        message: "Album berhasil dihapus",
    });
}
