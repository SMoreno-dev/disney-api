//Imports
import { Sequelize } from "sequelize";
import User from './models/user';
import Character from './models/character';
import Movie from "./models/movie";
import Genre from "./models/genre";
import characterData from "./preload/character";
import movieData from "./preload/movie";
import genreData from "./preload/genre";

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
    Character: Character(sequelize),
    Movie: Movie(sequelize),
    Genre: Genre(sequelize)
}

const preloadData = {
    Character: characterData(db.Character),
    // Movie: movieData(db.Movie),
    // Genre: genreData(db.Genre)
}

//Associations
Object.keys(db).forEach((m: KeyOfDB) => {
    if(db[m].associate) {
        db[m].associate(db);
    }
})

db.sequelize = sequelize;
db.preload = preloadData;

export default db;