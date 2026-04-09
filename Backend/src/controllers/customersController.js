import customersModel from "../models/customers.js";

//creamos un array de funciones
const customersController = {}

//SELECT
customersController.getCustomers = async (req, res) => {
    try {
        const customers = await customersModel.find()
        return res.status(200).json(customers)
    } catch (error) {
        console.log("error"+ error)
        return res.status(500).json({message: "Internal server error"})
    }
}

//DELETE
customersController.deleteCustomer = async (req, res) => {
    try {
        const deleteCustomer = await customersModel.findByIdAndDelete(req.params.id)
        if (!deleteCustomer) {
            return res.status(404).json({message: "Customer not found"})
        }

        return res.status(200).json({message: "Customer deleted"})
    } catch (error) {
        console.log("error"+ error)
        return res.status(500).json({message: "Internal server error"})
    }
}

//PUT
customersController.updateCustomer = async (req, res) => {
    try {
        let{
            name,
            lastname,
            birthday,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body

        //VALIDACIONES
    //SANITIZAR
        name = name?.trim();
        email = email?.trim();

        //Validdar el tamaño del nombre
        if(name.length < 3 || name.length > 15){
            return res.status(400).json({message: "Inavalid name"})
        }

        //Actualizamos
        const updateCustomer = await customersModel.findByIdAndUpdate(req.params.id, {
            name,
            lastname,
            birthday,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut
        }, {new: true}
    );

        if (!updateCustomer) {
            return res.status(404).json({message: "Customer not found"})
        }

        return res.status(200).json({message: "Customer updated"})

    }catch (error) {
        console.log("error"+ error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default customersController;