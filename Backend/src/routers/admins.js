import express from "express"
import adminController from "../controllers/adminController.js";

//Ocupo Router() para asginar  los metodos
const router = express.Router();

router.route("/")
.get(adminController.getAdmin)
.post(adminController.insertAdmin)

router.route("/:id")
.delete(adminController.deleteAdmin)
.put(adminController.updateAdmins)

export default router;