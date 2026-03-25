import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../models/users.model';
import { generateToken } from '../services/jwt.service';
import { GmailService } from '../services/gmail.service';
import logger from '../config/winston'

const userService = new UserService();
const mailService = new GmailService();

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
                    // mailService.sendMail(userData.email, subject);
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
                const subject = 'log';
                // mailService.sendMail(req.body.email, subject);

                return res.status(200).json({
                    success: true,
                    message: 'User login successfully',
                    auth_token: token
                });

            } else {
                logger.error(`logIn faild ${email} - ${password}`)
                return res.status(401).json({
                    success: false,
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
