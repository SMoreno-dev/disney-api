import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes/auth';
import db from './sequelize/index';
import characterData from "./sequelize/preload/character";
import movieData from "./sequelize/preload/movie";
import genreData from "./sequelize/preload/genre";

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

//Sync and preload
(async(): Promise<void> => {
    const sync = await db.sequelize.sync({ force: true });
    if(sync !== undefined) {
        await characterData(db.Character);
        await genreData(db.Genre);
        await movieData(db.Movie);
    }
})();
