import { DataTypes, Model } from 'sequelize';

export default (sequelize: any) => {
    //Extend Model class
    class User extends Model {}

    //Initialize User
    User.init({
        uid: {
            type: DataTypes.UUID,
            allowNull: false,
            defaultValue: sequelize.literal('uuid_generate_v4()'),
            primaryKey: true
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
        modelName: 'User'
    })

    return User;
}



