const db = require('../models')
const { getPagination, getPagingData } = require('../utils/pagination')
const handleError = require('../utils/handleErrors')
const Op = db.Sequelize.Op
const { User, UserRole, Role, QuestionAnswer, Question } = db

/**
 * Query question answers to get priority / none priority question for user id, in the current week
 * @param { Integer } userId
 * @param { Integer } priority
 */
const getQuestionSinceStartOfWeek = async (userId, priority) => {
    const [ result ] = await db.sequelize.query(`
        SELECT 
            "Question"."title",
            "Question"."priority"
        FROM 
            "questionAnswer" AS "QuestionAnswer"
        LEFT OUTER JOIN "question" AS "Question" 
            ON "QuestionAnswer"."questionId" = "Question"."id"
        LEFT OUTER JOIN "user" AS "User" 
            ON "QuestionAnswer"."userId" = "User"."id" 
        WHERE
            "QuestionAnswer"."userId" = ${userId}
            AND "Question"."priority" = ${priority}
            AND "QuestionAnswer"."createdAt" BETWEEN DATE_TRUNC('week', CURRENT_DATE) AND CURRENT_TIMESTAMP
        GROUP BY "Question"."title", "Question"."priority"
        ORDER BY RANDOM()
        LIMIT 1
    `, { raw: true })
    return result
}

/**
 * Query question answers to get a question that is least answered in that weak
 * @param { Integer } userId
 */
const getLeastAnsweredQuestion = async (userId) => {
    const [ result ] = await db.sequelize.query(`
        SELECT 
            "questionTitle", 
            min("answerCount") "leastCount"
        FROM (
            SELECT 
                "Question"."title" as "questionTitle",
                count(*) as "answerCount"
            FROM 
                "questionAnswer" AS "QuestionAnswer"
            LEFT OUTER JOIN "question" AS "Question" 
                ON "QuestionAnswer"."questionId" = "Question"."id"
            LEFT OUTER JOIN "user" AS "User" 
                ON "QuestionAnswer"."userId" = "User"."id" 
            WHERE
                "QuestionAnswer"."userId" = ${userId}
                AND "QuestionAnswer"."createdAt" BETWEEN DATE_TRUNC('week', CURRENT_DATE) AND CURRENT_TIMESTAMP
            GROUP BY "questionTitle"
            ORDER BY RANDOM()
        ) AS "answers"
        GROUP BY "questionTitle"
        HAVING COUNT(*) = MIN("answerCount")
        ORDER BY RANDOM()
        LIMIT 1
    `, { raw: true })
    return result
}

/**
 * Execute route to create a user
 * @param { Object } req
 * @param { Object } res
 */
