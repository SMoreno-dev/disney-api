import { Sequelize } from "sequelize";

const DB_URL = process.env.DB_URL;

//Setting up db connection
export const sequelize = new Sequelize(`${DB_URL}`);