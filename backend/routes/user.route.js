import express from "express";
import { getUsers,getUser,createUser,updateUser,deleteUser,login } from "../controllers/user.controller.js";
const router = express.Router()

router.get("/", getUsers)
router.get("/:id",getUser)
router.post("/", createUser)
router.post("/login", login)
router.put("/:id", updateUser)
router.delete("/:id", deleteUser)

export default router