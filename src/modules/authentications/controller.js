import ClientError from "../../shared/exceptions/client-error.js";
import * as TokenManager from "../../shared/security/token_manager.js";
import UserRepository from "../users/repository.js";
import authenticationsRepository from "./repository.js";

export async function login(req, res) {
    const { username, password } = req.body;
    const id = await UserRepository.verifyUserCredential({
        username,
        password,
    });

    const accessToken = TokenManager.generateAccessToken({ sub: id });
    const refreshToken = TokenManager.generateRefreshToken({ sub: id });

    await authenticationsRepository.addRefreshToken(refreshToken);

    res.status(201).json({
        status: "success",
        data: {
            accessToken: accessToken,
            refreshToken: refreshToken,
        },
    });
}

export async function refreshAccessToken(req, res) {
    const { refreshToken } = req.body;

    // cek dulu, apakah ini token yang valid. jika tidak no point query ke database
    const { sub: id } = TokenManager.verifyRefreshToken(refreshToken);

    const ok = await authenticationsRepository.verifyRefreshToken(refreshToken);
    if (!ok) {
        throw ClientError.badRequest("invalid refresh token");
    }

    const accessToken = TokenManager.generateAccessToken({ sub: id });

    res.status(200).json({
        status: "success",
        data: {
            accessToken: accessToken,
        },
    });
}

export async function logout(req, res) {
    const { refreshToken } = req.body;

    const ok = await authenticationsRepository.verifyRefreshToken(refreshToken);
    if (!ok) {
        throw ClientError.badRequest("invalid refresh token");
    }

    await authenticationsRepository.deleteRefreshToken(refreshToken);

    res.status(200).json({
        status: "success",
        message: "token removed (i.e. logout)",
    });
}
