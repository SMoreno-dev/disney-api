import { Request, Response } from "express";
import db, { sequelize } from "../sequelize";
import CharacterUtil from "./utils/character";

export default class Character {
    //Create a character
    static async create(req: Request, res: Response) {
      let { img, name, age, weight, story } = req.body;

      //BEGIN transaction
      const t = await sequelize.transaction();

      try {
        //Create character
        const [char, created] = await db.Character.findOrCreate({
          where: {
            name
          },
          defaults: {
            img,
            name,
            age,
            weight,
            story
          },
          transaction: t
        })

        //COMMIT transaction
        await t.commit();

        //If character already exists...
        if(!created) {
          return res.status(403).json({
            message: `Character with name '${name}' already exists.`
          })
        }

        //Otherwise, return character
        res.json({
          message: 'Character successfully created:',
          body: {
            img: char.img,
            name: char.name
          }
        })

      } catch (error) {
        //ROLLBACK transaction
        await t.rollback();
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
        throw error;       
      }
    }    

    //Find a single character by id
    static async find(req: Request, res: Response) {
      try {
        //Get a character by id
        const character = await db.Character.findOne({
          where: { id: req.params.id },
          include: db.Movie
        })

        //If no character is found...
        if(!character) {
          return res.status(404).json({message: 'Character not found'});
        }

        //Otherwise, return the character
        res.json({
          message: 'Character Information:',
          body: CharacterUtil.buildCharacters(character)
        })

      } catch (error) {
          console.log(error);
          res.status(500).json({message: 'Internal Server Error'});
          throw error;
      }
    }

    //Find one or more characters by name, age, or movie
    static async list(req: Request, res: Response) {
        try {
            //Look for character matching queries
            const characters = await db.Character.findAll({
              where: CharacterUtil.buildWhereObject(req.query),
              include: [
                { 
                  model: db.Movie, 
                  where: CharacterUtil.buildIncludeWhereObject(req.query)
                }
              ]
            });
          
            //If no characters are found...
            if(!characters[0]) {
                return res.status(404).json({message: 'No characters found'});
            }

            //Otherwise, return characters
            return res.json({
                message: 'Character List:',
                body: characters.map(CharacterUtil.buildCharacters)
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
            throw error;
        }
    }

}