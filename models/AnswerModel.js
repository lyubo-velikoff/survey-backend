'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Answer.belongsToMany(models.Question, { through: models.QuestionAnswer, foreignKey: 'answerId' })
            Answer.hasMany(models.QuestionAnswer, { foreignKey: 'questionId' })
        }
    };
    Answer.init({
        answer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Answer',
        tableName: 'answer',
        timestamps: false
    })
    return Answer
}