import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../models/users.model';
import { generateRefreshToken, generateToken } from '../services/jwt.service';
import logger from '../config/winston'
import emailQueue from "../queues/email.queue";
import dotenv from 'dotenv'

dotenv.config();

const userService = new UserService();


export class PublicUserController {

    registerUser = async (req: Request, res: Response) => {

        const status = await userService.checkExistingFields(req.body);

        if (status) {
            logger.warn(`User try to insert exixting data`)
            return res.status(400).json({
                success: false,
                message: 'User with the same email already exists',
                duplicate: true
            });
        } else {

            try {

                const payload = req.body;
                const file = req.file

                const userData: User = {
                    first_name: payload.firstName,
                    last_name: payload.lastName,
                    age: Number(payload.age),
                    location: payload.location,
                    status: payload.status,
                    email: payload.email,
                    password: payload.password,
                    profiles: file ? file.filename : null,
                };

                const result = await userService.createUser(userData);

                if (result.regStatus) {
                    const subject = 'reg';
                    await emailQueue.add('send-email',
                        {
                            to: req.body.email,
                            subject: subject
                        }
                    )
                }

                logger.info(`New user registered ${userData.first_name}`)

                return res.status(201).json({
                    message: 'User registered successfully',
                });

            } catch (error) {
                logger.error(`Regiteration faild`)
                console.error(error);
                return res.status(500).json({
                    message: 'Failed to register user',
                });
            }
        }
    }




    validateUserData = async (req: Request, res: Response) => {

        try {

            const email = req.body.email;
            const password = req.body.password

            const user = await userService.validateUserData(email, password);

            if (user) {
                logger.info(`User ${email} logIn`)
                const accessToken = generateToken(user);
                const refreshToken = generateRefreshToken(user);

                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production" ? true : false,
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                    maxAge: Number(process.env.ACCESSTOKEN_MAX_AGE)
                });

                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production" ? true : false,
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                    maxAge: Number(process.env.REFRESHTOKEN_MAX_AGE)
                });

                const subject = 'log';

                await emailQueue.add('send-email',
                    {
                        to: req.body.email,
                        subject: subject
                    }
                )

                const { id, role, } = user;

                return res.status(200).json({
                    success: true,
                    message: 'User login successfully',
                    logData: { id, role, logStatus: true }
                });

            } else {
                logger.error(`logIn faild ${email} - ${password}`)
                return res.status(400).json({
                    success: false,
                    count: true,
                    message: 'User not exist or wrong password'
                });
            }

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "check data base connection"
            })
        }
    }
}