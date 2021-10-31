import express from "express";
import Validator from "../middleware/validator";

const router = express.Router();

//Associate a movie to a character
router.post("/character-movie/:id", Validator.validateToken);

export default router;
