import nodemailer from "nodemailer" //enviar correos
import crypto from "crypto" //Generar codigos aleatorios
import jsonwebtoken from "jsonwebtoken" //Generar token
import bcryptjs from "bcryptjs" //Encriptar contraseñas

import customerModel from "../models/customers.js"

import {config} from "../config.js"

//Creo un array de funciones
const registerCustomersController = {};
config
registerCustomersController.registrar = async (req, res) => {
    try {
        const {
            name,
            lastname,
            birthday,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body

        //verificamos si el correo ya esta registrado
        const existCustomer = await customerModel.findOne({email})
        if(existCustomer){
            return res.status(400).json({message: "Customer already exists"})
        }

        //Encriptar la contraseña
        const passwordHash = await bcryptjs.hash(password, 10)

        //Guardamos todo en la base de datos
        const newCustomer = new customerModel({
            name,
            lastname,
            birthday,
            email,
            password: passwordHash,
            isVerified,
            loginAttempts,
            timeOut,
        })

        await newCustomer.save();

        //Generar codigo aleatorio
        const verificationCode = crypto.randomBytes(3).toString("hex")

        //Guardamos este codigo en un toker
        const tokenCode = jsonwebtoken.sign(
            //#1- ¡que vamos a guardar?
            {email, verificationCode},
            //#2- secret key
            config.JWT.secret,
            //#3- ¡cuando expira?
            {expiresIn: "15m"}
        );

        res.cookie("verificationTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000})

        //envio de correo electronico
        //#1- transporter -> ¿Quien envia el correo?
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        //#2- ¿Quien lo va a recibir?
        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verification de cuenta",
            text: "Para verificar tu cuenta, utiliza el siguiente codigo: " + verificationCode + "Expira en 15 minutos"
        }

        //#3- Enviar el correo eletronico
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error" + error)
                return res.status(500).json({message: "Error"})
            } 
            res.status(200).json({message: "Email send"})
        })
 
    } catch (error) {
        console.error("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
};

registerCustomersController.verifyCode = async (req, res) => {
    try {
        //#1- Solicitamos el codigo que el usuario escribio en el frontend
        const {verificationCode} = req.body

        //#2- Obtener el token del cookie
        const token = req.cookies.verificationTokenCookie

        //#3- Extrar la informacion del token
        const decoced = jsonwebtoken.verify(token, config.JWT.secret)
        const {email, verificationCode: storedCode} = decoced
        
        //#4- Comparo el token que el usuario escribio en el frontend con el que esta guardado en el token
        if(verificationCode !== storedCode){
            return res.status(400).json({message: "Invalid code"})
        }

        // si el codigo si esta bien, entonces, colocamos el campo "isVerified" en true
        const customer = await customerModel.findOne({email})
        customer.isVerified = true
        await customer.save()

        res.clearCookie("verificationTokenCookie")
        res.json({message: "Email verified successfully"})

    }catch(error){
        console.error("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default registerCustomersController;