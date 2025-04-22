import Item from "../models/items.model.js";
import mongoose from "mongoose";

export const getItems = async (req,res) =>{
    try{
        const items = await Item.find({})
        return res.status(200).json({success: true, data:items})
    }catch(err){
        console.log("error in fetching items: ", err.message)
        return res.status(500).json({success:false, message:"Server Error"})
    }
}

//get one
export const getItem = async (req,res) =>{
    const {id} = req.params
    
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message:"invalid item Id"})
    }
    try{
        const item = await Item.findById(id)
        res.status(200).json({success: true, data:item})
    }catch(err){
        console.log("error in fetching item: ", err.message)
        res.status(500).json({success:false, message:"Server Error"})
    }
}

export const createItem = async(req,res) =>{
    const item = req.body

    if (!item.name ){
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
        res.status(200).json({sucess:true, message:"item deleted"})
    }catch(err){
        res.status(500).json({success: false, message:"Server Error"})
    }
}
