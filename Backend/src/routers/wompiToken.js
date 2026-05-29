import express from "express";
import wonpiController from "../controllers/wompiController.js";

const router = express.Router();

router.route("/token").post(wonpiController.generarToken)
router.route("/paymentTest").post(wonpiController.paymentTest)
router.route("/payment3ds").post(wonpiController.payment3ds)

export default router;









