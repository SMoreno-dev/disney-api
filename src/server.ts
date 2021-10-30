//Dependencies
import express, { Application, Request, Response } from "express";
import cors from "cors";

//Routes
import authRoute from "./routes/auth";
import characterRoute from "./routes/character";
import movieRoute from "./routes/movie";

//Sequelize
import db from "./sequelize/index";
import loadGenres from "./sequelize/preload/genre";
import loadMovies from "./sequelize/preload/movie";
import loadCharacters from "./sequelize/preload/character";

const app: Application = express();
const port = process.env.port;

app.use(cors());
app.use(express.json());
app.get("/", (req: Request, res: Response): void => {
  res.send("<h1>Server Running</h1>");
});

//Auth Route
app.use("/auth", authRoute);

//Character Route
app.use("/characters", characterRoute);

//Movie Route
app.use("/movies", movieRoute);

//Sync and preload
(async (): Promise<void> => {
  const sync = await db.sequelize.sync({ force: true });
  if (sync !== undefined) {
    await loadGenres(db.Genre);
    await loadMovies(db.Movie);
    await loadCharacters(db.Character);
  }
})();

app.listen(port, () => {
  console.log(`Server runing on ${port}`);
  app.emit("app_started");
});

export default app;
