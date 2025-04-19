import express from "express";
import { getLivetrade,getLivetrades,createLivetrade,deleteLivetrade } from "../controllers/livetrade.controller.js";

const router = express.Router()
router.post("/", createLivetrade)
router.get("/",getLivetrades)
router.get("/:id",getLivetrade)
router.delete("/:id",deleteLivetrade)
export default router