import express from "express"
import brandController from "../controllers/brandsController.js";

//Ocupo Router() para asginar  los metodos
const router = express.Router();

router.route("/")
.get(brandController.getBrand)
.post(brandController.insertBrand)

router.route("/:id")
.delete(brandController.deleteBrand)
.put(brandController.updateBrand)

export default router;