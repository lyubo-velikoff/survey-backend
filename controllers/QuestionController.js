const db = require('../models')
const { getPagination, getPagingData } = require('../utils/pagination')
const handleError = require('../utils/handleErrors')
const { Question } = db

/**
 * Create question
 * @param { Object } req
 * @param { Object } res
 */
exports.create = (req, res) => {
    const { title, priority } = req.body
    Question.create({ title, priority })
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

/**
 * Count and list all questions and return an object with the list and some metadata
 * @param { Object } req
 * @param { Object } res
 */
exports.findAll = (req, res) => {
    const { page, size, title } = req.query
    const { limit, offset } = getPagination(page, size)

    Question.findAndCountAll({
        limit,
        offset,
        order: ['id']
    })
        .then(data => res.send(getPagingData(data)))
        .catch(err => handleError(err, res))
}

/**
 * Get a specific question
 * @param { Object } req
 * @param { Object } res
 */
exports.findOne = (req, res) => {
    Question.findByPk(req.params.id)
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

/**
 * Update a specific question
 * @param { Object } req
 * @param { Object } res
 */
exports.update = (req, res) => {
    const { title, priority } = req.body
    Question.update({
        ...(title ? { title } : {}),
        ...(priority ? { priority } : {})
    }, { where : { id: req.params.id } })
        .then(() => this.findOne(req, res))
        .catch(err => handleError(err, res))
}

/**
 * Delete a specific question
 * @param { Object } req
 * @param { Object } res
 */
exports.delete = (req, res) => {
    Question.destroy({ where : { id: req.params.id } })
        .then(data => res.json({ result: data == 1 ? 'Deleted' : 'failed' }))
        .catch(err => handleError(err, res))
}