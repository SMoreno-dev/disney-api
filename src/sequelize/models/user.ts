import { DataTypes, Model } from 'sequelize';

export default (sequelize: any) => {
    //Extend Model class
    class User extends Model {}

    //Initialize User
    User.init({
        uid: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            defaultValue: sequelize.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        sequelize,
        modelName: User.constructor.name
    })

    return User;
}



