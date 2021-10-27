import express from "express";
import Character from "../controllers/character";

const router = express.Router()

//Character List
router.get('/', Character.find);

export default router;