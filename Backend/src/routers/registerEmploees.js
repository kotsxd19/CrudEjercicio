import express from "express";
import registrarEmployeesController from "../controllers/registrerEmployeesController.js";

const router = express.Router();

router.route("/")
.post(registrarEmployeesController.registrar)

router.route("/verifyCodeEmail")
.post(registrarEmployeesController.verifyCode)

export default router;