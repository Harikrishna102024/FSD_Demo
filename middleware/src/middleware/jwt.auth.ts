import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import jwtConfig from "../config/jwt";

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({message: "Token not exist"});
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(token, jwtConfig.secret);
        (req as any).user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({message: "Invalied token"});
    }

}