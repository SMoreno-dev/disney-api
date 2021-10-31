import { Request, Response, NextFunction } from "express";
import { RequestWithToken, CharacterListRequest } from "../types/request";
import jwt from "jsonwebtoken";

const characterRequest = {
  img: "https://static.wikia.nocookie.net/disney/images/8/8a/Profile_-_Ariel.jpg",
  name: "Ariel",
  age: 16,
  weight: 55,
  story:
    "The seventh and youngest daughter of King Triton and Queen Athena, rulers of the undersea kingdom of Atlantica. Ariel lived through much of her young life with a passionate - yet forbidden - admiration of the human world, and longed to someday experience life on the surface.",
};

const movieRequest = {
  img: "https://lumiere-a.akamaihd.net/v1/images/p_thelittlemermaid_6a6ef760.jpeg",
  title: "The Little Mermaid",
  rating: 4,
  created: "1999-12-07",
};

export default class Validator {
  //Auth route middleware
  static auth(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const validEmail = (userEmail: string) => {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    };

    if (![email, password].every(Boolean)) {
      return res.status(401).json({ message: "Missing Credentials" });
    } else if (!validEmail(email)) {
      return res.status(401).json({ message: "Invalid Email" });
    }

    next();
  }

  //Character POST endpoint middleware
  static createCharacter(
    req: CharacterListRequest,
    res: Response,
    next: NextFunction
  ) {
    const { img, name, age, weight, story } = req.body;

    if (![img, name, age, weight, story].every(Boolean)) {
      return res.status(400).json({
        message:
          "Looks like some data is missing. Your request should look similar to this:",
        requestExample: characterRequest,
      });
    }
    next();
  }

  //Character PUT endpoint middleware
  static updateCharacter(
    req: CharacterListRequest,
    res: Response,
    next: NextFunction
  ) {
    const { img, name, age, weight, story } = req.body;

    if (![img, name, age, weight, story].some(Boolean)) {
      return res.status(400).json({
        message:
          "Looks like some data is missing. Your request should include at least one of these fields:",
        requestExample: characterRequest,
      });
    }
    next();
  }

  //Movie POST endpoint middleware
  static createMovie(req: Request, res: Response, next: NextFunction) {
    const { img, title, rating, created } = req.body;

    if (![img, title, rating, created].every(Boolean)) {
      return res.status(400).json({
        message:
          "Looks like some data is missing. Your request should look similar to this:",
        requestExample: movieRequest,
      });
    }
    next();
  }

  //Movie PUT endpoint middleware
  static updateMovie(req: Request, res: Response, next: NextFunction) {
    const { img, title, rating, created } = req.body;

    if (![img, title, rating, created].some(Boolean)) {
      return res.status(400).json({
        message:
          "Looks like some data is missing. Your request should include at least one of these fields:",
        requestExample: movieRequest,
      });
    }
    next();
  }

  static validateToken(
    req: RequestWithToken,
    res: Response,
    next: NextFunction
  ) {
    //jwt secret
    const secret: any = process.env.SECRET;

    //Auth Header
    const bearerHeader: any = req.headers["authorization"];

    //If no header...
    if (bearerHeader === undefined) {
      return res.status(403).json({
        message: "A token is required to proceed",
      });
    }

    //Split bearer header
    const bearer = bearerHeader.split(" ");

    //Select token
    const bearerToken = bearer[1];

    //Verify token
    jwt.verify(bearerToken, secret, (err: any) => {
      if (err) {
        return res.status(403).json({
          message: "Something went wrong. Maybe your token is invalid?",
        });
      }
    });

    next();
  }
}
