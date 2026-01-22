import pool from '../config/db';
import { User } from '../models/users.model';

export class UserService {

  // Method to create a new user
  async createUser(user: User) {

    const query = `INSERT INTO users (first_name, last_name, age, location, status, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const result: any = await pool.query(query, [
      user.first_name,
      user.last_name,
      user.age,
      user.location,
      user.status,
      user.email,
      user.password
    ]);

    return result;
  }


  // Method to fetch all users data
  async getAllUsers() {
    
    const query = `SELECT * FROM users`;
    const [users]: any = await pool.query(query);

    const result: User[] = users.map((data: any) => ({

      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      age: data.age,
      location: data.location,
      status: data.status,
      created_at: data.created_at,
      email: data.email,
      password: data.password

    }));

    return result;
  }


  // Method to delete a user by ID 
  async deleteUser(ID: any) {
    const query = `DELETE FROM users WHERE id = ?`;
    const result: any = await pool.query(query, [ID]);
    return result;
  }

  // Method to update user data
  async updateUser(id: any, data: any) {
    const query = `UPDATE users SET first_name = ?, last_name = ?, age = ?, location = ?, status = ? WHERE id = ?`; 
    const result: any = await pool.query(query, [
      data.first_name,
      data.last_name,
      data.age,
      data.location,
      data.status,
      id
    ]);
    return result;
  }

  

  //validate user 
  async validateUserData(email: any, password: any) {
    const query = `SELECT * FROM users WHERE email=? AND password=?`;
    const [result]: any = await pool.query(query, [email, password]);

    if(result && result.length > 0) {
      return result[0];
    } else {
      return false;
    }
  }
}



