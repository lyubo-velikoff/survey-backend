const db = require('../models')
const handleError = require('../utils/handleErrors')
const { QuestionAnswer, Question, Answer, User } = db

const getAnswerCountBreakdown = (field, filters = {}) => {
    const { questionId } = filters
    return QuestionAnswer.findAll({
        attributes: [
            `User.${field}`,
            [db.sequelize.literal('COUNT(CASE "Answer"."title" WHEN \'0 - Not at all\' THEN 1 END)::integer'), 'notAtAll'],
            [db.sequelize.literal('COUNT(CASE "Answer"."title" WHEN \'1 - Several days\' THEN 1 END)::integer'), 'severalDays'],
            [db.sequelize.literal('COUNT(CASE "Answer"."title" WHEN \'2 - More than half the days\' THEN 1 END)::integer'), 'halfDays'],
            [db.sequelize.literal('COUNT(CASE "Answer"."title" WHEN \'3 - Nearly every day\' THEN 1 END)::integer'), 'everyDay'],
        ],
        include: [
            {
                model: Question,
                attributes: []
            },
            {
                model: User,
                attributes: []
            },
            {
                model: Answer,
                attributes: []
            },
        ],
        where: {
            ...(questionId ? { questionId } : {}),
        },
        group: [ field ],
        order: [
            [db.sequelize.literal(`"User"."${field}"`), 'ASC'],
        ],
        raw: true,
    })
}

const ageRange = (from, to) => `WHEN "QuestionAnswerView"."age" BETWEEN ${from} AND ${to} THEN '${from}-${to}'`
const countTitle = (title) => `COUNT(CASE "answerTitle" WHEN '${title}' THEN 1 END)::integer AS "${title}"`
const distinctUserTitle = (title) => `AVG(DISTINCT CASE "answerTitle" WHEN '${title}' THEN "userId" ELSE 0 END)::NUMERIC(10,2) AS "${title}"`

const getAgeRangeData = async (filters = {}) => {
    const { questionId } = filters
    const [ result ] = await db.sequelize.query(`
        SELECT 
            CASE
                ${ageRange(0, 9)}
                ${ageRange(10, 19)}
                ${ageRange(20, 29)}
                ${ageRange(30, 39)}
                ${ageRange(40, 49)}
                ${ageRange(50, 59)}
                ${ageRange(60, 69)}
                ${ageRange(70, 79)}
                WHEN "QuestionAnswerView"."age" >= 80 THEN '80+'
            END AS "ageRange", 
            ${countTitle('0 - Not at all')},
            ${countTitle('1 - Several days')},
            ${countTitle('2 - More than half the days')},
            ${countTitle('3 - Nearly every day')}
        FROM 
            "questionAnswerView" as "QuestionAnswerView"
        ${questionId ? `WHERE "QuestionAnswerView"."questionId" = ${questionId}` : ''}
        GROUP BY "ageRange"
        ORDER BY "ageRange"
    `, {
        raw: true,
    })
    return result
}

const getAvgWeeklyResponses = async (filters= {}) => {
    const { questionId } = filters
    const [ result ] = await db.sequelize.query(`
        SELECT 
            to_char(date_trunc('week', "QuestionAnswerView"."createdAt"), 'YYYY-MM-DD') AS "week",
            ${distinctUserTitle('0 - Not at all')},
            ${distinctUserTitle('1 - Several days')},
            ${distinctUserTitle('2 - More than half the days')},
            ${distinctUserTitle('3 - Nearly every day')}
        FROM 
            "questionAnswerView" as "QuestionAnswerView"
        ${questionId ? `WHERE "QuestionAnswerView"."questionId" = ${questionId}` : ''}
        GROUP BY "week"
        ORDER BY "week"
    `, {
        raw: true,
    })
    return result
}

const getListOfUsersBelowSdva = async () => {
    const [ result ] = await db.sequelize.query(`
        SELECT 
            "userName"
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
        WHERE
            "counted" < (SELECT "dvaBellow" FROM get_sdva())
        ORDER BY "userName"
    `, {
        raw: true,
    })
    return result
}

exports.findGenderDemographic = (req, res) => {
    const { questionId } = req.query
    const filters = { questionId }
    getAnswerCountBreakdown('gender', filters)
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

exports.findPostcodeDemographic = (req, res) => {
    const { questionId } = req.query
    const filters = { questionId }
    getAnswerCountBreakdown('postcode', filters)
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

exports.findAgeRangeDemographic = (req, res) => {
    const { questionId } = req.query
    const filters = { questionId: parseInt(questionId, 16) }
    getAgeRangeData(filters)
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

exports.findAvgWeeklyResponses = (req, res) => {
    const { questionId } = req.query
    const filters = { questionId: parseInt(questionId, 16) }
    getAvgWeeklyResponses(filters)
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

exports.findUserListBellowSdva = (req, res) => {
    getListOfUsersBelowSdva()
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}