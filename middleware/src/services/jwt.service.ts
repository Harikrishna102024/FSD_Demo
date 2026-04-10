import jwt from 'jsonwebtoken';
import { jwtConfig, jwtRefresh } from "../config/jwt";

export const generateToken = (user: { id: number, email: string, role: string }) => {
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
    );
    return token;
}

export const generateRefreshToken = (user: { id: number, email: string, role: string }) => {
    const refreshToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        jwtRefresh.secret,
        { expiresIn: jwtRefresh.expiresIn }
    );
    return refreshToken;
}