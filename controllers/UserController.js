const db = require('../models')
const { getPagination, getPagingData } = require('../utils/pagination')
const handleError = require('../utils/handleErrors')
const Op = db.Sequelize.Op
const { User, UserRole, Role, QuestionAnswer, Question } = db

/**
 * Query question model to find and count questions and retrieve the questions with some metadata
 * @param { Object } req
 * @param { Object } res
 */
const getQuestionsSinceStartOfWeek = async (userId, priority, options) => {
    const result = await Question.findAndCountAll({
        ...options,
        // Helper: display question answer count
        // attributes: {
        //     include: [
        //         [
        //             db.sequelize.literal(`(
        //                 SELECT
        //                     count(*)
        //                 FROM
        //                     "questionAnswer" AS "QuestionAnswer"
        //                 WHERE
        //                     "QuestionAnswer"."userId" = ${userId}
        //                     AND "QuestionAnswer"."questionId" = "Question"."id"
        //                     AND ("QuestionAnswer"."createdAt" >= date_trunc('week', current_date)
        //                     AND "QuestionAnswer"."createdAt" <= current_timestamp)
        //             )`),
        //             'questionAnswerCount'
        //         ]
        //     ]
        // },
        where: {
            id: {
                [Op.notIn]: [
                    db.sequelize.literal(`(
                        SELECT 
                            DISTINCT "questionId" FROM "questionAnswer" AS "QuestionAnswer"
                        WHERE
                            "QuestionAnswer"."userId" = ${userId}
                            AND "QuestionAnswer"."questionId" = "Question"."id"
                            AND ("QuestionAnswer"."createdAt" >= date_trunc('week', current_date)
                            AND "QuestionAnswer"."createdAt" <= current_timestamp)
                    )`)
                ]
            },
            priority
        },
        order: db.sequelize.random(),
        // raw: true
    })

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
 * Execute route to find all available questions to user and return an object with therm and some metadata
 * @param { Object } req
 * @param { Object } res
 */
exports.findAllAvailableQuestions = async (req, res) => {
    const { page, size, title } = req.query
    const { limit, offset } = getPagination(page, size)

    let options = { limit, offset }

    // 1 = priority, 0 = none priority
    // running 2 separate queries to get priority questions first
    // followed by none priority questions
    getQuestionsSinceStartOfWeek(req.params.id, 1, options)
        .then(priorityData => {
            getQuestionsSinceStartOfWeek(req.params.id, 0, options)
                .then(nonePriorityData => {
                    res.send(getPagingData({
                        count: priorityData.count + nonePriorityData.count,
                        rows: [
                            ...priorityData.rows,
                            ...nonePriorityData.rows
                        ]
                    }))
                })
                .catch(nonePriorityErr => handleError(nonePriorityErr, res))
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