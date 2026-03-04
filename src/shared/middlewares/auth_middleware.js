import ClientError from "../exceptions/client-error.js";
import * as TokenManager from "../security/token_manager.js";

export default function authMiddleware(req, _res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw ClientError.unauthorized("missing token");
    }
    const token = authHeader.split(" ")[1];
    const decoded = TokenManager.verifyAccessToken(token);
    req.user = decoded; // { sub: userId }
    next();
}
