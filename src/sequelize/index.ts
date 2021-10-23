import { Sequelize } from "sequelize";
import User from './models/user';
import Character from './models/character';

//Env var
const DB_URL = process.env.DB_URL;

//Setting up db connection
export const sequelize = new Sequelize(`${DB_URL}`);

//Db types
type Database = {[key: string]: any}
type KeyOfDB = Extract<keyof Database, string>

//Create Models
const db: Database = {
    User: User(sequelize),
    Character: Character(sequelize)
}

//Associations
Object.keys(db).forEach((m: KeyOfDB) => {
    if(db[m].associate) {
        db[m].associate(db);
    }
})

export default db;