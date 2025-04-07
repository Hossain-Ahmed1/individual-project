import Item from "../models/items.model.js";
import mongoose from "mongoose";

export const getItems = async (req,res) =>{
    try{
        const items = await Item.find({})
        res.status(200).json({success: true, data:items})
    }catch(err){
        console.log("error in fetching items: ", err.message)
        res.status(500).json({success:false, message:"Server Error"})
    }
}

export const createItem = async(req,res) =>{
    const item = req.body

    if (!item.name || !item.quantity ){
        return res.status(400).json({success:false, message: "please provide all fields"})
    }

    const newItem = new Item(item)

    try{
        await newItem.save()
        res.status(201).json({success: true, data:newItem})
    }catch(err){
        console.error("Error in create item: ", err.message)
        res.status(500).json({success:false, message:"Server Error"})
    }

}

export const updateItem = async(req,res) =>{
    const {id} = req.params

    const item = req.body

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message:"invalid item Id"})
    }

    try{
        const updatedItem = await Item.findByIdAndUpdate(id,item,{new:true})
        res.status(200).json({success: true, data:updatedItem})
    }catch (err){
        res.status(500).json({sucess:false, message: "server error"})
    }
}

export const deleteItem = async(req,res) =>{
    const {id} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message:"invalid item Id"})
    }

    try{
        await Item.findByIdAndDelete(id)
        res.status(200).json({sucess:true, message:"test"})
    }catch(err){
        res.status(500).json({success: false, message:"Server Error"})
    }
}
