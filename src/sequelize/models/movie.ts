import { DataTypes, Model } from 'sequelize';

//Models type
type Models = {[key: string]: any}

export default (sequelize: any) => {
    //Extend Model class
    class Movie extends Model {
        //Many-to-many association
        static associate(models: Models) {
            this.belongsToMany(models.Character, { through: 'Character_Movie'} );
            this.belongsToMany(models.Genre, { through: 'Movie_Genre' });
        }
    }

    //Initialize Movie
    Movie.init({
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        created: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        }
    },{
        sequelize,
        modelName: 'Movie'
    })
    
    return Movie;
}