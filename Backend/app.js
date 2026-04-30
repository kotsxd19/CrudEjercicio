import express from 'express'
import productsRouter from './src/routers/products.js'
import branchrouter from './src/routers/branch.js'
import employeesRoutes from "./src/routers/employess.js"
import reviewsRouters from './src/routers/review.js'
import brandsRouters from './src/routers/brand.js'
import adminsRouters from './src/routers/admins.js'
import clientsRouters from './src/routers/clients.js'
import customersRouters from './src/routers/customers.js'
import registerCustomersRouters from './src/routers/registrerCustumer.js'
import registerEmployeesRouters from './src/routers/registerEmploees.js'
import cookieParser from "cookie-parser";
import loginCustomerRouters from './src/routers/loginCustomer.js'
import logoutRouter from './src/routers/logout.js'
import recoveryPasswordRouters from "./src/routers/recoveryPassword.js"
import cors from "cors";
import limiter from './middlewares/rateLimiter.js'

    const app = express()

    app.use(limiter);

    app.use(cors({
        origin: ["http://localhost:5173", "http://localhost:5174"],
        //permitir el envio de cookies y credenciales
        credentials: true
    }))

    app.use(cookieParser())

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
app.use("/api/registerCustomers", registerCustomersRouters)
app.use("/api/registerEmployees", registerEmployeesRouters)
app.use("/api/Login", loginCustomerRouters)
app.use("/api/logout", logoutRouter)
app.use("/api/recoveryPassword", recoveryPasswordRouters)

export default app;



