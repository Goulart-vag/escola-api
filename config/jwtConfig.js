import dotenv from "dotenv/config"

const jwtConfig = {
    secretKey: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN
}

export default jwtConfig
