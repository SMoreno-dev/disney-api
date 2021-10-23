import { DataTypes, Model } from 'sequelize';

export default (sequelize: any) => {
    //Extend Model class
    class Character extends Model {}

    //Initialize User
    Character.init({
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
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },{
        sequelize,
        modelName: 'User'
    })

    return Character;
}
