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
            Question.belongsToMany(models.Answer, { through: models.QuestionAnswer, foreignKey: 'questionId' })
            Question.hasMany(models.QuestionAnswer, { foreignKey: 'questionId' })

            Question.belongsToMany(models.User, { through: models.QuestionAnswer, foreignKey: 'questionId' })
            Question.hasMany(models.QuestionAnswer, { foreignKey: 'questionId' })
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