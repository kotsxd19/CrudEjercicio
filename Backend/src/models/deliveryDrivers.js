/* 
    Campos
        name,
        phone,
        image,
        cars: {
            brand,
            modelo,
            plate
        },
        isAcitve
*/

import { Schema, model } from "mongoose";

const deliveryDriversSchema = new Schema({
    name:{
        type: String
    },
    phone:{
        type: String
    },
    image:{
        type: String
    },
    public_Id:{
        type: String
    },
    cars: [
        {
            brand: {
                type: String
            },
            modelo: {
                type: String
            },
            plate: {
                type: String
            }
        }
    ],
    isActive: {
        type: Boolean
    }
},{
    timestamps: true,
    strict: false
})

export default model("deliveryDrivers", deliveryDriversSchema)


