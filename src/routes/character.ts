import express from "express";
import Character from "../controllers/character";
import Validator from "../middleware/validator";

const router = express.Router()

//Create character
router.post('/', Validator.createCharacter, Character.create);

//Read character by id
router.get('/:id', Character.find);

//Read character List
router.get('/', Character.list);


//Update character
router.put('/:id', Validator.updateCharacter, Character.update);

//Delete Character
router.delete('/:id');

export default router;