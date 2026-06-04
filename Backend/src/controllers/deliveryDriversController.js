import deliveryDriversModel from "../models/deliveryDrivers.js";

import {v2 as cloudinary} from "cloudinary"

//Array de funciones
const deliveryDriversController = {}

//SELECT
deliveryDriversController.getAllDrivers = async (req, res) => {
    try{
        const drivers = await deliveryDriversModel.find()
        return res.status(200).json(drivers)
    } catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Interna server error"})
    }
}


//INSERTAR
deliveryDriversController.insertDrivers = async (req, res) => {
    try{

        //#1- solicitamos los datos a guardar
        const {name, phone, cars, isActive } = req.body;

        //llenar el modelo de datos
        const newDriver = new deliveryDriversModel({
            name,
            phone,
            image: req.file.path,
            public_id: req.file.filename,
            cars,
            isActive
        })

        //guardamos todo en la base de datos
        await newDriver.save()

        return res.status(200).json({message: "Delivery driver saved"})

    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Interna server error"})
    }
}


//ELIMINAR
deliveryDriversController.deleteDirvers = async (req, res) => {
    try{
        //Buscamos cual es el repatidor a eliminar
        const driverFound = await deliveryDriversModel.findById(req.params.id)
        
        //Eliminamos la imagen de Cloudinary
        await cloudinary.uploader.destroy(driverFound.public_id)

        //Eliminamos el repartidor de la base de datos
        await deliveryDriversModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Driver delete"})

    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Interna server error"})
    }
}

//UPDATE
deliveryDriversController.udpdateDriver = async (req, res) => {
    try{
        //#1- solicito los nuevos datos
        const {name, phone, cars, isActive} = req.body

        //Identificar que repartidor voy a actualizar
        const driverFound = await deliveryDriversModel.findById(req.params.id)

        const updatedData = {
            name,
            phone,
            cars,
            isActive
        }

        //Si viene una imagen
        if(req.file){
            //Eliminamos la imagen anterior
            await cloudinary.uploader.destroy(driverFound.public_id)

            updatedData.image = req.dile.path
            updatedData.public_id = req.file.filename
        }

        //Gaurdamos todo lo actualizado en la base de datos
        await deliveryDriversModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new: true}
        )

        return res.status(200).json({message: "Driver updated"})

    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Interna server error"})
    }
}

export default deliveryDriversController







