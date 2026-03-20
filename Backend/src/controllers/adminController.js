const adminController = {};

import adminModels from "../models/admins.js"

//SELECT
adminController.getAdmin = async (req, res) => {
    try{
        const admin = await adminModels.find()
        return res.status(200).json(admin)
    } catch (error){
        console.log("Error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}


//INSERTAR
adminController.insertAdmin = async (req, res) => {
    try{
        let { name, email , password, isVerified} = req.body;
        
        //validaciones
        name = name?.trim();
        email = email?.trim();
        password = password?.trim();
        
        if(!name ||  !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        if(name.length < 3){
            return res.status(400).json({message: "name too short"})
        }

        if(password.length < 5){
            return res.status(400).json({message: "password too short"})
        }

        if(email.length < 12){
            return res.status(400).json({message: "email too long"})
        }

        const newBrand = new adminModels({name, password, email, isVerified})
        await newBrand.save()

        return res.status(201).json({message: "Admin saved"})
    }catch(error){
        console.log("Error" + error)
        return res.status(500).json({message: "internal server error"})
        }
    }

//ELIMINAR
adminController.deleteAdmin = async (req, res) => {
    try{
        const deleteAdmin = await adminModels.findByIdAndDelete(req.params.id)

        //validacion por si no fue borrado el admin
        if(!deleteAdmin){
            return res.status(404).json({message: "admin not found"})
        }

        return res.status(200).json({message: "admin delete"})
    }
    catch(error){
        console.log("Error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

//ACTUALIZAR

adminController.updateAdmins = async ( req, res) => {
    try{
         let { name, email , password, isVerified} = req.body;

        //validaciones
        name = name?.trim();
        email = email?.trim();
        password = password?.trim();
        
        if(name.length < 3){
            return res.status(400).json({message: "name too short"})
        }

        if(password.length < 5){
            return res.status(400).json({message: "password too short"})
        }

        if(email.length < 12){
            return res.status(400).json({message: "email too long"})
        }

        //actualizamos 
        const updateAdmin = await adminModels.findByIdAndUpdate(
            req.params.id,{
            name,
            email,
            password,
            isVerified,}, {new: true}
        );

        //si no actualiza
        if(!updateAdmin){
            return res.status(404).json({message: "admin not found"})
        }

        return res.status(200).json({message: "admin update"})

    }
    catch(error){
        console.log("Error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default adminController;