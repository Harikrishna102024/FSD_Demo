import dotenv from 'dotenv';
import { Secret, SignOptions} from 'jsonwebtoken';

dotenv.config();

const jwtConfig: {secret: Secret, expiresIn: SignOptions['expiresIn']} = {
    secret: process.env.JWT_SECRET!,
    expiresIn: '24h'
}

export default jwtConfig;