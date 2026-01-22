import { DataTypes } from "sequelize"
import sequelize from "../config/db"

const UserModel: any = sequelize.define("users", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    firstName: {
        type: DataTypes.STRING,
        field: 'first_name'
    },

    last_name: {
        type: DataTypes.STRING,
        field: 'last_name'
    },

    age: {
        type: DataTypes.INTEGER,
        field: 'age'
    },

    location: {
        type: DataTypes.STRING,
        field: 'location'
    },

    status: {
        type: DataTypes.STRING,
        field: 'status'
    },

    email: {
        type: DataTypes.STRING,
        field: 'email'
    },

    password: {
        type: DataTypes.STRING,
        field: 'password'
    }
},{timestamps: false,})

export default UserModel;