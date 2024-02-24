/* eslint-disable no-undef */
import express from "express"
import dotenv from "dotenv/config"
import userRouter from "./routes/users.js"

const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/", userRouter)

app.listen(port, () => {
    console.log(`App rodando em http://localhost:${port}`)
})
export default app
