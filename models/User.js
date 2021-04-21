const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {}

// define table columns and configuration
User.init(
    {
        // define id column
        id: {
            type: DataTypes.INTEGER, // use Seqeulize DataTypes object
            allowNull: false, // equivalent of mysl NOT NULL
            primaryKey: true, // this is the primary key
            autoIncrement: true // turn on autoincrement
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, //there cannot be duplicate emails 
            validate: {
                isEmail: true // validators only work if allowNull: false
            },
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4] // password must be at least 4 characters long
            }
        },
    },
    {
        // TABLE CONFIG OPTIONS 

        // pass in imported sequelize connection to database
        sequelize,
        timestamps: false, // stop auto create createdAt or updatedAt timestamps
        freezeTableName: true, // don't pluralize name of database table
        underscored: true, // use underscores instead of camel-casing
        modelName: 'user' // make it so our model name is lowercase in database
    }
);

module.exports = User;