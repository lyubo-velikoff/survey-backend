'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            User.belongsToMany(models.Role, { through: models.UserRole, foreignKey: 'userId' })
            User.hasMany(models.UserRole, { foreignKey: 'userId' })

            User.belongsToMany(models.Question, { through: models.QuestionAnswer, foreignKey: 'userId' })
            User.hasMany(models.QuestionAnswer, { foreignKey: 'userId' })
        }
    };
    User.init({
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM,
            values: ['m', 'f'], // add more here
            allowNull: false
        },
        postcode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'user'
    })
    return User
}