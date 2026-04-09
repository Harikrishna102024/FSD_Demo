import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import jwtConfig from "../config/jwt";

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies?.accessToken;

    if(!token) {
        return res.status(401).json({message: "Token not exist"});
    }

    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        (req as any).user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({message: "Invalied token"});
    }

}