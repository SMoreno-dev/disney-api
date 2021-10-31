import { Request, Response } from "express";
import db, { sequelize } from "../sequelize";
import MovieUtil from "./utils/movie";

export default class Movie {
  //Create a movie
  static async create(req: Request, res: Response) {
    let { img, title, rating, created } = req.body;

    //BEGIN transaction
    const t = await sequelize.transaction();

    try {
      //Create movie
      const [movie, movieWasCreated] = await db.Movie.findOrCreate({
        where: {
          title,
        },
        defaults: {
          img,
          title,
          rating,
          created,
        },
        transaction: t,
      });

      //If movie already exists...
      if (!movieWasCreated) {
        return res.status(403).json({
          message: `Movie with title '${title}' already exists.`,
        });
      }

      //COMMIT transaction
      await t.commit();

      //Otherwise, return movie
      res.json({
        message: "Movie successfully created:",
        body: MovieUtil.buildMovies(movie),
      });
    } catch (error) {
      //ROLLBACK transaction
      await t.rollback();
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //Find a single movie by id
  static async find(req: Request, res: Response) {
    try {
      //Get a movie by id
      const movie = await db.Movie.findOne({
        where: { id: req.params.id },
        include: [db.Character, db.Genre],
      });

      //If no movie is found...
      if (!movie) {
        return res.status(404).json({ message: "Movie not found" });
      }

      //Otherwise, return the movie
      res.json({
        message: "Movie Information:",
        body: MovieUtil.buildMovies(movie),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //Find one or more movies by name, genre, or id order
  static async list(req: Request, res: Response) {
    const { name, order } = req.query;
    try {
      //Look for movies matching queries
      const movies = await db.Movie.findAll({
        where: name ? { title: name } : {},
        order: order ? [["id", order]] : [["id", "ASC"]],
        include: [
          {
            model: db.Genre,
            where: MovieUtil.buildIncludeWhereObject(req.query),
            required: false,
          },
        ],
      });

      //If no movies are found...
      if (!movies[0]) {
        return res.status(404).json({ message: "No movies found" });
      }

      //Otherwise, return movies
      return res.json({
        message: "Movie List:",
        body: movies.map((m: any) => ({
          img: m.img,
          title: m.title,
          created: m.created,
        })),
      });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  //Update a movie
  static async update(req: Request, res: Response) {
    const { id } = req.params;

    //BEGIN transaction
    const t = await sequelize.transaction();

    try {
      //Make sure movie exists
      const findMovie = await db.Movie.findOne({
        where: { id },
      });

      //If movie does not exist...
      if (!findMovie) {
        //ROLLBACK
        t.rollback();
        return res.status(404).json({ message: "Movie does not exist." });
      }

      //Update movie
      const updateMovie = await db.Movie.update(
        MovieUtil.buildUpdateObject(req.body),
        {
          where: { id },
          include: [{ model: db.Genre }, { model: db.Movie }],
          returning: true,
        }
      );

      //If movie wasn't updated...
      if (!updateMovie) {
        t.rollback();
        return res
          .status(500)
          .json({ message: "Internal Server Error updating movie" });
      }

      //COMMIT
      await t.commit();

      //Return movie
      res.json({
        message: "Movie succesfully updated",
        body: MovieUtil.buildMovies(updateMovie[1][0]),
      });
    } catch (error) {
      //ROLLBACK
      await t.rollback();
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //Delete a movie
  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    //BEGIN transaction
    const t = await sequelize.transaction();

    try {
      //Make sure movie exists
      const findMovie = await db.Movie.findOne({
        where: { id },
      });

      //If movie does not exist...
      if (!findMovie) {
        //ROLLBACK
        t.rollback();
        return res.status(404).json({ message: "Movie does not exist." });
      }

      //Delete movie
      const deleteMovie = await db.Movie.destroy({
        where: { id },
      });

      //If movie wasn't deleted...
      if (!deleteMovie) {
        t.rollback();
        return res
          .status(500)
          .json({ message: "Internal Server Error deleting movie" });
      }

      //COMMIT
      await t.commit();

      //Return message
      res.json({
        message: `Movie '${findMovie.title}' with id of '${id}' successfully deleted.`,
      });
    } catch (error) {
      //ROLLBACK
      await t.rollback();
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
