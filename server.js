/* eslint-disable no-undef */
import express from "express"
import dotenv from "dotenv/config"
import userRouter from "./routes/users.js"
import loginRouter from "./routes/login.js";

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use("/login", loginRouter);
app.use("/users", userRouter)

app.listen(port, () => {
    console.log(`App rodando em http://localhost:${port}`)
})
export default app
