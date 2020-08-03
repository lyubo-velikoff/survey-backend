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
        "User"."gender",
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

const sdvaFunction = `
    CREATE OR REPLACE FUNCTION public.get_sdva()
        RETURNS TABLE(
            "dvaBellow" numeric,
            "dvaAbove" numeric
        ) 
        LANGUAGE 'plpgsql'

        COST 100
        VOLATILE 
        ROWS 1000
    AS $BODY$
    BEGIN 
        return query
            SELECT 
                "mean" - "std" AS "standard-below-mean",
                "mean" + "std" AS "standard-above-mean"
            FROM (
                SELECT 
                    STDDEV_POP("counted") AS "std", 
                    SUM("counted") / COUNT(DISTINCT "userName") AS "mean"
                FROM (
                    SELECT 
                        "userName",
                        COUNT(*) AS "counted"
                    FROM 
                        "questionAnswerView" as "QuestionAnswerView"
                    WHERE
                        "QuestionAnswerView"."answerTitle" = '0 - Not at all'
                    GROUP BY
                        "userName"
                ) AS "countedAnswers"
            ) AS "results";

    END;
    $BODY$;
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
        await queryInterface.sequelize.query(sdvaFunction)
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable('questionAnswer')
        await queryInterface.sequelize.query(`CREATE OR REPLACE VIEW ${VIEW_NAME} AS ${QUERY}`)
        await queryInterface.sequelize.query(sdvaFunction)
    }
}