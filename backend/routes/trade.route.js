import express from "express";
import { createTrade } from "../controllers/trade.controller.js";

const router=express.Router()

router.post("/", createTrade)
export default router