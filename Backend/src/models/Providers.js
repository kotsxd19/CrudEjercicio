/*
    campos:
    name,
    phone,
    public_id
*/

import {Schema, model} from "mongoose";

const ProvidersSchema = new Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    imagen: {
        type: String
    },
    public_id: {
        type: String
    }
},{
    timestamps: true,
    strict: false
})

export default model("Providers", ProvidersSchema)