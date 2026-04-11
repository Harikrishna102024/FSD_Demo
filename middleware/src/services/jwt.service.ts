import jwt from 'jsonwebtoken';
import { jwtAccessConfig, jwtRefreshConfig } from "../config/jwt";

export const generateToken = (user: { id: number, email: string, role: string }) => {
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        jwtAccessConfig.secret,
        { expiresIn: jwtAccessConfig.expiresIn }
    );
    return token;
}

export const generateRefreshToken = (user: { id: number, email: string, role: string }) => {
    const refreshToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        jwtRefreshConfig.secret,
        { expiresIn: jwtRefreshConfig.expiresIn }
    );
    return refreshToken;
}