//1# - array de funciones
const employeesController = {};

//2# - import de la coleccion que vamos a utilizar
import employeesModel from "../models/employees.js";

//SELECT
employeesController.getEmployees = async ( req, res) => {
    const employees= await employeesModel.find();
    res.json(employees)
}

//INSERT
employeesController.insertEmployees = async (req, res) => {
    //1# - solicita los datos
    const {name, lastname, salary, DUI, phone, email, password, idBranch} = req.body;
    //2# - rellenar el modelo con los datos que acabas de pedir
    const newEmployee = new employeesModel({
        name,
        lastname,
        salary,
        DUI,
        phone,
        email,
        password,
        idBranch
    });

    //3# - Guardo todo en la base de datos
    await newEmployee.save();

    res.json({message: "Employee saved"})
}

//ELIMINAR
employeesController.deleteEmployees = async (req, res) => {
    await employeesModel.findByIdAndDelete(req.params.id);
    res.json({message: "empleado deleted"});
}

//UPDATE
employeesController.updateEmployees = async (req, res) => {
    //solicito los nuevos datos
    const {name, lastname, salary, DUI, phone, email, password, idBranch} = req.body;
    //Actualizo
    await employeesModel.findByIdAndUpdate(req.params.id,{
        name,
        lastname,
        salary,
        DUI,
        phone,
        email,
        password,
        idBranch
    },{
        new: true
    });

    res.json({message: "Employees Update"})
}

export default employeesController;