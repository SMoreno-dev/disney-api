import { Request, response, Response } from "express";
import db, { sequelize } from "../sequelize";

export default class Character {

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
          body: Character.buildCharacters(character)
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
              where: Character.buildWhereObject(req.query),
              include: [
                { 
                  model: db.Movie, 
                  where: Character.buildIncludeWhereObject(req.query)
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
                body: characters.map(Character.buildCharacters)
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
            throw error;
        }
    }

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
            // id: char.id,
            img: char.img,
            name: char.name,
            // age: char.age,
            // weight: char. weight,
            // story: char.story
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

    //Builds where object only if movie query exists
    private static buildIncludeWhereObject(query: any) {
      let where: any = {}

      if(query.movies) {
        where.id = query.movies
      }
      return where;
    }

    //Builds object if name or age queries exist
    private static buildWhereObject(query: any) {
        let where: any = {};
        if(query.name) {
          where.name = query.name
        } 
        
        if(query.age) {
          where.age = query.age
        }

        return where;
      }
      
      //Builds an object for a character
      private static buildCharacters(c: any) {
        return {
          id: c.id,
          img: c.img,
          name: c.name,
          age: c.age,
          weight: c.weight,
          story: c.story,
          movies: c.Movies.map((t: any) => t.title)
        };
      }
}