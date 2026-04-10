import nodemailer from "nodemailer" //enviar correos
import crypto from "crypto" //Generar codigos aleatorios
import jsonwebtoken from "jsonwebtoken" //Generar token
import bcryptjs from "bcryptjs" //Encriptar contraseñas

import employeeModel from "../models/employees.js"

import {config} from "../config.js"

const registrarEmployeesController = {};

registrarEmployeesController.registrar = async (req, res) => {
    try {
        const {
            name,
            lastname,
            salary,
            DUI,
            phone,
            email,
            password,
            idBranch,
            isVerified
        } = req.body

const existEmployees = await employeeModel.findOne({email})
if(existEmployees){
    return res.status(400).json({message: "Employee already exists"})
}

const passwordHash = await bcryptjs.hash(password, 10)

const newEmployee = new employeeModel({
    name,
    lastname,
    salary,
    DUI,
    phone,
    email,
    password: passwordHash,
    idBranch,
    isVerified
})

await newEmployee.save();

const verificationCode = crypto.randomBytes(3).toString("hex")

const tokenCode = jsonwebtoken.sign(
    {email, verificationCode},
    config.JWT.secret,
    {expiresIn: "15m"}
)

res.cookie("verificationTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000})

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.email.user_email,
        pass: config.email.user_password
    }
})

const mailOptions = {
    from: config.email.user_email,
    to: email,
    subject: "Verification code",
    text: "para verificar tu cuenta, utiloza el siguiente codigo: " + verificationCode + " Expira en 15 minutos"
}

transporter.sendMail(mailOptions, (error, info) => {
    if(error){
        console.log(error)
        return res.status(500).json({message: "Error"})
    }
    res.status(200).json({message: "Email send"})
})

}catch (error) {
    console.error("error" + error)
    return res.status(500).json({message: "Internal server error"})
}
};

registrarEmployeesController.verifyCode = async (req, res) => {
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
            const employees = await employeeModel.findOne({email})
            employees.isVerified = true
            await employees.save()
    
            res.clearCookie("verificationTokenCookie")
            res.json({message: "Email verified successfully"})
    
        }catch(error){
            console.error("error" + error)
            return res.status(500).json({message: "Internal server error"})
        }
}

export default registrarEmployeesController;