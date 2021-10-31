import { Request, Response } from "express";
import db, { sequelize } from "../sequelize";

export default class Association {
  static async addMovie(req: Request, res: Response) {
    const { charId, movieId } = req.query;

    //BEGIN
    const t = await sequelize.transaction();

    try {
      const char = await db.Character.findOne({
        where: { id: charId },
      });

      const movie = await db.Movie.findOne({
        where: { id: movieId },
      });

      //Check if character and movie exist
      const doesNotExist = (modelName: string) => {
        return res.status(404).json({
          message: `${modelName} does not exist`,
        });
      };

      //If either does not exist...
      if (!char) doesNotExist("Character");
      if (!movie) doesNotExist("Movie");

      //Add movie to character
      const associate = await char.addMovie(movie, { transaction: t });

      if (!associate)
        return res
          .status(500)
          .json({ message: "Internal Error creating association" });

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
}
