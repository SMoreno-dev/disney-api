import { Sequelize } from "sequelize";
import User from './models/user'


const DB_URL = process.env.DB_URL;

//Setting up db connection
export const sequelize = new Sequelize(`${DB_URL}`);

//Create Models
const db = {
    User: User(sequelize)
}

export default db;