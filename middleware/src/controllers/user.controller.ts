import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../models/users.model';
import { generateToken } from '../services/jwt.service';

const userService = new UserService();

export class userController {

    // Method to handle user registration
    registerUser = async (req: Request, res: Response) => {

        try {

            const payload = req.body;

            const userData: User = {
                first_name: payload.firstName,
                last_name: payload.lastName,
                age: Number(payload.age),
                location: payload.location,
                status: payload.status,
                email: payload.email,
                password: payload.password
            };

            await userService.createUser(userData); 

            return res.status(201).json({
                message: 'User registered successfully',
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Failed to register user',
            });
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

            return res.status(200).json({
                success: true,
                message: 'User updated successfully',
            });

        } catch (err) {
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

                const token = generateToken(user);

                return res.status(200).json({
                    success: true,
                    message: 'User login successfully',
                    auth_token: token
                });

            } else {
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
