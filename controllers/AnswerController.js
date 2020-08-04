const db = require('../models')
const { getPagination, getPagingData } = require('../utils/pagination')
const handleError = require('../utils/handleErrors')
const { Answer } = db

/**
 * Create answer
 * @param { Object } req
 * @param { Object } res
 */
exports.create = (req, res) => {
    const { answer, title } = req.body
    Answer.create({ answer, title })
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

/**
 * Get find and count an object with answers and metadata
 * @param { Object } req
 * @param { Object } res
 */
exports.findAll = (req, res) => {
    const { page, size, title } = req.query
    const { limit, offset } = getPagination(page, size)

    Answer.findAndCountAll({
        limit,
        offset,
    })
        .then(data => res.send(getPagingData(data)))
        .catch(err => handleError(err, res))
}

/**
 * Get a specific answer ID
 * @param { Object } req
 * @param { Object } res
 */
exports.findOne = (req, res) => {
    Answer.findByPk(req.params.id)
        .then(data => res.send(data))
        .catch(err => handleError(err, res))
}

/**
 * Update a specific answer ID
 * @param { Object } req
 * @param { Object } res
 */
exports.update = (req, res) => {
    const { answer, title } = req.body
    Answer.update({ answer, title }, { where : { id: req.params.id } })
        .then(() => this.findOne(req, res))
        .catch(err => handleError(err, res))
}

/**
 * Delete a speicifc answer ID
 * @param { Object } req
 * @param { Object } res
 */
exports.delete = (req, res) => {
    Answer.destroy({ where : { id: req.params.id } })
        .then(data => res.json({ result: data == 1 ? 'Deleted' : 'failed' }))
        .catch(err => handleError(err, res))
}