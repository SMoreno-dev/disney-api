import { DataTypes, Model } from 'sequelize';

export default (sequelize: any) => {
    //Extend Model class
    class Movie extends Model {}

    //Initialize Movie
    Movie.init({
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isUrl: true
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        created: {
            type: DataTypes.DATE,
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