exports.create = (req, res) => {
    const { name, gender, postcode, dob } = req.body
    User.create({ name, gender, postcode, dob })
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

/**
 * Execute route to answer a question
 * @param { Object } req
 * @param { Object } res
 */
exports.answer = (req, res) => {
    const { questionId, answerId } = req.body
    User.findByPk(req.params.id)
        .then((data) => {
            if (data) {
                QuestionAnswer.create({ userId: req.params.id, questionId, answerId })
                    .then((updatedData) => res.send(updatedData))
                    .catch(updateErr => handleError(updateErr, res))
            } else {
                res.send({ errors: [ { msg: 'User does not exist' } ] })
            }
        })
        .catch(err => handleError(err, res))
}

/**
 * Execute route to query question answer model and get all answers in an object with some metadata
 * @param { Object } req
 * @param { Object } res
 */
exports.findAllAnswers = (req, res) => {
    const { page, size, title } = req.query
    const { limit, offset } = getPagination(page, size)

    QuestionAnswer.findAndCountAll({
        limit,
        offset,
        include: [{ all: true }]
    })
        .then(data => res.send(getPagingData(data)))
        .catch(err => handleError(err, res))
}

/**
 * Execute route to get an object with all users and some metadata
 * @param { Object } req
 * @param { Object } res
 */
exports.findAll = (req, res) => {
    const { page, size, title } = req.query
    const { limit, offset } = getPagination(page, size)

    User.findAndCountAll({
        limit,
        offset,
        include: [{ model : Role }]
        
    })
        .then(data => {
            res.send(getPagingData(data))
        })
        .catch(err => handleError(err, res))
}

/**
 * Execute route to find available question, random priority => none priority => least amount of answers by user in current week
 * @param { Object } req
 * @param { Object } res
 */
exports.findAvailableQuestion = async (req, res) => {
    const { id } = req.params
    // 1 = priority, 0 = none priority
    // running 2 separate queries to get priority questions first
    // followed by none priority questions
    getQuestionSinceStartOfWeek(id, 1)
        .then((priorityQuestion) => {
            // if there is a question, return response, else get none priority
            if (priorityQuestion.length > 0) {
                res.send(priorityQuestion)
            } else {
                // else get a none priority question
                getQuestionSinceStartOfWeek(id, 0)
                    .then((nonePriorityQuestion) => {
                        // if there is a none priority question, send response
                        if (nonePriorityQuestion.length > 0) {
                            res.send(nonePriorityQuestion)
                        } else {
                            // else get a random question that is the least answered
                            getLeastAnsweredQuestion(id)
                                .then((leastAnsweredQuestion) => res.send(leastAnsweredQuestion))
                                .catch(err => handleError(err, res))
                        }
                    })
                    .catch(err => handleError(err, res))
            }
        })
        .catch(err => handleError(err, res))
}

/**
 * Execute route to find a specific user
 * @param { Object } req
 * @param { Object } res
 */
exports.findOne = (req, res) => {
    User.findByPk(req.params.id)
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

/**
 * Execute route to find a specific user by name
 * @param { Object } req
 * @param { Object } res
 */
exports.findUserByName = (req, res) => {
    User.findOne({
        include: [{
            model: Role,
        }],
        where: {
            name: req.params.name
        }
    })
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

/**
 * Execute route to update user details
 * @param { Object } req
 * @param { Object } res
 */
exports.update = (req, res) => {
    const { name, gender, postcode, dob } = req.body
    User.update({ name, gender, postcode, dob }, { where : { id: req.params.id } })
        .then(() => this.findOne(req, res))
        .catch(err => handleError(err, res))
}

/**
 * Execute route to update a role to a user
 * @param { Object } req
 * @param { Object } res
 */
exports.updateRole = (req, res) => {
    const { roleId } = req.body
    User.findByPk(req.params.id)
        .then((data) => {
            if (data) {
                // maybe also check if role exists
                UserRole.findOrCreate({ where: { userId: req.params.id, roleId }, defaults: { roleId } })
                    .then((updatedData) => res.send(updatedData))
                    .catch(updateErr => handleError(updateErr, res))
            } else {
                res.send({ errors: [ { msg: 'User does not exist' } ] })
            }
        })
        .catch(err => handleError(err, res))
}

/**
 * Execute route to delete a role from a user
 * @param { Object } req
 * @param { Object } res
 */
exports.deleteRole = (req, res) => {
    const { roleId } = req.body
    User.findByPk(req.params.id)
        .then((data) => {
            if (data) {
                // maybe also check if role exists
                UserRole.destroy({ where: { userId: req.params.id, roleId } })
                    .then((updatedData) => {
                        res.json({ result: updatedData == 1 ? 'Deleted' : 'failed' })
                    })
                    .catch(updateErr => handleError(updateErr, res))
            } else {
                res.send({ errors: [ { msg: 'User does not exist' } ] })
            }
        })
        .catch(err => handleError(err, res))
}

/**
 * Execute route to delete a specific user
 * @param { Object } req
 * @param { Object } res
 */
exports.delete = (req, res) => {
    User.destroy({ where : { id: req.params.id } })
        .then(data => res.json({ result: data == 1 ? 'Deleted' : 'failed' }))
        .catch(err => handleError(err, res))
}