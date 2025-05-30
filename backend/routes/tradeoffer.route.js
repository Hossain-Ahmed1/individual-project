import express from "express";
import { getTradeoffers,getTradeoffer,updateTradeoffer,deleteTradeoffer, createTradeoffer } from "../controllers/tradeoffer.controller.js";

const router=express.Router()

router.post("/", createTradeoffer)
router.get("/",getTradeoffers)
router.delete("/:id",deleteTradeoffer)
export default router