import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();
const port = process.env.port;

app.get('/', (req: Request, res: Response): void => {
    res.send('<h1>Server Running</h1>');
})

app.use(cors);
app.listen(port, (): void => console.log(`Server running on port ${port}`))