import express from "express";
import Character from "../controllers/character";
import Validator from "../middleware/validator";

const router = express.Router()

//Character by id
router.get('/:id', Character.find);

//Character List
router.get('/', Character.list);

//Create character
router.post('/', Validator.createCharacter, Character.create);

//Update character
router.put('/:id', Validator.updateCharacter, Character.update);

export default router;