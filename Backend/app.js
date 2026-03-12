import express from 'express'
import productsRouter from './src/routers/products.js'

const app = express()

app.use("/api/products", productsRouter)
export default app;




