import pool from '../config/db';
import { User } from '../models/users.model';
import sequelize, { where } from 'sequelize';
import UserModel from '../models/users.sequelize';

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

    const result = await UserModel.create({

      firstName: user.first_name,
      lastName: user.last_name,
      age: user.age,
      location: user.location,
      status: user.status,
      email: user.email,
      password: user.password,

    })

    return result;
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

    const result = await UserModel.findAll();
    return result;

  }





  // //Using normal SQL
  // async deleteUser(ID: any) {
  //   const query = `DELETE FROM users WHERE id = ?`;
  //   const result: any = await pool.query(query, [ID]);
  //   return result;
  // }


  //Using Sequelize
  async deleteUser(ID: any) {
    const deletedRows = await UserModel.destroy({
      where: { ID },
    });
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

    const result = await UserModel.update(
      {
        first_name: data.first_name,
        last_name: data.last_name,
        age: data.age,
        location: data.location,
        status: data.status,
      },
      {
        where: { id }
      }
    );

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
        password: password,
      },
    });

    if (user) {
      return user;
    } else {
      return false;
    }
  }

}