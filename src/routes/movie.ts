import express from "express";
import Validator from "../middleware/validator";
import Movie from "../controllers/movie";

const router = express.Router();

//Create movie
router.post("/", Validator.createMovie, Movie.create);

//Read movie by id
router.get("/:id", Movie.find);

//Read movie list
router.get("/", Movie.list);

//Update movie
router.post("/:id", Movie.update);

export default router;
