import { Request, Response } from "express";
import db, { sequelize } from "../sequelize";
import bcrypt from "bcrypt";

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
                where: { email },
                defaults: { password: await bcrypt.hash(password, 10) },
                transaction: t
            });

            //COMMIT transaction
            await t.commit();

            //If user exists...
            if(!created) {
                return res.status(403).json({
                    message: `User with email '${email}' already exists.`
                })
            }

            //If user doesn't exist, create a new one and return the data
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
            res.status(500).json({message: 'Internal Server Error'});
            throw error;
        }
    }

    static async login(req: Request, res: Response) {
        //Request data
        let {email, password} = req.body;
        email = email.toLowerCase();
        password = password.toString()

        try {
            //Find out if user exists
            const user = await db.User.findOne({
                where: { email }
            })

            //If user not found
            if(!user) {
                return res.json({message: `User not found. Sign up at auth/register`});
            }

            //If user exists, verify password
            const hash = user.password;
            const authenticate = await bcrypt.compare(password, hash);

            //Wrong Credentials
            if(!authenticate) return res.status(401).json({message: `Wrong credentials`});

            //Logged in
            return res.json({
                message: `Successfully logged in`,
                token: 'TODO JWT'
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal Server Error'});
            throw error;
        }
    }
}