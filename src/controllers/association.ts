import { Request, Response } from "express";
import db, { sequelize } from "../sequelize";
import AssociationUtil from "./utils/association";

export default class Association {
  static async addMovie(req: Request, res: Response) {
    const { charId, movieId } = req.query;

    //BEGIN
    const t = await sequelize.transaction();

    try {
      //Check if character and movie exist
      const check = await AssociationUtil.checkForCharacterAndMovie(
        charId,
        movieId
      );
      if (check.notFound) {
        return res.status(404).json({ message: check.notFound });
      }

      //Add movie to character
      const { char, movie } = check;
      const associate = await char.addMovie(movie, { transaction: t });

      if (!associate)
        return res.status(500).json({
          message:
            "Internal Error creating association. Maybe it was already associated?",
        });

      //COMMIT
      await t.commit();

      return res.json({
        message: "Successfully associated movie to character",
      });
    } catch (error) {
      //ROLLBACK
      await t.rollback();
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteMovie(req: Request, res: Response) {
    const { charId, movieId } = req.query;

    //BEGIN
    const t = await sequelize.transaction();

    try {
      //Check if character and movie exist
      const check = await AssociationUtil.checkForCharacterAndMovie(
        charId,
        movieId
      );
      if (check.notFound) {
        return res.status(404).json({ message: check.notFound });
      }

      //Remove movie from character
      const { char, movie } = check;
      const associate = await char.removeMovie(movie, { transaction: t });

      if (!associate)
        return res.status(500).json({
          message:
            "Internal Error removing association. Maybe that movie wasn't associated?",
        });

      //COMMIT
      await t.commit();

      return res.json({
        message: "Successfully removed movie association from character",
      });
    } catch (error) {
      //ROLLBACK
      await t.rollback();
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async addGenre(req: Request, res: Response) {
    const { movieId, genreId } = req.query;

    //BEGIN
    const t = await sequelize.transaction();

    try {
      //Check if genre and movie exist
      const check = await AssociationUtil.checkForGenreAndMovie(
        movieId,
        genreId
      );

      //Genre or movie not found
      if (check.notFound) {
        return res.status(404).json({ message: check.notFound });
      }

      //Add genre to movie
      const { movie, genre } = check;
      const associate = await movie.addGenre(genre, { transaction: t });

      //Association failed
      if (!associate)
        return res.status(500).json({
          message:
            "Internal Error creating association. Maybe it was already associated?",
        });

      //COMMIT
      await t.commit();

      return res.json({
        message: "Successfully associated genre to movie",
      });
    } catch (error) {
      //ROLLBACK
      await t.rollback();
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteGenre(req: Request, res: Response) {
    const { movieId, genreId } = req.query;

    //BEGIN
    const t = await sequelize.transaction();

    try {
      //Check if genre and movie exist
      const check = await AssociationUtil.checkForGenreAndMovie(
        movieId,
        genreId
      );

      //Movie and/or genre not found
      if (check.notFound) {
        return res.status(404).json({ message: check.notFound });
      }

      //Remove genre from movie
      const { movie, genre } = check;
      const associate = await movie.removeGenre(genre, { transaction: t });

      if (!associate)
        return res.status(500).json({
          message:
            "Internal Error removing association. Maybe that genre wasn't associated?",
        });

      //COMMIT
      await t.commit();

      return res.json({
        message: "Successfully removed genre association from movie",
      });
    } catch (error) {
      //ROLLBACK
      await t.rollback();
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
