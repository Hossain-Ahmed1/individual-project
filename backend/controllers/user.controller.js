import User from "../models/users.model.js";
import mongoose from "mongoose";

//get all
export const getUsers = async (req,res) =>{
    try{
        const users = await User.find({})
        res.status(200).json({success: true, data:users})
    }catch(err){
        console.log("error in fetching users: ", err.message)
        res.status(500).json({success:false, message:"Server Error"})
    }
}
//get one
export const getUser = async (req,res) =>{
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message:"invalid user Id"})
    }
    try{
        const user = await User.findById(id)
        res.status(200).json({success: true, data:user})
    }catch(err){
        console.log("error in fetching users: ", err.message)
        res.status(500).json({success:false, message:"Server Error"})
    }
}
//create one
export const createUser = async (req,res) =>{
    const user = req.body

    if (!user.name || !user.password ||  !user.email){
        return res.status(400).json({success:false, message: "please provide all fields"})
    }
    const newUser = new User(user)
    try{
        await newUser.save()
        res.status(201).json({success: true, data:newUser})
    }catch(err){
        console.error("Error in create user: ", err.message)
        res.status(500).json({success:false, message:"Server Error"})
    }
}
//update one
export const updateUser = async (req,res) =>{
    const {id} = req.params

    const item = req.body

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message:"invalid user Id"})
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(id,item,{new:true})
        res.status(200).json({success: true, data:updatedUser})
    }catch (err){
        res.status(500).json({sucess:false, message: "server error"})
    }
}
//delete one
export const deleteUser = async (req,res) =>{
    const {id} = req.params

    const item = req.body

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({sucess: false, message:"invalid user Id"})
    }

    try{
        await User.findByIdAndDelete(id)
        res.status(200).json({success: true, message:"deleted"})
    }catch (err){
        res.status(500).json({sucess:false, message: "server error"})
    }
}