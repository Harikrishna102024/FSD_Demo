import pool from '../config/db';
import { User } from '../models/users.model';
import sequelize, { json, where } from 'sequelize';
import UserModel from '../models/users.sequelize';
import bcrypt from 'bcrypt';
import { Op } from "sequelize";
import path from 'path';
import fs from 'fs';
import { getCache, clearCache } from '../utils/cache'
import cloudinary from '../config/cloud.config';

export class UserService {


  async createUser(user: any) {

    const bcryptPassword = await bcrypt.hash(user.password, 10);

    const result = await UserModel.create({

      firstName: user.first_name,
      lastName: user.last_name,
      age: user.age,
      location: user.location,
      status: user.status,
      email: user.email,
      password: bcryptPassword,
      profiles: user.profiles,

    });

    clearCache('users:all');

    const finalResult = await {
      result: result,
      regStatus: true
    }

    return finalResult;
  }





  async getAllUsers() {
    const data = await getCache('users:all', () => UserModel.findAll({
      attributes: ['id', 'firstName', 'lastName', 'age', 'location', 'status', 'email', 'role', 'profiles']
    }), 5 * 60)
    return data;
  }





  async deleteUser(id: any) {

    const existingData = await this.getUserById(id)

    if (existingData && existingData?.dataValues?.profiles) {

      const imageUrl = existingData.dataValues.profiles;

      const publicId = imageUrl.split('/').pop()?.split('.')[0];

      await cloudinary.uploader.destroy(`user_profiles/${publicId}`);
    }

    const deletedRows = await UserModel.destroy({
      where: { id },
    });

    clearCache('users:all');
    return deletedRows;
  }





  async updateUser(id: any, data: any) {

    const existingUser = await this.getUserById(id);

    if (data.profiles && existingUser?.dataValues?.profiles && data.profiles !== existingUser.dataValues.profiles) {

      const imageUrl = existingUser.dataValues.profiles;

      const publicId = imageUrl.split('/').pop()?.split('.')[0];

      await cloudinary.uploader.destroy(`user_profiles/${publicId}`);
    }

    const result = await UserModel.update(
      {
        firstName: data.first_name,
        lastName: data.last_name,
        age: data.age,
        location: data.location,
        status: data.status,
        profiles: data.profiles
      },
      {
        where: { id }
      }
    );

    clearCache('users:all');
    return result;
  }




  async validateUserData(email: any, password: any) {

    const user = await UserModel.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return false;
    } else {
      const pasMatch = await bcrypt.compare(password, user.password);
      if (pasMatch) {
        return user
      }

    }
  }



  async checkExistingFields(fields: any) {
    const status = await UserModel.findOne({
      where: {
        email: fields.email
      }
    })
    if (status) {
      return true;
    } else {
      return false;
    }
  }




  async userLogsData() {

    const userLogs: any[] = [];

    const logDir = path.join(process.cwd(), "logs");
    const files = await fs.readdirSync(logDir);

    files.forEach((file: any) => {
      let filePath = path.join(logDir, file);
      let data = fs.readFileSync(filePath, 'utf8');
      let logs = data.split("\n").map(data => data.trim()).filter(Boolean).map(form => JSON.parse(form))
      userLogs.push(...logs)
    });
    return userLogs;
  }



  async getUserById(id: any) {
    const data = await UserModel.findOne({
      where: {
        id: id
      }
    })
    return data;
  }



  async updateUserTheme(id: any, theme: any) {

    const result = await UserModel.update(
      { theme: theme },
      { where: { id } }
    );
    return result;
  }

}