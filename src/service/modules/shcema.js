import mongoose  from "mongoose";


const { Schema, model } = mongoose
 
const PhoneSchema = new Schema (
    {
        name: {type: String, required: true},
        title: {type: String, required: true},
        img: {type: String, required: true},
        price: {type: String, required: true},
    },
 {timestamps: true}
)
export default model("phone", PhoneSchema)