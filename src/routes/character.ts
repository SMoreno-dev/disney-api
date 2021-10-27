import express from "express";
import Character from "../controllers/character";

const router = express.Router()

//Character by id
router.get('/:id', Character.find);

//Character List
router.get('/', Character.list);


export default router;