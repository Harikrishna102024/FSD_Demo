import dotenv from 'dotenv';
import { Secret, SignOptions} from 'jsonwebtoken';

dotenv.config();

export const  jwtConfig: {secret: Secret, expiresIn: SignOptions['expiresIn']} = {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.ACCESSTOKEN_EXPIRATION as SignOptions['expiresIn']
}


export const jwtRefresh : {secret: Secret, expiresIn: SignOptions['expiresIn']} = {
    secret: process.env.REFRESH_JWT_SECRET!,
    expiresIn: process.env.REFRESHTOKEN_EXPIRATION as SignOptions['expiresIn']
}