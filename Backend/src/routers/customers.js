import express from "express";
import customersControllers from "../controllers/customersController.js";

const router = express.Router();

router.route("/")
    .get(customersControllers.getCustomers)

router.route("/:id")
    .delete(customersControllers.deleteCustomer)
    .put(customersControllers.updateCustomer)

    export default router;