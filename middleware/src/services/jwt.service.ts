import jwt from 'jsonwebtoken';
import jwtConfig from "../config/jwt";

export const generateToken = (user: {id: number, email: string}) => {
    const token = jwt.sign(
        {id: user.id, email: user.email},
        jwtConfig.secret,
        {expiresIn: jwtConfig.expiresIn}
    );
    return token;
}