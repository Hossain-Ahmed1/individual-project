import Tradeoffer from "../models/tradeoffer.model.js";
import mongoose from "mongoose";

//get all
export const getTradeoffers = async(req,res) =>{
    try{
        const tradeoffers = await Tradeoffer.find({})
        res.status(200).json({succes:true, data:tradeoffers})
    }catch(err){
        console.log("error in fetching trade offers: ", err.message)
        res.status(500).json({success:false, message:"Server Error"})
    }
}
//get one
export const getTradeoffer = async(req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message:"invalid offer Id"})
    }
    try{
        const tradeoffer = await Tradeoffer.findById(id)
        res.status(200).json({success: true, data: tradeoffer})
    }catch(err){
        console.log("error in fetching offer: ", err.message)
        res.status(500).json({success:false, message:"Server Error"})
    }

}
//create one
export const createTradeoffer = async (req,res) => {
    const tradeoffer = req.body
    if (!tradeoffer.sender||!tradeoffer.reciever){
        return res.status(400).json({success:false, message: "please provide all fields"})
    }
    const newTradeoffer = new Tradeoffer(tradeoffer)
    try{
        await newTradeoffer.save()
    }catch(err){
        console.error("Error in create offer: ", err.message)
        res.status(500).json({success:false, message:"Server Error"})
    }
}
//update one
export const updateTradeoffer = async (req,res) => {
    const {id} = req.params
    const tradeoffer = req.body
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message:"invalid offer Id"})
    }try{
        const updatedTradeoffer = await Tradeoffer.findByIdAndUpdate(id,tradeoffer,{new:true})
        res.status(200).json({success: true, data: updatedTradeoffer})
    }catch (err){
        res.status(500).json({sucess:false, message: "server error"})
    }
}
//delete one
export const deleteTradeoffer = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message:"invalid offer Id"})
    }

    try{
        await Tradeoffer.findByIdAndDelete(id)
        res.status(200).json({success: true, message:"deleted"})
    }catch (err){
        res.status(500).json({sucess:false, message: "server error"})
    }
}