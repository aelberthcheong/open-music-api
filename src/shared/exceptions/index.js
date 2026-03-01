export default class ClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    static BadRequest(message = "Unauthorized") {
        return new ClientError(message, 401);
    }

    static Forbidden(message = "Forbidden") {
        return new ClientError(message, 403);
    }

    static notFound(message = "Not Found") {
        return new ClientError(message, 404);
    }
}
