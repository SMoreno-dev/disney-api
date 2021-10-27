import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    const { email, password }  = req.body;

    const validEmail = (userEmail: string) => {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (![email, password].every(Boolean)) {
        return res.status(401).json({ message: "Missing Credentials"});
        
    } else if (!validEmail(email)) {
        return res.status(401).json({ message: "Invalid Email"});
    }
    
    next();
  };