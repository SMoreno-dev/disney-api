import db from "../../sequelize";

export default class AssociationUtil {
  static async checkForCharacterAndMovie(charId: any, movieId: any) {
    const result: any = {};

    const char = await db.Character.findOne({
      where: { id: charId },
    });

    const movie = await db.Movie.findOne({
      where: { id: movieId },
    });

    const doesNotExist = (model: string) => {
      result.notFound = `${model} does not exist`;
      return result;
    };

    //Check if either does not exist
    if (!char && !movie) {
      result.notFound = `Character and movie do not exist`;
      return result;
    } else if (!char) {
      doesNotExist("Character");
    } else if (!movie) {
      doesNotExist("Movie");
    }

    //Return data
    result.char = char;
    result.movie = movie;
    return result;
  }
}
