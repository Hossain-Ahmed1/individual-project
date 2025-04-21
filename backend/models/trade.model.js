import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema({
    user1:{
        type: mongoose.ObjectId,
        required: true
    },
    user2:{
        type: mongoose.ObjectId,
        required: true
    },
    user1_items:{
        type: [mongoose.ObjectId],
        required: true
    },user2_items:{
        type: [mongoose.ObjectId],
        required: true
    },room:{
        type: String,
        default: ''
    }
},{
    timestamps:true
})
const Trade = mongoose.model('trade',tradeSchema)

export default Trade