import dotenv from "dotenv"
import { config } from "./config.js"

dotenv.config()

export const config = {
    db:{
        URI: process.env.DB_URI
    },
    server: {
        port: process.env.PORT
    }
}