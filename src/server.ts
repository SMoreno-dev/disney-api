import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes/auth';
import db from './sequelize/index';

const app: Application = express();
const port = process.env.port;

app.use(cors());
app.use(express.json());
app.listen(port, (): void => console.log(`Server running on port ${port}`));

//Routes
app.get('/', (req: Request, res: Response): void => {
    res.send('<h1>Server Running</h1>');
});

//Auth
app.use('/auth', router);

//Sync
(async(): Promise<void> => {
    await db.sequelize.sync({ force: true });
})();