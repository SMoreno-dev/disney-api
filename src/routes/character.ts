import express from "express";
import Character from "../controllers/character";
import Validator from "../middleware/validator";

const router = express.Router();

//Create character
router.post(
  "/",
  Validator.validateToken,
  Validator.createCharacter,
  Character.create
);

//Read character by id
router.get("/:id", Validator.validateToken, Character.find);

//Read character List
router.get("/", Validator.validateToken, Character.list);

//Update character
router.put(
  "/:id",
  Validator.validateToken,
  Validator.updateCharacter,
  Character.update
);

//Delete Character
router.delete("/:id", Validator.validateToken, Character.delete);

export default router;
