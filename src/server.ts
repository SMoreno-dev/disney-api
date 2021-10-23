import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import { sequelize } from './sequelize/index';

const app: Application = express();
const port = process.env.port;

app.get('/', (req: Request, res: Response): void => {
    res.send('<h1>Server Running</h1>');
})

app.use(cors);
app.listen(port, (): void => console.log(`Server running on port ${port}`))

//Check sequelize connection
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
