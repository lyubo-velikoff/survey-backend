const db = require('../models')
const handleError = require('../utils/handleErrors')
const { QuestionAnswer, Question, Answer, User } = db

const getAnswerCountBreakdown = (field, filters = {}) => {
    return QuestionAnswer.findAll({
        attributes: [
            field,
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
            // '$User.gender$': { [Op.eq]: 'm' },
            // questionId,
        },
        group: [field],
        limit: 10,
        raw: true,
    })
}

exports.findGenderDemographic = (req, res) => {
    // const { name } = req.body
    getAnswerCountBreakdown('User.gender')
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

exports.findPostcodeDemographic = (req, res) => {
    // const { name } = req.body
    getAnswerCountBreakdown('User.postcode')
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}