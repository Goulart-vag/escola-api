import * as jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig";
import { prisma } from "../database/prismaClient";

export default function (req, res, next) {
    const [text, token] = req.headers.authorization.split(" ");

    jwt.verify(token, jwtConfig.secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ Error: err.message });
        }

        prisma.user
            .findFirst({
                where: {
                    email: decoded.email,
                },
            })
            .then((user) => {
                if (!user) {
                    return res.status(401).json({ Error: ["User not found"] });
                }

                req.userId = decoded.id;
                req.userEmail = decoded.email;
                req.userAccess = user.access;
                next();
            })
            .catch((error) => {
                console.error(error);
                return res.status(401).json({ Error: error.message });
            });
    });
}
