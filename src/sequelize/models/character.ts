import { DataTypes, Model } from 'sequelize';
import preload from '../preload/character';

//Models type
type Models = {[key: string]: any}

export default (sequelize: any) => {
    //Extend Model class
    class Character extends Model {
        //Many-to-many association
        static associate(models: Models) {
            this.belongsToMany(models.Movie, { through: 'Character_Movie' });
        }
    }

    //Initialize Character
    Character.init({
        img: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.TEXT,
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
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        }
    },{
        sequelize,
        modelName: 'Character'
    })
    return Character;
}
