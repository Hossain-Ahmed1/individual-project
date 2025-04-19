import Livetrade from "../models/livetrade.model.js";
import mongoose from "mongoose";

//get all
export const getLivetrades = async (req,res) =>{
    try{
        const livetrade = await Livetrade.find({})
        res.status(200).json({success: true, data:livetrade})
    }catch(err){
        console.log("error in fetching live trade: ", err.message)
        res.status(500).json({success:false, message:"Server Error"})
    }
}

//get one
export const getLivetrade = async (req,res) =>{
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message:"invalid Id"})
    }
    try{
        const livetrade = await Livetrade.findById(id)
        res.status(200).json({success: true, data:livetrade})
    }catch(err){
        console.log("error in fetching item: ", err.message)
        res.status(500).json({success:false, message:"Server Error"})
    }
}

//create one
export const createLivetrade = async (req,res) => {
    const livetrade = req.body
    if (!livetrade.sender || !livetrade.invited){
        return res.status(400).json({success:false, message: "please provide all fields"})
    }
    const newLivetrade = new Livetrade(livetrade)
    try{
        await newLivetrade.save()
        res.status(201).json({success: true, data:newLivetrade})
    }catch(err){
        console.error("Error in create live trade: ", err.message)
        res.status(500).json({success:false, message:"Server Error"})
    }
}

//delete one
export const deleteLivetrade = async(req,res) =>{
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message:"invalid item Id"})
    }
    try{
        await Livetrade.findByIdAndDelete(id)
        res.status(200).json({sucess:true, message:"item deleted"})
    }catch(err){
        res.status(500).json({success: false, message:"Server Error"})
    }
}
