import express from 'express'
import productsRouter from './src/routers/products.js'
import branchrouter from './src/routers/branch.js'

const app = express()

//que acepte json desde postman
app.use(express.json())

app.use("/api/products", productsRouter)
app.use("/api/branchs", branchrouter)

export default app;



