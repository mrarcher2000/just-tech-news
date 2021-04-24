const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password); 
    }
}

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

        hooks: {
            // set up beforeCreate lifecycle hook functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
                },


            // set up beforeUpdate lifecycle hook functionality
            async beforeUpdate (updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }

            },
    
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