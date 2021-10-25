import { Request, Response } from "express";
import { Sequelize } from "sequelize";
import db, { sequelize } from "../sequelize";

export default class Auth {
    static async register(req: Request, res: Response) {
        //Request data
        let {email, password} = req.body;
        email = email.toLowerCase();
        password = password.toString()

        //BEGIN transaction
        const t = await sequelize.transaction();

        try {
            //Create user if it doesn't exist
            const [user, created] = await db.User.findOrCreate({
                where: {email},
                defaults: {password}, 
                transaction: t
            });

            //COMMIT transaction
            await t.commit();

            //If user doesn't exist, return new user
            if(!created) {
                return res.status(403).json({
                    message: `User with email '${email}' already exists.`
                })
            }

            return res.json({
                message: `Created new user:`,
                body: {
                    email: user.email,
                    token: 'TODO: JWT',
                    created: user.createdAt
                }
            });

        } catch (error) {
            //ROLLBACK transaction
            await t.rollback();
            console.log(error);
            res.status(500);
            throw error;
        }
    }
}