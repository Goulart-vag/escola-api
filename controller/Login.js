import { prisma } from "../database/prismaClient";
import jwtConfig from "../config/jwtConfig";
import * as jwt from "jsonwebtoken";
import Hash from "../helper/Hash";

class login {
    async login(req, res) {
        const { email, password } = req.body;

        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        if (!user) {
            return res.json("User not find");
        }
        console.log(password);
        if (!(await Hash.verify(password, user.password))) {
            return res.json("Password or email incorrect");
        }

        const token = jwt.sign({ email }, jwtConfig.secretKey, {
            expiresIn: jwtConfig.expiresIn,
        });

        res.json({ token });
    }
}

export default new login();
