/*
Campos:
    customerId
    products:
        productsId
        quantity
        subtotal
    total
    status
*/

import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema({
    customerId:{
        type: mongoose.Types.ObjectId,
        ref: "Customers"
    },
    product: [
        {
            productId: {
                type: mongoose.Types.ObjectId,
                ref: "Product"
            },
            quantity:{
                type: Number
            },
            subtotal:{
                type: Number
            }
        }
    ],
    total:{
        type: Number
    },
    status:{
        type: String
    }
},{
    timestamps: true,
    strict: false
})

export default model("Cart", cartSchema)