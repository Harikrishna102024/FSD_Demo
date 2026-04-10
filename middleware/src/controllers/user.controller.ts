import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../models/users.model';
import logger from '../config/winston'


const userService = new UserService();

export class userController {

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