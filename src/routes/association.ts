import express from "express";
import Association from "../controllers/association";
import Validator from "../middleware/validator";

const router = express.Router();

//Associate a movie to a character
router.post("/character-movie", Validator.validateToken, Association.addMovie);

export default router;
