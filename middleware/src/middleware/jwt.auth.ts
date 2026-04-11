import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { jwtAccessConfig } from "../config/jwt";

export const jwtAuth = (req: Request, res: Response, next: NextFunction) => {

    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
        return res.status(401).json({ message: "Token not exist" });
    }

    try {
        const decoded = jwt.verify(accessToken, jwtAccessConfig.secret);
        (req as any).user = decoded;
        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalied token" });
    }

}