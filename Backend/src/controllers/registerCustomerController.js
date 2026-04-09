import nodemailer from "nodemailer" //enviar correos
import crypto from "crypto" //Generar codigos aleatorios
import jsonwebtoker from "jsonwebtoken" //Generar token
import bcryptjs from "bcryptjs" //Encriptar contraseñas

import customerModel from "../models/customers.js"

import {config} from "../config.js"

//Creo un array de funciones
const registerCustomersController = {};

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
        const tokenCode = JsonWebTokenError.sing(
            //#1- ¡que vamos a guardar?
            {email, verificationCode},
            //#2- secret key
            config.JWT.secret,
            //#3- ¡cuando expira?
            {exoiresIn: "15m"}
        );

        res.cookie("verificationTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000})



} catch (error) {}
}