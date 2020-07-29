'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
        }
    };
    Question.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        priority: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true
        },
    }, {
        sequelize,
        modelName: 'Question',
        tableName: 'question'
    })
    return Question
}