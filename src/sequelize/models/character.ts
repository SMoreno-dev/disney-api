import { DataTypes, Model } from "sequelize";
import { Models } from "../../types/sequelize";

export default (sequelize: any) => {
  //Extend Model class
  class Character extends Model {
    //Many-to-many association
    static associate(models: Models) {
      this.belongsToMany(models.Movie, { through: "Character_Movie" });
    }
  }

  //Initialize Character
  Character.init(
    {
      img: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          isUrl: true,
        },
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      story: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Character",
    }
  );
  return Character;
};
