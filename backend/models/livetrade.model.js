import mongoose from "mongoose";

const livetradeSchema = new mongoose.Schema({
    sender:{
        type: mongoose.ObjectId,
        required: true
    },
    invited:{
        type: mongoose.ObjectId,
        required: true
    }
},{
    timestamps:true
})
const Livetrade = mongoose.model('Livetrade',livetradeSchema)

export default Livetrade