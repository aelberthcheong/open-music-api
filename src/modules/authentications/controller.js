import * as TokenManager from "../../shared/security/token_manager.js";
import UserRepository from "../users/repository.js";

export function login(req, res) {
    const { username, password } = req.body;
    const id = UserRepository.verifyUserCredential({ username, password });

    const accessToken = TokenManager.generateAccessToken({ sub: id });
    const refreshToken = TokenManager.generateRefreshToken({ sub: id });

    res.status(201).json({
        status: "success",
        data: {
            accessToken: accessToken,
            refreshToken: refreshToken,
        },
    });
}

// export function refreshAccessToken(req, res) {
//     const { refreshToken } = req.body;

//     res.status(200).json({
//         status: "success",
//         data: {
//             accessToken: accessToken,
//         },
//     });
// }

// export function deleteTokens(req, res) {
//     const { refreshToken } = req.body;

//     res.status(200).json({
//         status: "success",
//         message: "token removed (i.e. logout)",
//     });
// }
