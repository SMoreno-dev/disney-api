import express from "express";
import Association from "../controllers/association";
import Validator from "../middleware/validator";

const router = express.Router();

//Associate a movie to a character
router.post("/character-movie", Validator.validateToken, Association.addMovie);

//Remove a movie associated to a character
router.delete(
  "/character-movie",
  Validator.validateToken,
  Association.deleteMovie
);

//Associate a genre to a movie
router.post("/movie-genre", Validator.validateToken);

export default router;
