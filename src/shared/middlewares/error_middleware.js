import ClientError from "../exceptions/index.js";

export default function errorMiddleware(err, _req, res, _next) {
    // handle client error
    if (err instanceof ClientError) {
        return res.status(err.statusCode).json({
            status: "fail",
            message: err.message,
        });
    }

    // handle Joi validation error
    if (err.isJoi) {
        return res.status(400).json({
            status: "fail",
            message: err.details[0].message,
        });
    }

    // untuk error lainnya, kirimkan respons 500
    return res.status(err.status || 500).json({
        status: "error",
        message: err.message || "Internal Server Error",
    });
}
