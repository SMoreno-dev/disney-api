import express from "express";
import Character from "../controllers/character";
import validCharacterInfo from "../middleware/validCharacterInfo";

const router = express.Router()

//Character by id
router.get('/:id', Character.find);

//Character List
router.get('/', Character.list);

//Create character
router.post('/', validCharacterInfo, Character.create);

//Update character
router.put('/');

export default router;