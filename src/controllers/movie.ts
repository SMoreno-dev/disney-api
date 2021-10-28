import { Request, Response } from "express";
import db from "../sequelize";
import MovieUtil from "./utils/movie";

export default class Movie {
        //Find a single movie by id
        static async find(req: Request, res: Response) {
            try {
              //Get a character by id
              const movie = await db.Movie.findOne({
                where: { id: req.params.id },
                include: [db.Character, db.Genre]
              })
      
              //If no movie is found...
              if(!movie) {
                return res.status(404).json({message: 'Movie not found'});
              }
      
              //Otherwise, return the movie
              res.json({
                message: 'Movie Information:',
                body: MovieUtil.buildMovies(movie)
              })
      
            } catch (error) {
                console.log(error);
                res.status(500).json({message: 'Internal Server Error'});
            }
          }
}