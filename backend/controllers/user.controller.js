import User from "../models/users.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jsonwebtoken  from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()
//validate email for stack overflow
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  }

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
        res.status(200).json({success: true, data:user.name})
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
    if (!validateEmail(user.email)){
        return res.status(400).json({success:false, message: "please provide valid email"})
    }
    const takenEmail = await User.findOne({email: req.body.email}).exec()
    if (takenEmail) {
        return res.status(400).json({sucess: false,message: "The email is taken: " })
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
//login
export const login = async (req,res) =>{
    const userCred = req.body

    if ( !userCred.password ||  !userCred.email){
        return res.status(400).json({success:false, message: "please provide all fields"})
    }
    const user = await User.findOne({email: userCred.email}).exec()
    if (user){
        const confirm = await bcrypt.compare(userCred.password, user.password)
        if (confirm){
            const token = jsonwebtoken.sign({id : user.id},process.env.SECRETKEY,{expiresIn:"1h"})
            return res.status(200).json({sucess:true, data: token})
        }else{
            return res.status(401).json({sucess:false, message: "incorrect password"})
        }
    }
    else{
        return res.status(400).json({success:false, message: "User does not exist"})

    }
}