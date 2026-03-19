/*
Campos: 
    name
    lastname
    salary
    DUI
    phone
    email
    password
    idBranch
*/


import mongoose, {Schema, model} from "mongoose";

const EmployeSchema = new Schema({
    name:{
        type:String
    },
    lastname:{
        type:String
    },
    salary:{
        type:Number
    },
    DUI:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    idBranch:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branches"
    }
})

export default model("Employees", EmployeSchema)

