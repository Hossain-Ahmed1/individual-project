import Trade from "../models/trade.model.js";
import mongoose from "mongoose";

//create one
export const createTrade = async (req,res) => {
    const trade = req.body
    const newTrade = new Trade(trade)
    try{
        await newTrade.save()
    }catch(err){
        console.error("Error in create offer: ", err.message)
        res.status(500).json({success:false, message:"Server Error"})
    }
}