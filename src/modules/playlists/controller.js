import ClientError from "../../shared/exceptions/client-error.js";
import PlaylistRepositories from "./repository.js";

export async function createPlaylist(req, res) {
    const { name } = req.body;
    const { sub: owner } = req.user;

    const id = await PlaylistRepositories.createPlaylist(name, owner);
    res.status(201).json({
        status: "success",
        data: {
            playlistId: id,
        },
    });
}

export async function getAllPlaylist(_req, res) {
    const rows = await PlaylistRepositories.getAllPlaylist();
    res.status(200).json({
        status: "success",
        data: {
            playlists: rows,
        },
    });
}

export async function deletePlaylist(req, res) {
    const { id } = req.params;
    const { sub: userId } = req.user;

    const playlist = await PlaylistRepositories.getPlaylistById(id);
    if (!playlist) {
        throw ClientError.notFound("playlist not found");
    }
    if (playlist.owner !== userId) {
        throw ClientError.forbidden("you are not the owner of this playlist");
    }

    await PlaylistRepositories.deletePlaylist(id);
    res.status(200).json({
        status: "success",
        message: "berhasil dihapus",
    });
}

export async function addSongToPlaylist(req, res) {
    const { id: playlistId } = req.params;
    const { songId } = req.body;
    const { sub: userId } = req.user;

    const playlist = await PlaylistRepositories.getPlaylistById(playlistId);
    if (!playlist) {
        throw ClientError.notFound("playlist not found");
    }

    if (playlist.owner !== userId) {
        throw ClientError.forbidden("you are not the owner of this playlist");
    }

    await PlaylistRepositories.addSongToPlaylist(playlistId, songId);
    res.status(201).json({
        status: "success",
        message: "berhasil tambah lagu ke playlist",
    });
}

export async function getSongsInPlaylist(req, res) {
    const { id: playlistId } = req.params;
    const rows = await PlaylistRepositories.getSongsInPlaylist(playlistId);

    res.status(200).json({
        status: "success",
        data: {
            playlist: rows,
        },
    });
}

export async function deleteSongfromPlaylist(req, res) {
    const { id: playlistId } = req.params;
    const { songId } = req.body;
    const { sub: userId } = req.user;

    const playlist = await PlaylistRepositories.getPlaylistById(playlistId);
    if (!playlist) {
        throw ClientError.notFound("playlist not found");
    }
    if (playlist.owner !== userId) {
        throw ClientError.forbidden("you are not the owner of this playlist");
    }

    const ok = await PlaylistRepositories.deleteSongfromPlaylist(
        playlistId,
        songId,
    );
    if (!ok) {
        throw ClientError.notFound("song not found in playlist");
    }

    res.status(200).json({
        status: "success",
        message: "berhasil hapus lagu dari playlist",
    });
}
