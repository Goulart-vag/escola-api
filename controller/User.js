import { prisma } from "../database/prismaClient";
import Hash from "../helper/Hash";

class Users {
    async index(req, res) {
        try {
            const users = await prisma.user.findMany();

            res.json(users);
        } catch (error) {
            res.status(401).json({ Error: ["Unknown error", Error] });
        }
    }
    async store(req, res) {
        try {
            const { name, email, password, access="STUDENT" } = req.body;

            const password_hash = await Hash.hashing(password);

            const user = await prisma.user.create({
                data: { name, email, password: password_hash, access },
            });

            return res.json(user);
        } catch (error) {
            console.error(error.message);
            if (error.code === "P2002") {
                res.status(401).json({ Error: ["Email already exists"] });
            } else {
                res.status(401).json({ Error: ["Invalid request"] });
            }
        }
    }
    async show(req, res) {
        try {
            const id = req.userId;

            const user = await prisma.user.findFirst({
                where: {
                    id: Number(id),
                },
            });

            if (!user) {
                return res.json("User not find");
            }

            return res.json(user);
        } catch (error) {
            console.error(error.message);

            res.status(401).json({ Error: ["Invalid request"] });
        }
    }
    async update(req, res) {
        try {
            const id = req.userId;
            const { email, name, password } = req.body;

            let userTemplate = {
                email,
                name,
            };

            if (password) {
                const password_hash = Hash.hashing(password);
                userTemplate = {
                    email,
                    name,
                    password: password_hash,
                };
            }

            let user = await prisma.user.findFirst({
                where: {
                    id: Number(id),
                },
            });

            if (!user) {
                return res.json("User not find");
            }

            user = await prisma.user.update({
                where: {
                    id: Number(id),
                },
                data: userTemplate,
            });

            res.json(user);
        } catch (error) {
            console.error(error.message);

            res.status(401).json({ Error: ["Invalid request"] });
        }
    }
    async delete(req, res) {
        try {
            const id = req.userId;

            let user = await prisma.user.findFirst({
                where: {
                    id: Number(id),
                },
            });

            if (!user) {
                return res.json("User not find");
            }

            await prisma.user.delete({
                where: {
                    id: Number(id),
                },
            });

            res.json("User successfully deleted");
        } catch (error) {
            res.status(401).json({ Error: ["Invalid request"] });
            console.error(error.message);
        }
    }
}

export default new Users();
