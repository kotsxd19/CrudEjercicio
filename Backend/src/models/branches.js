/*
    name
    adress
    schedule
    isActive
*/

import { Schema, model } from "mongoose";

const branchsSchema = Schema({
    name: {
        type: String
    },
    adress: {
        type: String
    },
    schedule: {
        type: String
    },
    isActive: {
        type: Boolean
    }
})

export default model("branch", branchsSchema)