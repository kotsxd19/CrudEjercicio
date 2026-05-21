import providerModel from "../models/Providers.js"

import { v2 as cloudinary } from "cloudinary"

//Array de funciones
const providersController = {};

//SELECT
providersController.getAllProviders = async (req, res) => {
    try{
        const providers = await providerModel.find();
        return res.status(200).json(providers);
    }catch (error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
};

//INSERTAR
providersController.insertProvider = async (req, res) => {
    try{
        //#1- solicitar los datos
        const { name, phone} = req.body;
        //#2- lleno el modelo con los datos
        const newProvider = new providerModel({
            name,
            phone,
            image: req.file.path,
            public_id: req.file.filename
        });
        //#3- guardo en la base de datos
        await newProvider.save();
        return res.status(201).json({ message: "Provider saved" });
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
};

//ELMINAR
providersController.deletePrvider = async (req, res) => {
  try{
      //Buscamos cual es el registro a eliminar
      const providerFound = await providerModel.findById(req.params.id);

      //Eliminar la imagen de Cloudinary
        await cloudinary.uploader.destroy(providerFound.public_id)

        //Eliminar el registro de la base de datos
        await providerModel.findByIdAndDelete(req.params.id)
        return res.status("200").json({message: "Provider found"})

    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
  }
}

//UPDATE
providersController.updateProvider = async (req, res) => {
    try{

        //#1- Solicito los nuevos datos
        const {name, phone} = req.body

        //Identifico a que usuario estoy actualizando
        const providerFound = await providerModel.findById(req.params.id)

        const updateData = {
            name,
            phone
        }

        //Si viene una imagen
        if(req.file){
            //Eliminar la imagen anterior
            await cloudinary.uploader.destroy(providerFound.public_id)

            updateData.image = req.file.path;
            updateData.public_id = req.file.filename
        }

        await providerModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            {new: true}
        )

        return res.status(200).json({message: "provider update"})
    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default providersController;

