import { Request, Response } from "express";
import db from "../sequelize";

export default class Character {
    static async list(req: Request, res: Response) {
        try {
            const characters = await db.Character.findAll({
                include: db.Movie
            });
            if(!characters[0]) {
                res.status(404).json({message: 'No characters found'});
            }
            return res.json({
                message: 'Full Character List:',
                body: characters.map((c: any) => ({
                    id: c.id,
                    img: c.img,
                    name: c.name,
                    age: c.age,
                    weight: c.weight,
                    story: c.story,
                    movies: c.Movies[0].title
                }))
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
            throw error;
        }
    }
}