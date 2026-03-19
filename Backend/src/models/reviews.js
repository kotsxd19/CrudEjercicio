/*
    idEmployee
    idProducts
    rating
    comment
*/

import mongoose, {Schema, model} from "mongoose";

const ReviewsSchema = new Schema({
    idEmployee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employees"
    },
    idProducts:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products"
    },
    rating:{
        type:Number
    },
    comment:{
        type:String
    }
})

export default model("Reviews", ReviewsSchema)