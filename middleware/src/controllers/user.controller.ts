import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../models/users.model';
import { generateToken } from '../services/jwt.service';
import { GmailService } from '../services/mail/gmail.service';
import logger from '../config/winston'
import emailQueue from "../queues/email.queue";


const userService = new UserService();
// const mailService = new GmailService();

export class userController {

    // Method to handle user registration
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

                const userData: User = {
                    first_name: payload.firstName,
                    last_name: payload.lastName,
                    age: Number(payload.age),
                    location: payload.location,
                    status: payload.status,
                    email: payload.email,
                    password: payload.password,
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


    // Method to fetch all users data
    getUsersData = async (req: Request, res: Response) => {

        try {
            const userData = await userService.getAllUsers();

            return res.status(200).json({
                success: true,
                message: 'Fetching successful',
                data: userData
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch users data',
            });
        }
    }



    //method to delete a user by ID 
    deleteUserData = async (req: Request, res: Response) => {

        try {
            const userId = Number(req.params.id);
            await userService.deleteUser(userId);

            return res.status(200).json({
                success: true,
                message: 'User deleted successfully',
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: 'Failed to delete user',
            });
        }
    }



    updateUserData = async (req: Request, res: Response) => {
        try {
            const ID = req.body.id;
            const DATA = req.body;

            type usrUpdateData = Partial<User>;

            const usrUpdateData = {
                first_name: DATA.firstName,
                last_name: DATA.lastName,
                age: Number(DATA.age),
                location: DATA.location,
                status: DATA.status,
            };

            await userService.updateUser(ID, usrUpdateData);
            logger.warn(`User upadated details`)
            return res.status(200).json({
                success: true,
                message: 'User updated successfully',
            });

        } catch (err) {
            logger.error(`Faild to update user`)
            console.error(err);
            return res.status(500).json({
                success: false,
                message: 'Failed to update user',
            });
        }
    }


    validateUserData = async (req: Request, res: Response) => {

        try {

            const email = req.body.email;
            const password = req.body.password

            const user = await userService.validateUserData(email, password);

            if (user) {
                logger.info(`User ${email} logIn`)
                const token = generateToken(user);

                res.cookie("accessToken", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "none",
                    maxAge: 15 * 60 * 1000
                });

                const subject = 'log';

                await emailQueue.add('send-email',
                    {
                        to: req.body.email,
                        subject: subject
                    }
                )

                const {id, role,} = user;

                return res.status(200).json({
                    success: true,
                    message: 'User login successfully',
                    logData: {id, role, logStatus: true}
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


    getUserLogs = async (req: Request, res: Response) => {

        try {
            const logs = await userService.userLogsData();

            if (logs && logs.length > 0) {
                res.status(200).json({
                    status: true,
                    message: "Fetch user logs successfully",
                    data: logs,
                })
            } else {
                res.status(204).json({
                    status: false,
                    message: "No logs found",
                    data: [],
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                message: "Internal server error check service",
            })
        }

    }

}