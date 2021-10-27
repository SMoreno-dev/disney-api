import { DataTypes, Model } from 'sequelize';

//Models type
type Models = {[key: string]: any}

export default (sequelize: any) => {
    //Extend Model class
    class Genre extends Model {
        //Many-to-many association
        static associate(models: Models) {
            this.belongsToMany(models.Movie, { through: 'Movie_Genre' });
        }
    }

    //Initialize Genre
    Genre.init({
        img: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            validate: {
                isUrl: true
            }
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        }
    },{
        sequelize,
        modelName: 'Genre'
    })

    return Genre;
}