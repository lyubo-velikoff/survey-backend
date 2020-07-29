'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class QuestionAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            // define association here
        }
    };
    QuestionAnswer.init({
        userId: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: {
                    tableName: 'user',
                },
                key: 'id'
            },
            allowNull: false
        },
        questionId: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: {
                    tableName: 'question',
                },
                key: 'id'
            },
            allowNull: false
        },
        answerId: {
            type: DataTypes.INTEGER,
            onDelete: 'CASCADE',
            references: {
                model: {
                    tableName: 'answer',
                },
                key: 'id'
            },
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'QuestionAnswer',
        tableName: 'questionAnswer'
    })
    return QuestionAnswer
}