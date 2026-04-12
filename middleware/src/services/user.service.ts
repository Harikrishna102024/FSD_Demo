import pool from '../config/db';
import { User } from '../models/users.model';
import sequelize, { json, where } from 'sequelize';
import UserModel from '../models/users.sequelize';
import bcrypt from 'bcrypt';
import { Op } from "sequelize";
import path from 'path';
import fs from 'fs';
import { getCache, clearCache } from '../utils/cache'

export class UserService {


  // //Using normal SQL
  // async createUser(user: User) {

  //   const query = `INSERT INTO users (first_name, last_name, age, location, status, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  //   const result: any = await pool.query(query, [
  //     user.first_name,
  //     user.last_name,
  //     user.age,
  //     user.location,
  //     user.status,
  //     user.email,
  //     user.password
  //   ]);

  //   return result;
  // }



  //Using Sequelize
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





  // //Using normal SQL
  // async getAllUsers() {

  //   const query = `SELECT * FROM users`;
  //   const [users]: any = await pool.query(query);

  //   const result: User[] = users.map((data: any) => ({
  //     id: data.id,
  //     firstName: data.first_name,
  //     lastName: data.last_name,
  //     age: data.age,
  //     location: data.location,
  //     status: data.status,
  //     created_at: data.created_at,
  //     email: data.email,
  //     password: data.password
  //   }));
  //   return result;
  // }



  //Using Sequelize
  async getAllUsers() {
    const data = await getCache('users:all', () => UserModel.findAll({
      attributes: ['id', 'firstName', 'lastName', 'age', 'location', 'status', 'email', 'role', 'profiles']
    }), 5 * 60)
    return data;
  }





  // //Using normal SQL
  // async deleteUser(ID: any) {
  //   const query = `DELETE FROM users WHERE id = ?`;
  //   const result: any = await pool.query(query, [ID]);
  //   return result;
  // }


  //Using Sequelize
  async deleteUser(id: any) {

    const deletedRows = await UserModel.destroy({
      where: { id },
    });

    clearCache('users:all');
    return deletedRows;
  }




  // //Using normal SQL
  // async updateUser(id: any, data: any) {
  //   const query = `UPDATE users SET first_name = ?, last_name = ?, age = ?, location = ?, status = ? WHERE id = ?`;
  //   const result: any = await pool.query(query, [
  //     data.first_name,
  //     data.last_name,
  //     data.age,
  //     data.location,
  //     data.status,
  //     id
  //   ]);
  //   return result;
  // }



  //Using Sequelize
  async updateUser(id: any, data: any) {

    const existingUser = await this.getUserById(id);

    if (data.profiles && existingUser?.dataValues?.profiles) {

      const oldPath = path.join(__dirname, '../../uploads', existingUser.dataValues.profiles);

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
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



  // //Using normal SQL
  // async validateUserData(email: any, password: any) {
  //   const query = `SELECT * FROM users WHERE email=? AND password=?`;
  //   const [result]: any = await pool.query(query, [email, password]);

  //   if (result && result.length > 0) {
  //     return result[0];
  //   } else {
  //     return false;
  //   }
  // }



  //Using Sequelizer
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



  //check if fields are already exist in the database
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
}