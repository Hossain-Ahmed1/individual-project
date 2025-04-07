import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    quantity:{
        type:Number,
        required: true
    },
    owner:{
        type:mongoose.ObjectId,
        default: null
    },
    image: {
        type:String,
        default: ""
    },
}, {
        timestamps: true
})

const Item = mongoose.model('Item', itemSchema)

export default Item