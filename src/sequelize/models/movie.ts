import { DataTypes, Model } from "sequelize";
import { Models } from "../../types/sequelize";

export default (sequelize: any) => {
  //Extend Model class
  class Movie extends Model {
    //Many-to-many association
    static associate(models: Models) {
      this.belongsToMany(models.Character, { through: "Character_Movie" });
      this.belongsToMany(models.Genre, { through: "Movie_Genre" });
    }
  }

  //Initialize Movie
  Movie.init(
    {
      img: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          isUrl: true,
        },
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      created: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );

  return Movie;
};
