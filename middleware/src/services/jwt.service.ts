import jwt from 'jsonwebtoken';
import jwtConfig from "../config/jwt";

export const generateToken = (user: {id: number, email: string, role: string}) => {
    const token = jwt.sign(
        {id: user.id, email: user.email, role: user.role},
        jwtConfig.secret,
        {expiresIn: jwtConfig.expiresIn}
    );
    return token;
}