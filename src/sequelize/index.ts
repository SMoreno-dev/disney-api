import { Sequelize } from "sequelize";

const DB_URL = process.env.DB_URL;

//Setting up db connection
const sequelize = new Sequelize(`${DB_URL}`);

//Check connection
const checkConnection = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
} 
checkConnection();

//Syncronize all models
const syncSequelize = async() => {
    await sequelize.sync({ force: true });
}
syncSequelize();


export default sequelize;