import express from "express";
import employeesController from '../controllers/employeesController.js'

//Uso Router() de la libreria expres
//Router es la funcion que tiene todo los metodos
//get, post, put, delete, etc

const router = express.Router();

router
.route("/")
.get(employeesController.getEmployees)
.post(employeesController.insertEmployees)

router
.route("/:id")
.put(employeesController.updateEmployees)
.delete(employeesController.deleteEmployees)

export default router;