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

        //Find one or more movies by name, genre, or id order
        static async list(req: Request, res: Response) {
          const { name, order } = req.query;
            try {
                //Look for movies matching queries
                const movies = await db.Movie.findAll({
                  where: name ? { title: name } : {},
                  order: order ? [['id', order]] : [['id', 'ASC']],
                  include: [
                    {
                      model: db.Character,
                      required: false
                    },
                    { 
                      model: db.Genre, 
                      where: MovieUtil.buildIncludeWhereObject(req.query),
                      required: false
                    }
                  ]
                });
              
                //If no movies are found...
                if(!movies[0]) {
                    return res.status(404).json({message: 'No movies found'});
                }

                //Otherwise, return movies
                return res.json({
                    message: 'Movie List:',
                    body: movies.map(MovieUtil.buildMovies)
                });

            } catch (error) {
                res.status(500).json({message: 'Internal Server Error'});
                console.log(error);
            }
    }  
}