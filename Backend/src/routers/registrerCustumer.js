import express from "express";
import resgisterCustomersController from "../controllers/registerCustomerController.js";

const router = express.Router();

router.route("/")
.post(resgisterCustomersController.registrar)

router.route("/verifyCodeEmail")
.post(resgisterCustomersController.verifyCode)

export default router;
