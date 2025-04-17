import mongoose from "mongoose";

const tradeofferSchema = new mongoose.Schema({
    sender:{
        type: mongoose.ObjectId,
        required:true
    },
    offering:{
        type: [mongoose.ObjectId],
        required:true
    },
    reciever:{
        type:mongoose.ObjectId,
        required:true
    },
    wanting:{
        type: [mongoose.ObjectId],
        required:true
    },
    status:{
        type:String,
        required:true
    }
},{
    timestamps:true
}
)

const Tradeoffer = mongoose.model('Tradeoffer',tradeofferSchema)

export default Tradeoffer