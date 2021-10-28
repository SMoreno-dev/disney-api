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
              where: CharacterUtil.buildListWhereObject(req.query),
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

    //Update a character
    static async update(req: Request, res: Response) {
      const { id } = req.params;
      
      //BEGIN transaction
      const t = await sequelize.transaction();

      try {
        //Make sure character exists
        const findCharacter = await db.Character.findOne({
          where: { id }
        })

        //If character does not exist...
        if(!findCharacter) {
          //ROLLBACK
          t.rollback()
          return res.status(404).json({ message: 'Character does not exist.'});
        }

        //Update character
        const updateChar = await db.Character.update(
          CharacterUtil.buildUpdateObject(req.body), 
          { 
            where: { id },
            include: {model: db.Movie},
            returning: true
          })

        //If character wasn't updated...
        if(!updateChar) {
          t.rollback();
          return res.status(500).json({ message: 'Internal Server Error updating character' });
        }

        //COMMIT
        await t.commit();
        
        //Return character
        res.json({
          message: 'Character succesfully updated',
          body: CharacterUtil.buildCharacters(updateChar[1][0])
        })

      } catch (error) {
        //ROLLBACK
        await t.rollback();
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
        throw error;
      }
    }

    //Delete a character
    static async delete(req: Request, res: Response) {
      const { id } = req.params;
      
      //BEGIN transaction
      const t = await sequelize.transaction();

      try {
        //Make sure character exists
        const findCharacter = await db.Character.findOne({
          where: { id }
        })

        //If character does not exist...
        if(!findCharacter) {
          //ROLLBACK
          t.rollback()
          return res.status(404).json({ message: 'Character does not exist.'});
        }

        //Delete character
        const deleteChar = await db.Character.destroy({
          where: { id }
        })

        //If character wasn't deleted...
        if(!deleteChar) {
          t.rollback()
          return res.status(500).json({ message: 'Internal Server Error deleting character' });
        }

        //COMMIT
        await t.commit()

        //Return message
        res.json({ message: `Character '${findCharacter.name}' with id of '${id}' successfully deleted.`})

      } catch (error) {
        //ROLLBACK
        await t.rollback();
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
        throw error;
      }
    }
}