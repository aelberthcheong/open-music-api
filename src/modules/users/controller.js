import UserRepository from "./repository.js";
import ClientError from "../../shared/exceptions/client-error.js";

export async function createUser(req, res) {
    const { username, password, fullname } = req.body;

    const user = await UserRepository.getUserByUsername(username);
    if (user) {
        throw ClientError.badRequest("username ini sudah diambil");
    }

    const row = await UserRepository.createUser({
        username,
        password,
        fullname,
    });

    res.status(201).json({
        status: "success",
        data: {
            userId: row.id,
        },
    });
}
