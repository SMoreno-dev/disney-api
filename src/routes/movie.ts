import express from "express";
import Movie from "../controllers/movie";

const router = express.Router()

//Read movie by id
router.get('/:id', Movie.find);

export default router;