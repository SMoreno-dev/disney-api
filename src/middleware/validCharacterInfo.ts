import { Request, Response, NextFunction } from "express";

export default class Validator {
    static async create(req: Request, res: Response, next: NextFunction) {
        const { img, name, age, weight, story }  = req.body;
            
        if (![img, name, age, weight, story].every(Boolean)) {
            return res.status(500).json({ 
                message: "Looks like some data is missing. Your request should look similar to this:",
                requestExample: {
                    img: "https://static.wikia.nocookie.net/disney/images/8/8a/Profile_-_Ariel.jpg",
                    name: "Ariel",
                    age: 16,
                    weight: 55,
                    story: "The seventh and youngest daughter of King Triton and Queen Athena, rulers of the undersea kingdom of Atlantica. Ariel lived through much of her young life with a passionate - yet forbidden - admiration of the human world, and longed to someday experience life on the surface."
                }
            });
        }
            
        next();
          
    }
}

