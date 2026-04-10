import { Request, Response } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import { jwtRefresh } from '../config/jwt';
import { generateToken } from '../services/jwt.service';
import dotenv from 'dotenv'

dotenv.config();


export const refreshAccessToken = async (req: Request, res: Response) => {

    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: "Session expired please login again.." });
    }

    const decoded = jwt.verify(refreshToken, jwtRefresh.secret);

    const user = decoded as any;

    const accessToken = generateToken({
        id: user.id,
        email: user.email,
        role: user.role
    });

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: Number(process.env.ACCESSTOKEN_MAX_AGE)
    });

    return res.status(200).json({
        success: true,
        message: "Access token refreshed"
    });
}


export const deleteCookie = async (req: Request, res: Response) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    })
    
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    })
    
    res.status(200).json({clear: true})
}