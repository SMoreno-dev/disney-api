import { DataTypes, Model } from 'sequelize';

export default (sequelize: any) => {
    //Extend Model class
    class Genre extends Model {}

    //Initialize Genre
    Genre.init({
        img: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isUrl: true
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },{
        sequelize,
        modelName: Genre.constructor.name
    })

    return Genre;
}