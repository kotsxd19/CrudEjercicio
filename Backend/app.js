import express from 'express'
import productsRouter from './src/routers/products.js'
import branchrouter from './src/routers/branch.js'
import employeesRoutes from "./src/routers/employess.js"
import reviewsRouters from './src/routers/review.js'
import brandsRouters from './src/routers/brand.js'
import adminsRouters from './src/routers/admins.js'
import clientsRouters from './src/routers/clients.js'
import customersRouters from './src/routers/customers.js'

const app = express()

//que acepte json desde postman
app.use(express.json())

app.use("/api/products", productsRouter)
app.use("/api/branchs", branchrouter)
app.use("/api/employees", employeesRoutes)
app.use("/api/review", reviewsRouters)
app.use("/api/brands", brandsRouters)
app.use("/api/admins", adminsRouters)
app.use("/api/clients", clientsRouters)
app.use("/api/customers",customersRouters)
app.use("/api/registerCustomers",)


export default app;



