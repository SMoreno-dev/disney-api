import express from "express";
import Validator from "../middleware/validator";
import Movie from "../controllers/movie";

const router = express.Router();

//Create movie
router.post("/", Validator.validateToken, Validator.createMovie, Movie.create);

//Read movie by id
router.get("/:id", Validator.validateToken, Movie.find);

//Read movie list
router.get("/", Validator.validateToken, Movie.list);

//Update movie
router.put(
  "/:id",
  Validator.validateToken,
  Validator.updateMovie,
  Movie.update
);

//Delete movie
router.delete("/:id", Validator.validateToken, Movie.delete);

export default router;
