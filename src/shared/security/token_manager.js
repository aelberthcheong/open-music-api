import jwt from "jsonwebtoken";
import process from "node:process";
import ClientError from "../exceptions/client-error.js";

export function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: process.env.ACCESS_TOKEN_AGE,
    });
}

export function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
        noTimestamp: true,
    });
}

export function verifyAccessToken(accessToken) {
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
        return decoded;
    } catch (_err) {
        throw ClientError.badRequest("Bad Access Token");
    }
}

export function verifyRefreshToken(refreshToken) {
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
        return decoded;
    } catch (_err) {
        throw ClientError.badRequest("Bad Refresh Token");
    }
}
