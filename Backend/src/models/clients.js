/*
campos:
    name
    email
    password
    birthday
    status
    isVerified
    loginAttesmps
    timeOut
*/

import { Schema, model } from "mongoose";

const clientsSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    password:{
        type: String
    },
    birthday:{
        type: Date
    },
    status:{
        type: Boolean
    },
    isVerified:{
        type: Boolean
    },
    loginAttesmps:{
        type: Number
    },
    timeOut:{
        type: Date
    }
},{
        timestamps: true,
        strict: false
    })

    export default model("Clients", clientsSchema)