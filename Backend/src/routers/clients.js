import express from "express"
import clientsController from "../controllers/clientsController.js";

//Ocupo Router() para asginar  los metodos
const router = express.Router();

router.route("/")
.get(clientsController.getClients)
.post(clientsController.insertClients)

router.route("/:id")
.delete(clientsController.deleteClients)
.put(clientsController.updateClients)

export default router;