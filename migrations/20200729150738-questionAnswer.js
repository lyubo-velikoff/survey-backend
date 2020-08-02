'use strict'

const VIEW_NAME = '"questionAnswerView"'
const QUERY = `
    SELECT
        "User"."name" AS "userName", 
        "Question"."title" AS "questionTitle", 
        "Answer"."title" AS "answerTitle",
        EXTRACT(YEAR FROM AGE("User"."dob")) AS "age", 
        "User"."postcode", 
        "QuestionAnswer"."userId",
        "QuestionAnswer"."questionId",
        "QuestionAnswer"."answerId"
    FROM 
        "questionAnswer" AS "QuestionAnswer" 
    LEFT OUTER JOIN "question" AS "Question" ON "QuestionAnswer"."questionId" = "Question"."id"
    LEFT OUTER JOIN "user" AS "User" ON "QuestionAnswer"."userId" = "User"."id" 
    LEFT OUTER JOIN "answer" AS "Answer" ON "QuestionAnswer"."answerId" = "Answer"."id"
`
const NEW_QUERY = `
    SELECT
        "QuestionAnswer"."id",
        "User"."name" AS "userName", 
        "Question"."title" AS "questionTitle", 
        "Answer"."title" AS "answerTitle",
        EXTRACT(YEAR FROM AGE("User"."dob")) AS "age", 
        "User"."postcode", 
        "QuestionAnswer"."createdAt", 
        "QuestionAnswer"."userId",
        "QuestionAnswer"."questionId",
        "QuestionAnswer"."answerId"
    FROM 
        "questionAnswer" AS "QuestionAnswer" 
    LEFT OUTER JOIN "question" AS "Question" ON "QuestionAnswer"."questionId" = "Question"."id"
    LEFT OUTER JOIN "user" AS "User" ON "QuestionAnswer"."userId" = "User"."id" 
    LEFT OUTER JOIN "answer" AS "Answer" ON "QuestionAnswer"."answerId" = "Answer"."id"
`

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('questionAnswer', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
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
                type: Sequelize.INTEGER,
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
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: {
                        tableName: 'answer',
                    },
                    key: 'id'
                },
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, {
            charset: 'utf8',
            collate: 'utf8_unicode_ci',
        })
        await queryInterface.sequelize.query(`CREATE OR REPLACE VIEW ${VIEW_NAME} AS ${NEW_QUERY}`)
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('questionAnswer')
        await queryInterface.sequelize.query(`CREATE OR REPLACE VIEW ${VIEW_NAME} AS ${QUERY}`)
    }
}