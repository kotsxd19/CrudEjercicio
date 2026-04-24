import jsonwebtoken from "jsonwebtoken"; //generar tokens
import bcrypt from "bcryptjs"; //encriptar la nueva contraseña
import crypto, { verify } from "crypto"; //generar codigos aleatorios 
import nodemailer from "nodemailer"; //enviar correos
import HTMLRecoveryEmail from "../utils/sendMailRecoveryPassword.js"

import { config } from "../config.js";

import customerModel from "../models/customers.js"

//Array de funciones
const recoveryPasswordController = {};

recoveryPasswordController.requestCode = async (req, res) => {
    try{
        //Solicitamos los datos
        const {email} = req.body;

        //Validar que el correo si este en la BD
        const userFound = await customerModel.findOne({ email })
        if(!userFound){
            return res.status(400).json({message: "user not found"})
        }

        //generar el numero aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex")

        //Guardamos todo en un token
        const token = jsonwebtoken.sign(
            //#1- ¿que vamos a guardar?
            {email, randomCode, userType: "customer", verified: false},
            //#2- Secret key
            config.JWT.secret,
            //#3-
            {expiresIn: "15m"}
        )

        res.cookie("recoveryCookie", token, {maxAge: 15 * 60 * 1000});

        //Enviamos por correo electronico
        //el codigo aleatorio que generamos

        // #1- ¿Quien lo envia?
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: config.email.user_email,
                pass: config.email.user_password
            }
        }) 

        // #2- ¿Quien lo recibe y como?
        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Codigo de recuperacion de contraseña",
            text: "El codigo vence en 15 minutos " + randomCode,
            
        }

        //#3-Enviar el correo
        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                return res.status(500).json({message: "Error al enviar correo"})
            }
        })

        return res.status(200).json({message: "email sent"})

    }catch (error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
};

recoveryPasswordController.verifyCode = async (req, res) => {   

    try{
        //#1- solicitamos los datos
        const {code} = req.body;

        //Obtenemos la infromacion que esta dentro del token
        //Accedemos a la cookie
        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if(code !== decoded.randomCode){
            return res.status(400).json({message: "Invalid code"})
        }

        //En cambio, si escribe bien el codigo
        //vamos a colocar en el token que ya esta verificado
        const newToken = jsonwebtoken.sign(
            //#1- ¿Que vamos a guardar?
            {email: decoded.email, userType: "customer", verified: true},
            //#2-secret key
            config.JWT.secret,
            //#3- ¿Cuando expira?
            {expiresIn: "15m"}
    )

        res.cookie("recoveryCookie", newToken, {maxAge: 15 * 60 * 1000});

        return res.status(200).json({message: "Code varified successfully"})

    }catch(error){
        console.log("error"+error)
        return res.status(500).json({message: "Internal server error"})
    }
};

recoveryPasswordController.newPassword = async (req, res) =>{
    try{
        //#1- solicitamos los datos
        const {newPassword, confirmNewPassword } = req.body;

        //Comprara las dos contraseñas
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({message: "passwords doesnt match"})
        }

        //vamos a comprobar que el toke n ya esta verifacado
        const token = req.cookies.recoveryCookie;
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if( !decoded.verified){
            return res.status(400).json({message: "code not verified"})
        }

        //Encriptar la nueva contraseña
        const passwordHash = await bcrypt.hash(newPassword, 10)

        await customerModel.findOneAndUpdate(
            {email: decoded.email},
            {password: passwordHash},
            {new: true}
        )

        res.clearCookie("recoveryCookie")

        return res.status(200).json({message: "Password update"})

    }catch(error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }

}

export default recoveryPasswordController;

