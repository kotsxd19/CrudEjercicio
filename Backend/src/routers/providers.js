import express from "express";
import providersController from "../controllers/providersController.js";
import upload from "../utils/CloudinaryConfig.js";

const router = express.Router()

router.route("/")
.get(providersController.getAllProviders)
.post(upload.single("image"), providersController.insertProvider)

router.route("/:id")
.put(upload.single("image"), providersController.updateProvider)
.delete(providersController.deletePrvider)

export default router
