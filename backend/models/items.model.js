import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    quantity:{
        type:String,
        required: true
    },
    owner:{
        type:ObjectId,
        required:true
    },
    image:{
        type: String,
        required: true
    },
}, {
        timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

export default Item