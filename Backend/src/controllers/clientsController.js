const clientsController = {};

import clientsModel from "../models/clients.js"

//SELECT
clientsController.getClients = async (req, res) => {
    try{
        const clients = await clientsModel.find()
        return res.status(200).json(clients)
    } catch (error){
        console.log("Error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}


//INSERTAR
clientsController.insertClients = async (req, res) => {
    try{
        let { name, email, password, birthday, status, isVerified, loginAttesmps, timeOut} = req.body;
        
        //validaciones
        name = name?.trim();
        email = email?.trim();
        password = password?.trim();
        
        if(!name ||  !email || !password || !birthday){
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


        const newBrand = new clientsModel({name, email, password, birthday, status, isVerified, loginAttesmps, timeOut})
        await newBrand.save()

        return res.status(201).json({message: "clients saved"})
    }catch(error){
        console.log("Error" + error)
        return res.status(500).json({message: "internal server error"})
        }
    }

//ELIMINAR
clientsController.deleteClients= async (req, res) => {
    try{
        const deleteClients= await clientsModel.findByIdAndDelete(req.params.id)

        //validacion por si no fue borrado el admin
        if(!deleteClients){
            return res.status(404).json({message: "clients not found"})
        }

        return res.status(200).json({message: "clients delete"})
    }
    catch(error){
        console.log("Error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

//ACTUALIZAR

clientsController.updateClients = async ( req, res) => {
    try{
        let { name, email, password, birthday, status, isVerified, loginAttesmps, timeOut} = req.body;
        
        //validaciones
        name = name?.trim();
        email = email?.trim();
        password = password?.trim();
        
        if(!name ||  !email || !password || !birthday){
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

        //actualizamos 
        const updateClients = await clientsModel.findByIdAndUpdate(
            req.params.id,{
            name, email, password, birthday, status, isVerified, loginAttesmps, timeOut,}, {new: true}
        );

        //si no actualiza
        if(!updateClients){
            return res.status(404).json({message: "clients not found"})
        }

        return res.status(200).json({message: "clients update"})

    }
    catch(error){
        console.log("Error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default clientsController;