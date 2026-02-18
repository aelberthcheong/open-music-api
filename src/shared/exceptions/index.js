export default class ClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    static notFound(message = "Not Found") {
        return new ClientError(message, 404);
    }
}
