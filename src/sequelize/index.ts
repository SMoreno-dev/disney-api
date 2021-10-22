import { Sequelize } from "sequelize";

const password = process.env.PASS;

//Setting up db connection
const sequelize = new Sequelize(`postgres://postgres:${password}@localhost:5432/disney`);

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